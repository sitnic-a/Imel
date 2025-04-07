﻿using Imel.API.Configuration;
using Imel.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Imel.API.Utils
{
    public class JWTService
    {

        private readonly AppSettings _options;
        private readonly DataContext _context;
        public JWTService(IOptions<AppSettings> options, DataContext context)
        {
            _options = options.Value;
            _context = context;
        }

        public string GenerateToken(User user)
        {
            string configurationKey = _options.ImelKey;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configurationKey);
            var claims = GetClaims(user);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = "http://localhost:5173",
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(10),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public List<Claim> GetClaims(User user)
        {
            var roles = GetRoles(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            if (roles != null)
            {
                foreach (var role in roles)
                {
                    if (role != null)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role.Name));
                        claims.Add(new Claim("RoleId", role.Id.ToString()));
                    }
                }
            }

            return claims;
        }

        public List<Role> GetRoles(User user)
        {
            if (user != null)
            {
                var userRoleIds = _context.UserRoles.Where(ur => ur.UserId == user.Id)
                    .Select(r => r.RoleId)
                    .ToList();

                var roles = new List<Role>();
                foreach (var roleId in userRoleIds)
                {
                    var dbRole = _context.Roles.Find(roleId);
                    if (dbRole != null) roles.Add(dbRole);
                }
                return roles;
            }
            return new List<Role>();
        }
    }
}
