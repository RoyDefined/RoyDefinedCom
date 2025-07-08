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
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public IActionResult Ping()
    {
		var httpContext = _httpContextAccessor.HttpContext;
		httpContext?.Response.Headers.Append("Access-Control-Expose-Headers", "PingReceiveTime");
		httpContext?.Response.Headers.Append("PingReceiveTime", new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds().ToString());
		return base.NoContent();
	}
}
