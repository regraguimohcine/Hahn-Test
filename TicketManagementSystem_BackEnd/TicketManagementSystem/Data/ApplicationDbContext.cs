using Microsoft.EntityFrameworkCore;
using TicketManagementSystem.Models;

namespace TicketManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>().Property(x => x.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<Ticket>()
                .Property(t => t.Description)
                .HasDefaultValue(TicketStatus.Open);
        }
    }
}
