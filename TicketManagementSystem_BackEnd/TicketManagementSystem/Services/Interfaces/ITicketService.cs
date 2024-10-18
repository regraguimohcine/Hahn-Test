using TicketManagementSystem.Models;

namespace TicketManagementSystem.Services.Interfaces
{
    public interface ITicketService
    {
        Task<(List<Ticket> Tickets, int TotalCount)> GetTicketsAsync(int page, int pageSize);
        Task<Ticket?> GetTicketAsync(int id);
        Task<Ticket> CreateTicketAsync(Ticket ticket);
        Task<Ticket> UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int id);
    }

}
