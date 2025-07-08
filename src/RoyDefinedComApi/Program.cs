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
