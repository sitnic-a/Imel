using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Services.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Imel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ResponseObject> Get([FromBody] QueryUsers query, [FromQuery] PaginationParams paginationParams)
        {
            return await _userService.Get(query,paginationParams);
        }
    }
}
