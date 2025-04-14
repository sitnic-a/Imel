using Imel.API.Dto.Request;
using Imel.API.Dto.Request.Query;
using Imel.API.Dto.Response;
using Microsoft.EntityFrameworkCore;

namespace Imel.API.Services.Audit
{
    public class AuditService : IAuditService
    {
        private readonly DataContext _context;
        private readonly ILogger<IAuditService> _auditLogger;

        public AuditService(DataContext context, ILogger<IAuditService> auditLogger)
        {
            _context = context;
            _auditLogger = auditLogger;
        }

        public async Task<ResponseObject> Get(QueryLogs? query = null, PaginationParams? paginationParams = null)
        {
            try
            {
                var dbLogs = _context.AuditLogs.AsQueryable();
                var logs = new List<LogDto>();

                if (query != null)
                {
                    if (query.CreatedAt != null)
                    {
                        if (logs.Any())
                        {
                            _auditLogger.LogInformation("GET: Successfully retrieved logs", [logs]);
                            return new ResponseObject(logs, StatusCodes.Status200OK, "GET: Successfully retrieved logs");
                        }
                        _auditLogger.LogWarning("GET: Dataset empty", [logs]);
                        return new ResponseObject(logs, StatusCodes.Status204NoContent, "GET: Dataset empty");
                    }
                }

                if(paginationParams.CurrentPage > 1)
                {
                    dbLogs = dbLogs
                        .Skip(paginationParams.PreviousPage * paginationParams.ElementsPerPage)
                        .Take(paginationParams.ElementsPerPage);

                    logs = await dbLogs
                        .Select(l => new LogDto(l.Id, l.ChangedBy, l.ChangedByRole, l.MethodName, l.OriginalValue, l.NewValue, l.LoggedAt.Value))
                        .ToListAsync();

                    if (logs.Any())
                    {
                        _auditLogger.LogInformation("GET: Successfully retrieved logs", [logs]);
                        return new ResponseObject(logs, StatusCodes.Status200OK, "GET: Successfully retrieved logs");
                    }
                    _auditLogger.LogWarning("GET: Dataset empty", [logs]);
                    return new ResponseObject(logs, StatusCodes.Status204NoContent, "GET: Dataset empty");
                }

                logs = await dbLogs
                        .Select(l => new LogDto(l.Id, l.ChangedBy, l.ChangedByRole, l.MethodName, l.OriginalValue, l.NewValue, l.LoggedAt.Value))
                        .ToListAsync();

                _auditLogger.LogInformation("GET: Successfully retrieved logs", [logs]);
                return new ResponseObject(logs, StatusCodes.Status200OK, "GET: Successfully retrieved logs");
            }
            catch (Exception e)
            {
                _auditLogger.LogInformation($"GET: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"GET/: {e.Message}");
            }
        }
    }
}
