using Imel.API.Models;
using Imel.API.Models.Audit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Imel.API
{
    public class DataContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DataContext(DbContextOptions<DataContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<AuditLog> AuditLogs { get; set; }
        public virtual DbSet<EntityPropertyChange> EntityPropertyChanges { get; set; }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            var auditEntries = OnBeforeSaveChanges();
            OnAfterSaveChanges(auditEntries);
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
        private List<EntityEntry> OnBeforeSaveChanges()
        {
            return ChangeTracker.Entries().ToList();
        }

        private async void OnAfterSaveChanges(List<EntityEntry> auditEntries)
        {
            var httpContext = _httpContextAccessor.HttpContext;

            foreach (var entry in auditEntries)
            {
                var model = entry.Metadata.GetTableName();

                if (entry.State == EntityState.Unchanged)
                {
                    continue;
                }

                if (model == "AuditLogs" || model == "EntityPropertyChanges")
                {
                    continue;
                }

                var auditLog = new AuditLog();
                auditLog.Id = Guid.NewGuid();

                auditLog.ChangedBy = httpContext?.User.FindFirstValue(ClaimTypes.Email); 
                auditLog.ChangedByUserId = httpContext?.User.FindFirstValue("UserId");
                auditLog.ChangedByRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);

                var routeData = httpContext?.GetRouteData();
                auditLog.ServiceName = routeData?.Values["controller"]?.ToString();
                auditLog.MethodName = routeData?.Values["action"]?.ToString();
                auditLog.Url = httpContext?.Request.Path.ToString();

                auditLog.Entity = model;
                auditLog.LoggedAt = DateTime.Now;

                if (httpContext?.Request.Body.CanSeek == true)
                {
                    httpContext.Request.Body.Position = 0;
                }
                else
                {
                    httpContext.Request.EnableBuffering();
                }

                string originalContent;
                using (var reader = new StreamReader(httpContext.Request.Body, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, leaveOpen: true))
                {
                    originalContent = await reader.ReadToEndAsync();
                    httpContext.Request.Body.Position = 0;
                }

                var bodyParameters = JsonConvert.DeserializeObject<Dictionary<string, object>>(originalContent);
                if (bodyParameters != null && bodyParameters.Any())
                {
                    var bodyContent = JsonConvert.SerializeObject(bodyParameters);
                }
                await AuditLogs.AddAsync(auditLog);

                                foreach (var property in entry.Properties)
                {
                   
                    var columnName = property.Metadata.Name;
                    var oldValue = property.OriginalValue?.ToString();
                    var newValue = property.CurrentValue?.ToString();

                    if (columnName.Equals("Email") && entry.State == EntityState.Added)
                    {
                        auditLog.OriginalValue = property?.OriginalValue?.ToString();
                        auditLog.NewValue = property?.OriginalValue?.ToString();

                        var entityPropertyChange = new EntityPropertyChange();
                        entityPropertyChange.Id = Guid.NewGuid();

                        entityPropertyChange.AuditLogId = auditLog.Id;
                        entityPropertyChange.PropertyName = columnName;
                        entityPropertyChange.PropertyTypeFullName = property.Metadata.ClrType.FullName;
                        entityPropertyChange.OriginalValue = oldValue;
                        entityPropertyChange.NewValue = "";

                        await EntityPropertyChanges.AddAsync(entityPropertyChange);

                    }

                    if (columnName.Equals("Email") && entry.State == EntityState.Deleted)
                    {
                        auditLog.OriginalValue = property?.OriginalValue?.ToString();
                        auditLog.NewValue = "";

                        var entityPropertyChange = new EntityPropertyChange();
                        entityPropertyChange.Id = Guid.NewGuid();

                        entityPropertyChange.AuditLogId = auditLog.Id;
                        entityPropertyChange.PropertyName = columnName;
                        entityPropertyChange.PropertyTypeFullName = property.Metadata.ClrType.FullName;
                        entityPropertyChange.OriginalValue = oldValue;
                        entityPropertyChange.NewValue = "";

                        await EntityPropertyChanges.AddAsync(entityPropertyChange);

                    }

                    if (!Equals(oldValue, newValue) && !columnName.Equals("CreatedDate"))
                    {
                        auditLog.OriginalValue = property.OriginalValue?.ToString();
                        auditLog.NewValue = property.CurrentValue?.ToString();

                        var entityPropertyChange = new EntityPropertyChange();
                        entityPropertyChange.Id = Guid.NewGuid();

                        entityPropertyChange.AuditLogId = auditLog.Id;
                        entityPropertyChange.PropertyName = columnName;
                        entityPropertyChange.PropertyTypeFullName = property.Metadata.ClrType.FullName;
                        entityPropertyChange.OriginalValue = oldValue;
                        entityPropertyChange.NewValue = newValue;

                        await EntityPropertyChanges.AddAsync(entityPropertyChange);
                    }
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            const int __KEYSIZE__ = 128;
            const int __ITERATIONS = 350000;
            HashAlgorithmName __HASHALGORITHM__ = HashAlgorithmName.SHA512;

            byte[] passwordSalt = RandomNumberGenerator.GetBytes(__KEYSIZE__);
            var hash = Rfc2898DeriveBytes
                .Pbkdf2(Encoding.UTF8.GetBytes("Admin_Imel2025!"), passwordSalt, __ITERATIONS, __HASHALGORITHM__, __KEYSIZE__);
            string passwordHash = Convert.ToHexString(hash).ToLower();

            modelBuilder
                .Entity<Role>().HasData(
                new Role(1, "Administrator"),
                new Role(2, "User"));

            modelBuilder
                .Entity<User>()
                .HasData(
                new User(id: 1, email: "admin@imel.ba", passwordSalt: passwordSalt, passwordHash: passwordHash)
                );

            modelBuilder.Entity<UserRole>().HasData(
                new UserRole(userId: 1, roleId: 1));

            modelBuilder
                .Entity<UserRole>()
                .HasKey(ur => new {ur.UserId, ur.RoleId});
        }
    }
}
