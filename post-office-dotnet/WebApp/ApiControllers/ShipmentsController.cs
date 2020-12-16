using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using DAL;
using Domain;

namespace WebApp.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ShipmentService _service;

        public ShipmentsController(AppDbContext context, ShipmentService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipment>>> GetShipments()
        {
            return Ok(await _service.GetAllShipments());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipment>> GetShipment(Guid id)
        {
            var shipment = await _context.Shipments.FindAsync(id);

            if (shipment == null)
            {
                return NotFound();
            }

            return shipment;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutShipment(Guid id)
        {
            var shipmentId = await _service.FinalizeShipment(id);

            return Ok(shipmentId);
        }
        
        [HttpPost]
        public async Task<ActionResult<Shipment>> PostShipment(Shipment shipment)
        {
            var shipmentId = await _service.CreateShipment(shipment);

            if (shipmentId == null)
            {
                ModelState.AddModelError("shipmentNumber", "Shipment number must be unique.");
                return BadRequest(ModelState);
            }

            return CreatedAtAction("GetShipment", new { id = shipmentId }, shipment);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Shipment>> DeleteShipment(Guid id)
        {
            var shipment = await _context.Shipments.FindAsync(id);
            if (shipment == null)
            {
                return NotFound();
            }

            _context.Shipments.Remove(shipment);
            await _context.SaveChangesAsync();

            return shipment;
        }
        
    }
}
