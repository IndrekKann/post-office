using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ShipmentRepository : EfCoreRepository<Shipment, AppDbContext>
    {

        public ShipmentRepository(AppDbContext repoDbContext) : base(repoDbContext)
        {
        }

        public async Task<IEnumerable<Shipment>> GetAllShipments()
        {
            return await PrepareQuery().ToListAsync();
        }

        public async Task<Shipment> GetShipmentById(Guid id)
        {
            return await PrepareQuery().FirstOrDefaultAsync(shipment => shipment.Id.Equals(id));
        }

    }
}