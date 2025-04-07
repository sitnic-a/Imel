using Imel.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Imel.API
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Role>().HasData(
                new Role(1, "Administrator"),
                new Role(2, "User"));

            modelBuilder
                .Entity<UserRole>()
                .HasKey(ur => new {ur.UserId, ur.RoleId});
        }
    }
}
