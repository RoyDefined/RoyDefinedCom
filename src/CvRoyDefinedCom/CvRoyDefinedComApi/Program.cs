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

	_ = builder.Services.AddControllers();
	_ = builder.Services.AddHttpContextAccessor();
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
	_ = app.UseAuthorization();

#if RELEASE
    app.UseDefaultFiles();
    app.UseStaticFiles();
#endif

	_ = app.MapControllers();

#if RELEASE
	// The server will fall back any request not pointing to `api/` to the index html file,
	// because Angular will attempt to fetch an url it can't handle itself.
	// If the request does point to `api/` then this must point to a valid endpoint,
	// otherwise a 404 is returned.
	_ = app.Map("api/{**slug}", (HttpContext context) =>
	{
		context.Response.StatusCode = StatusCodes.Status404NotFound;
		return Task.CompletedTask;
	});
	_ = app.MapFallbackToFile("index.html");
#endif

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
