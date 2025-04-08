using Azure.Core;
using Imel.API.Dto.Request;
using Imel.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;

namespace Imel.API.Extensions
{
    public static class UserExtensionMethods
    {
        public static byte[] GenerateSalt(this User user, int keySize)
        {
            return RandomNumberGenerator.GetBytes(keySize);
        }

        public static string HashPassword(this User user, string password, byte[] salt, int iterations, HashAlgorithmName hashAlgorithm, int keySize)
        {
            var hash = Rfc2898DeriveBytes.Pbkdf2(Encoding.UTF8.GetBytes(password), salt, iterations, hashAlgorithm, keySize);
            return Convert.ToHexString(hash).ToLower();
        }

        public static bool IsValid(this User user, string email, string password)
        {
            if (String.IsNullOrEmpty(email) ||
                String.IsNullOrWhiteSpace(email) ||
                String.IsNullOrEmpty(password) ||
                String.IsNullOrWhiteSpace(password)) return false;

            if (password.Length < 8) return false;

            return true;
        }

        public static bool IsFiltering(this QueryUsers query)
        {
            return !String.IsNullOrEmpty(query.Email) && 
                !String.IsNullOrWhiteSpace(query.Email) || query.Status != null;
        }
    }
}
