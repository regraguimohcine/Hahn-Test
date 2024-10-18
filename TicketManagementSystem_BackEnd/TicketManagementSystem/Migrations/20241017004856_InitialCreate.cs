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
                    { 3, "Test Ticket 3", (int) TicketStatus.Closed, DateTime.Now.AddDays(-1) },
                    { 4, "Test Ticket 3", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) },
                    { 5, "Test Ticket 5", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) },
                    { 6, "Test Ticket 6", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) },
                    { 7, "Test Ticket 7", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) },
                    { 8, "Test Ticket 8", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) },
                    { 9, "Test Ticket 9", (int) TicketStatus.Open, DateTime.Now.AddDays(-2) },
                    { 10, "Test Ticket 10", (int) TicketStatus.Open, DateTime.Now.AddDays(-3) },
                    { 11, "Test Ticket 11", (int) TicketStatus.Open, DateTime.Now.AddDays(-3) }
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
