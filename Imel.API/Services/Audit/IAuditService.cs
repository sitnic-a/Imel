using Imel.API.Dto.Request;
using Imel.API.Dto.Request.Query;
using Imel.API.Dto.Response;

namespace Imel.API.Services.Audit
{
    public interface IAuditService
    {
        public Task<ResponseObject> Get(QueryLogs? query = null, PaginationParams? paginationParams = null);
    }
}
