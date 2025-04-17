using Imel.API.Dto.Response;

namespace Imel.API.Services.Export
{
    public interface IExportService
    {
        public Task<ResponseObject> GetUsers();
    }
}
