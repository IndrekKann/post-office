using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ParcelBagRepository : EfCoreRepository<ParcelBag, AppDbContext>
    {

        public ParcelBagRepository(AppDbContext repoDbContext) : base(repoDbContext)
        {
        }

        public async Task<IEnumerable<ParcelBag>> GetAllParcelBags(int limit = 18)
        {
            return await PrepareQuery().Take(limit).ToListAsync();
        }

        public async Task<IEnumerable<ParcelBag>> GetAllParcelBagsForShipment(Guid shipmentId)
        {
            return await PrepareQuery().Where(b => b.ShipmentId.Equals(shipmentId)).ToListAsync();
        }

    }
}