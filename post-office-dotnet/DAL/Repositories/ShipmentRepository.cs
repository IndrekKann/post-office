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

        public async Task<IEnumerable<Shipment>> GetAllShipments(int limit = 18)
        {
            return await PrepareQuery().Take(limit).ToListAsync();
        }

        public async Task<Shipment> GetShipmentBySearch(string search)
        {
            return String.IsNullOrWhiteSpace(search) ? await PrepareQuery()
                .Where(shipment => shipment.ShipmentNumber.ToLower().Equals(search.ToLower()))
                .FirstOrDefaultAsync() : null; // return not found
        }

        public async Task<Shipment> GetShipmentById(Guid id)
        {
            return await PrepareQuery().FirstOrDefaultAsync(shipment => shipment.Id.Equals(id));
        }

    }
}