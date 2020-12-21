using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.Services;
using Domain;
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
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetParcelNumbers()
        {
            return Ok(await _service.GetAllParcelNumbers());
        }
                
        [HttpGet("{shipmentId}")]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetBags(Guid shipmentId)
        {
            return Ok(await _service.GetAllParcelsForShipment(shipmentId));
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostBagContents(BagCreateDTO bagCreateDTO)
        {
            var shipmentId = await _service.CreateContentForBags(bagCreateDTO);
            
            return Created("contents", shipmentId);
        }
        
    }
}