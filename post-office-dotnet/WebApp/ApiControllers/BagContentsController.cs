using System;
using System.Threading.Tasks;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using PublicAPI.DTO;

namespace WebApp.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BagContentsController : ControllerBase
    {
        private readonly ShipmentService _service;

        public BagContentsController(ShipmentService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostBagContents(BagCreateDTO bagCreateDTO)
        {
            var shipmentId = await _service.CreateContentForBags(bagCreateDTO);
            
            return Created("contents", shipmentId);
        }
        
    }
}