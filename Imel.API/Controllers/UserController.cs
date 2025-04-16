using Imel.API.Dto.Request;
using Imel.API.Dto.Request.Query;
using Imel.API.Dto.Response;
using Imel.API.Services.User;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id}")]
        [Authorize(Roles ="Administrator")]
        public async Task<ResponseObject> GetById(int id)
        {
            return await _userService.GetById(id);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<ResponseObject> Get([FromBody] QueryUsers? query =null, [FromQuery] PaginationParams? paginationParams=null)
        {
            return await _userService.Get(query,paginationParams);
        }

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<ResponseObject> AddNewUser([FromBody] NewUser request)
        {
            return await _userService.AddNewUser(request);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<ResponseObject> UpdateUser(int id, [FromBody] UpdateUser request)
        {
            return await _userService.UpdateUser(id, request);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<ResponseObject> DeleteById(int id)
        {
            return await _userService.DeleteById(id);
        }
    }
}
