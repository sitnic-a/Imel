using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Exceptions;
using Imel.API.Extensions;
using Imel.API.Helper;
using Imel.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Imel.API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly ILogger<IAuthService> _authLogger;
        private readonly RoleHelper _roleHelper;

        public const int __KEYSIZE__ = 128;
        public const int __ITERATIONS = 350000;
        public const int __ADMIN_ROLE__ = 1;
        public const int __USER_ROLE__ = 2;

        private HashAlgorithmName __HASHALGORITHM__ = HashAlgorithmName.SHA512;
        private User user = new User();

        public AuthService(DataContext context, ILogger<IAuthService> authLogger)
        {
            _context = context;
            _authLogger = authLogger;
            _roleHelper = new RoleHelper(_context);
        }
        public async Task<ResponseObject> Register(RegisterDto request)
        {
            if (!request.IsValid())
            {
                _authLogger.LogWarning("REGISTER: Argument is not valid",[request.Email,request.Password]);
                throw new ArgumentNullException(request.ToString());  
            }

            var dbUsers = _context.Users;
            var existingUser = await dbUsers.SingleOrDefaultAsync(u => u.Email == request.Email) is not null;

            if (existingUser)
            {
                _authLogger.LogWarning("REGISTER: User is in database", [existingUser]);
                throw new RecordAlreadyExistException("User already exists");
            }

            var salt = user.GenerateSalt(__KEYSIZE__);
            var hash = user.HashPassword(request.Password, salt, __ITERATIONS, __HASHALGORITHM__, __KEYSIZE__);
            user = new User(request.Email,salt, hash);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            foreach (var role in request.Roles)
            {
                await _context.UserRoles.AddAsync(new UserRole(user.Id, role));
            }
            await _context.SaveChangesAsync();

            var roles = await _roleHelper.GetUserRoles(user);
            var createdUser = new CreatedUser(user.Id, user.Email, roles);

            _authLogger.LogInformation("REGISTER: User succesfully created", [user]);
            return new ResponseObject(createdUser, StatusCodes.Status201Created, "Successfully created user");
        }
    }
}
