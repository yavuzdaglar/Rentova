using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rentova.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class mig3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reservations_CarId",
                table: "Reservations");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CarId_StartDate",
                table: "Reservations",
                columns: new[] { "CarId", "StartDate" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reservations_CarId_StartDate",
                table: "Reservations");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CarId",
                table: "Reservations",
                column: "CarId");
        }
    }
}
