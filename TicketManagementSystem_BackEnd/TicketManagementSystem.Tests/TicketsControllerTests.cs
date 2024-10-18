using System.Net.Sockets;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TicketAPI.Services;
using TicketManagementSystem.Controllers;
using TicketManagementSystem.Models;
using TicketManagementSystem.Services.Interfaces;
using Xunit;

namespace TicketManagementSystem.Tests
{
    public class TicketsControllerTests
    {
        private readonly TicketsController _controller;
        private readonly Mock<ITicketService> _mockTicketService;

        public TicketsControllerTests()
        {
            _mockTicketService = new Mock<ITicketService>();
            _controller = new TicketsController(_mockTicketService.Object);
        }

        public async Task GetTickets_ReturnsOkResult_WithTickets()
        {
            var tickets = new List<Ticket>
            {
                new Ticket { Id = 1, Description = "Test Ticket", Status = TicketStatus.Open, Date = DateTime.Now }
            };

            _mockTicketService.Setup(service => service.GetTicketsAsync(1, 10))
                .ReturnsAsync((tickets, tickets.Count));

            var result = await _controller.GetTickets(1, 10);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<dynamic>(okResult.Value);

            var returnedTickets = Assert.IsAssignableFrom<List<Ticket>>(returnValue.Tickets);
            Assert.Equal(tickets.Count, returnValue.TotalCount);

            for (int i = 0; i < tickets.Count; i++)
            {
                Assert.Equal(tickets[i].Id, returnedTickets[i].Id);
                Assert.Equal(tickets[i].Description, returnedTickets[i].Description);
                Assert.Equal(tickets[i].Status, returnedTickets[i].Status);
                Assert.Equal(tickets[i].Date, returnedTickets[i].Date);
            }
        }




        [Fact]
        public async Task GetTicket_ReturnsNotFound_WhenTicketDoesNotExist()
        {
            int ticketId = 1;
            _mockTicketService.Setup(service => service.GetTicketAsync(ticketId))
                .ReturnsAsync((Ticket)null);

            var result = await _controller.GetTicket(ticketId);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task CreateTicket_ReturnsCreatedResult_WhenModelIsValid()
        {
            var newTicket = new Ticket { Id = 2, Description = "New Ticket", Status = TicketStatus.Open, Date = DateTime.Now };
            _mockTicketService.Setup(service => service.CreateTicketAsync(newTicket))
                .ReturnsAsync(newTicket);

            var result = await _controller.CreateTicket(newTicket);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(newTicket.Id, createdResult.RouteValues["id"]);
            Assert.Equal(newTicket, createdResult.Value);
        }

        [Fact]
        public async Task UpdateTicket_ReturnsBadRequest_WhenIdsDoNotMatch()
        {
            var ticket = new Ticket { Id = 2, Description = "Updated Ticket", Status = TicketStatus.Closed, Date = DateTime.Now };

            var result = await _controller.UpdateTicke(1, ticket);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task DeleteTicket_ReturnsNoContent_WhenSuccessful()
        {
            int ticketId = 1;

            _mockTicketService.Setup(service => service.DeleteTicketAsync(ticketId))
                .Returns(Task.CompletedTask);

            var result = await _controller.DeleteTicket(ticketId);

            Assert.IsType<NoContentResult>(result);
        }
    }
}
