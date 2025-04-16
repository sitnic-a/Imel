using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Imel.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Created", "Email", "Modified", "PasswordHash", "PasswordSalt", "Status" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin@imel.ba", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "60537588dadf44d5e73c0dc27e6ae3988abc63c4545eb36910cef70bd1b5886ec42ff98bb17a53eacd2f148fa2873ff17569f98d5746898c5ef28bfa6cb3d7634bcac2526ef8bde71c9d0e81160350a745cf529a03d6dacad28c968600ff2ed594945f9a9e3c275f47c6a906c9fc6e11df523a16e70a02f53667a80c365f85f4", new byte[] { 200, 84, 54, 43, 126, 144, 170, 7, 177, 140, 177, 221, 126, 171, 157, 79, 197, 18, 118, 220, 26, 58, 208, 37, 14, 196, 64, 74, 138, 163, 210, 123, 71, 112, 189, 151, 198, 144, 179, 85, 80, 5, 181, 157, 206, 118, 159, 148, 239, 238, 22, 63, 50, 136, 198, 9, 63, 134, 38, 46, 157, 114, 89, 236, 5, 155, 165, 38, 242, 165, 209, 218, 102, 225, 102, 91, 24, 29, 126, 160, 208, 195, 176, 19, 169, 165, 33, 112, 106, 45, 196, 165, 16, 117, 236, 4, 50, 141, 44, 6, 99, 187, 25, 4, 97, 164, 58, 110, 70, 84, 50, 69, 23, 46, 33, 73, 224, 228, 79, 130, 116, 79, 242, 1, 40, 189, 94, 179 }, true });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { 1, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
