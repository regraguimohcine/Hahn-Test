using Microsoft.EntityFrameworkCore.Migrations;
using TicketManagementSystem.Models;

#nullable disable

namespace TicketManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false, defaultValue: "Open"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                });

            // Creating some data for Tickets table
            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "Id", "Description", "Status", "Date" },
                values: new object[,]
                {
                    { 1, "Test Ticket 1", (int) TicketStatus.Open, DateTime.Now },
                    { 2, "Test Ticket 2", (int) TicketStatus.Closed, DateTime.Now.AddDays(-1) },
                    { 3, "Test Ticket 3", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");
        }
    }
}
