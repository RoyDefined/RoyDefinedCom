using Microsoft.AspNetCore.Mvc;

namespace RoyDefinedComApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PingController : ControllerBase
{
    /// <inheritdoc cref="ILogger"/>
	private readonly ILogger _logger;

    /// <inheritdoc cref="IHttpContextAccessor"/>
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PingController(
        ILogger<PingController> logger,
        IHttpContextAccessor httpContextAccessor)
    {
        this._logger = logger;
        this._httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public IActionResult Ping()
    {
        var httpContext = this._httpContextAccessor.HttpContext;
        if (httpContext != null)
        {
            httpContext.Response.Headers.Append("PingReceiveTime", new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds().ToString());
        }

        return base.NoContent();
    }
}
