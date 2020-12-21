using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using Domain;
using PublicAPI.DTO;

namespace WebApp.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BagsController : ControllerBase
    {
        private readonly ShipmentService _service;

        public BagsController(ShipmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetBagNumbers()
        {
            return Ok(await _service.GetAllBagNumbers());
        }
        
        [HttpGet("{shipmentId}")]
        public async Task<ActionResult<IEnumerable<Bag>>> GetBags(Guid shipmentId)
        {
            return Ok(await _service.GetAllBagsForShipment(shipmentId));
        }
        
        [HttpPost]
        public async Task<ActionResult<Guid>> PostBags(BagCreateDTO bagCreateDTO)
        {
            var shipmentId = await _service.CreateBags(bagCreateDTO);

            return Created("bags", shipmentId);
        }
        
    }
}
