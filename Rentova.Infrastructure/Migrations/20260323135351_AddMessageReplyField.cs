using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rentova.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMessageReplyField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reply",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reply",
                table: "Messages");
        }
    }
}
