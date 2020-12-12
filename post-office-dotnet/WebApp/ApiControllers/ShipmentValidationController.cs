using System.Threading.Tasks;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using DAL;

namespace WebApp.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentValidationController : ControllerBase
    {
        private readonly ShipmentService _service;

        public ShipmentValidationController(AppDbContext context, ShipmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetValidation(string shipmentNumber)
        {
            return _service.IsShipmentNumberUnique(shipmentNumber) ? StatusCode(200) : StatusCode(400);
        }
        
    }
}