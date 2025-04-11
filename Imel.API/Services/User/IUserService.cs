using Imel.API.Dto.Request;
using Imel.API.Dto.Response;

namespace Imel.API.Services.User
{
    public interface IUserService
    {
        public Task<ResponseObject> GetById(int id);
        public Task<ResponseObject> Get(QueryUsers searchQuery, PaginationParams paginationParams);
        public Task<ResponseObject> AddNewUser(NewUser request);
        public Task<ResponseObject> UpdateUser(int id, UpdateUser request);
    }
}
