using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class BagRepository : EfCoreRepository<Bag, AppDbContext>
    {

        public BagRepository(AppDbContext repoDbContext) : base(repoDbContext)
        {
        }

        public async Task<IEnumerable<Bag>> GetAllBagsForShipment(Guid shipmentId)
        {
            return await PrepareQuery().Where(bag => bag.ShipmentId.Equals(shipmentId)).ToListAsync();
        }
        
    }
}