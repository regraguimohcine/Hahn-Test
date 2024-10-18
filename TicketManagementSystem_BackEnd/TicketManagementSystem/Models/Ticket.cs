using System.ComponentModel.DataAnnotations;

namespace TicketManagementSystem.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public required string Description { get; set; }

        [Required]
        public required TicketStatus Status { get; set; }

        public DateTime Date { get; set; }
    }

    public enum TicketStatus
    {
        Open,
        Closed
    }
}
