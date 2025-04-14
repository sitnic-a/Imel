using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Imel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ResponseObject> GetById(int id)
        {
            return await _userService.GetById(id);
        }

        [HttpPost]
        public async Task<ResponseObject> Get([FromBody] QueryUsers query, [FromQuery] PaginationParams paginationParams)
        {
            return await _userService.Get(query,paginationParams);
        }

        [HttpPost("add")]
        public async Task<ResponseObject> AddNewUser([FromBody] NewUser request)
        {
            return await _userService.AddNewUser(request);
        }

        [HttpPut("{id}")]
        public async Task<ResponseObject> UpdateUser(int id, [FromBody] UpdateUser request)
        {
            return await _userService.UpdateUser(id, request);
        }

        [HttpDelete("{id}")]
        public async Task<ResponseObject> DeleteById(int id)
        {
            return await _userService.DeleteById(id);
        }
    }
}
