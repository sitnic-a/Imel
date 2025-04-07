using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Services.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Imel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ResponseObject> Register ([FromBody] RegisterDto request)
        {
            return await _authService.Register(request);
        }
    }
}
