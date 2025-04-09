using Imel.API.Configuration;
using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Extensions;
using Imel.API.Helper;
using Imel.API.Models;
using Imel.API.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;

namespace Imel.API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly ILogger<IAuthService> _authLogger;
        private readonly IOptions<AppSettings> _options;
        private readonly RoleHelper _roleHelper;

        public const int __KEYSIZE__ = 128;
        public const int __ITERATIONS = 350000;
        public const int __ADMIN_ROLE__ = 1;
        public const int __USER_ROLE__ = 2;

        private HashAlgorithmName __HASHALGORITHM__ = HashAlgorithmName.SHA512;
        private Models.User user = new Models.User();

        public AuthService(DataContext context, ILogger<IAuthService> authLogger, IOptions<AppSettings> options)
        {
            _context = context;
            _authLogger = authLogger;
            _roleHelper = new RoleHelper(_context);
            _options = options;
        }
        public async Task<ResponseObject> Register(RegisterDto request)
        {
            try
            {
                if (!request.IsValid())
                {
                    _authLogger.LogWarning("REGISTER: Argument is not valid", [request.Email, request.Password]);
                    return new ResponseObject(request, StatusCodes.Status400BadRequest, "REGISTER: Argument is not valid");
                }

                var dbUsers = _context.Users;
                var existingUser = await dbUsers.SingleOrDefaultAsync(u => u.Email == request.Email) is not null;

                if (existingUser)
                {
                    _authLogger.LogWarning("REGISTER: User is in database", [existingUser]);
                    return new ResponseObject(existingUser, StatusCodes.Status400BadRequest, "REGISTER: User is in database");
                }

                var salt = user.GenerateSalt(__KEYSIZE__);
                var hash = user.HashPassword(request.Password, salt, __ITERATIONS, __HASHALGORITHM__, __KEYSIZE__);
                user = new Models.User(request.Email, salt, hash);

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
            catch (Exception e)
            {
                _authLogger.LogError($"REGISTER: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"REGISTER: {e.Message}");
            }

        }

        public async Task<ResponseObject> Login(LoginDto request)
        {
            try
            {
                if (!user.IsValid(request.Email, request.Password))
                {
                    _authLogger.LogError("LOGIN: Argument is not valid", [request]);
                    return new ResponseObject(request, StatusCodes.Status400BadRequest, "LOGIN: Argument is not valid");
                }
                var jwtMiddleware = new JWTService(_options, _context);
                var authenticated = await VerifyCredentials(request);
                var dbUser = await _context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);

                if (authenticated && dbUser is not null)
                {
                    var dbUserRoles = await _roleHelper.GetUserRoles(dbUser);
                    var token = jwtMiddleware.GenerateToken(dbUser);

                    if (String.IsNullOrEmpty(token))
                    {
                        _authLogger.LogError("LOGIN: Token was not created", [token]);
                        return new ResponseObject(token, StatusCodes.Status401Unauthorized, "LOGIN: Token was not created");
                    }

                    var responseUser = new SignedUser(dbUser.Id, dbUser.Email, token, dbUserRoles);
                    _authLogger.LogInformation("LOGIN: Successfully logged in", [responseUser]);
                    return new ResponseObject(responseUser, StatusCodes.Status200OK, "LOGIN: Successfully logged in");
                }

                _authLogger.LogWarning("LOGIN: Database user not available", [dbUser]);
                return new ResponseObject(dbUser, StatusCodes.Status400BadRequest, "LOGIN: Database user not available");
            }
            catch (Exception e)
            {
                _authLogger.LogError("LOGIN: Database user not available", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"LOGIN: {e.Message}");
            }
        }

        private async Task<bool> VerifyCredentials(LoginDto request)
        {
            var dbUsers = _context.Users;
            var existingUser = await dbUsers.SingleOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser is not null)
            {
                var hashToCompare = user.HashPassword(request.Password, existingUser.PasswordSalt, __ITERATIONS, __HASHALGORITHM__, __KEYSIZE__);
                return CryptographicOperations.FixedTimeEquals(Convert.FromBase64String(hashToCompare), Convert.FromBase64String(existingUser.PasswordHash));
            }
            return false;
        }
    }
}
