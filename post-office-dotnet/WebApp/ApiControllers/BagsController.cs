using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using Domain;

namespace WebApp.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BagsController : ControllerBase
    {
        // private readonly BagService _service;
        //
        // public BagsController(BagService service)
        // {
        //     _service = service;
        // }
        //
        // [HttpGet("{shipmentId}")]
        // public async Task<ActionResult<IEnumerable<Shipment>>> GetBags(Guid shipmentId)
        // {
        //     return Ok(await _service.GetAllBagsForShipment(shipmentId));
        // }
        
        // [HttpPost]
        // public async Task<ActionResult<Shipment>> PostShipment(Shipment shipment)
        // {
        //     var shipmentId = await _service.(shipment);
        //
        //     if (shipmentId == null)
        //     {
        //         ModelState.AddModelError("shipmentNumber", "Shipment number must be unique.");
        //         return BadRequest(ModelState);
        //     }
        //
        //     return CreatedAtAction("GetShipment", new { id = shipmentId }, shipment);
        // }
        
    }
}
