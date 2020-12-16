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
        public async Task<ActionResult<IEnumerable<Shipment>>> GetBags()
        {
            return Ok(await _service.GetAllBags());
        }
        
        [HttpGet("{shipmentId}")]
        public async Task<ActionResult<IEnumerable<Shipment>>> GetBags(Guid shipmentId)
        {
            return Ok(await _service.GetAllBagsForShipment(shipmentId));
        }
        
        [HttpPost]
        public async Task<ActionResult<Guid>> PostBags(BagCreateDTO bagCreateDTO)
        {
            var shipment = await _service.GetShipmentById(bagCreateDTO.ShipmentId);
            var shipmentId = await _service.CreateBags(bagCreateDTO);
            
            if (shipmentId == null)
            {
                ModelState.AddModelError("bags", "Bag number must be unique.");
                return BadRequest(ModelState);
            }

            if (shipment.IsFinalized)
            {
                ModelState.AddModelError("isFinalized", "Cannot edit contents of finalized shipment.");
                return BadRequest(ModelState);
            }

            return Created("bags", shipmentId);
        }
        
        
    }
}
