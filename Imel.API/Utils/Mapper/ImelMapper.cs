using AutoMapper;
using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Models;
using Microsoft.Extensions.Hosting;

namespace Imel.API.Utils.Mapper
{
    public class ImelMapper : Profile
    {
        public ImelMapper()
        {
            CreateMap<UpdateUser, User>().ReverseMap();
        }
    }
}
