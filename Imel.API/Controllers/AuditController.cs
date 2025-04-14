using Imel.API.Dto.Request;
using Imel.API.Dto.Request.Query;
using Imel.API.Dto.Response;
using Imel.API.Services.Audit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Imel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditController : ControllerBase
    {
        private readonly IAuditService _auditService;

        public AuditController(IAuditService auditService)
        {
            _auditService = auditService;
        }

        [HttpPost]
        public async Task<ResponseObject> Get([FromBody] QueryLogs? query=null, [FromQuery] PaginationParams? paginationParams = null)
        {
            return await _auditService.Get(query, paginationParams);
        }
    }
}
