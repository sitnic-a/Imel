using Imel.API.Dto.Response;
using Microsoft.EntityFrameworkCore;

namespace Imel.API.Services.Export
{
    public class ExportService : IExportService
    {
		private readonly DataContext _context;
        private readonly ILogger<IExportService> _exportLogger;

        public ExportService(DataContext context, ILogger<IExportService> exportLogger)
        {
            _context = context;
            _exportLogger = exportLogger;
        }

        public async Task<ResponseObject> GetUsers()
        {
			try
			{
                var dbUsers = await _context.Users.ToListAsync();
                if (!dbUsers.Any())
                {
                    _exportLogger.LogWarning("(EXPORT)GET: Empty dataset", [dbUsers]);
                    return new ResponseObject(dbUsers, StatusCodes.Status204NoContent, "(EXPORT)GET: Empty dataset");
                }
                var users = dbUsers.Select(u => new UserDto(u.Id, u.Email, u.Status)).ToList();
                _exportLogger.LogInformation("(EXPORT)GET: Succesfully retrieved users", [users]);
                return new ResponseObject(users, StatusCodes.Status200OK, "(EXPORT)GET: Succesfully retrieved users");
			}
			catch (Exception e)
			{
                _exportLogger.LogError($"(EXPORT)GET: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"(EXPORT)GET: {e.Message}");
			}
        }
    }
}
