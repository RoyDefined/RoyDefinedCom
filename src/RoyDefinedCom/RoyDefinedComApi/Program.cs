using Microsoft.EntityFrameworkCore;
using RoyDefinedComApi.Data;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

Log.Logger = logger;
logger.Debug("Configuring service collection...");

try
{
    // Provide Serilog as the main logger.
    _ = builder.Logging.ClearProviders();
    _ = builder.Services.AddLogging(builder => builder.AddSerilog(logger));

	// TODO: I don't think this is required.
    builder.Services.AddRouting();

    builder.Services.AddControllers();
    builder.Services.AddHttpContextAccessor();

    // Database
    var configuration = builder.Configuration
        .GetRequiredSection("Database")
        .Get<DatabaseConfiguration>();
    ArgumentNullException.ThrowIfNull(configuration, nameof(configuration));
    builder.Services.AddSingleton(configuration);
    builder.Services.AddDbContext<DatabaseContext>();
}
catch (Exception ex)
{
    logger.Error(ex, "Error during initial builder setup.");
    return;
}

var app = builder.Build();
logger.Debug("Starting application...");

try
{
    using var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

    // Attempt migration to ensure the database exists and it up to date.
    await databaseContext.Database.MigrateAsync(CancellationToken.None)
        .ConfigureAwait(false);

    // Increment startup count.
    // Make sure the stat exists.
    var startupCount = await databaseContext.Stats.SingleOrDefaultAsync(x => x.Key == "STARTUPS", CancellationToken.None);
    if (startupCount == null)
    {
        startupCount = new()
        {
            Key = "STARTUPS",
            Value = 1,
        };

        databaseContext.Stats.Add(startupCount);
    }
    else
    {
        startupCount.Value++;
    }

    await databaseContext.SaveChangesAsync(CancellationToken.None);

	// TODO: I don't think this is required.
	app.UseRouting();

#if RELEASE
    app.UseDefaultFiles();
    app.UseStaticFiles();
#endif

	// TODO: Can be simplified.
    _ = app.UseEndpoints(endpoints =>
    {
        _ = endpoints.MapControllers();

#if RELEASE
        // The server will fall back any request not pointing to `api/` to the index html file,
        // because Angular will attempt to fetch an url it can't handle itself.
        // If the request does point to `api/` then this must point to a valid endpoint,
        // otherwise a 404 is returned.
        _ = endpoints.Map("api/{**slug}", (HttpContext context) =>
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return Task.CompletedTask;
        });
        _ = endpoints.MapFallbackToFile("index.html");
#endif
    });
}
catch (Exception ex)
{
    logger.Error(ex, "Error during application startup.");
    return;
}

var appProcess = app.RunAsync(CancellationToken.None);
logger.Information("Application has started.");

try
{
    await appProcess;
}
catch (Exception ex)
{
    logger.Error(ex, "Error during application lifetime.");
    return;
}
