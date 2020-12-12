using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class LetterBagRepository : EfCoreRepository<LetterBag, AppDbContext>
    {

        public LetterBagRepository(AppDbContext repoDbContext) : base(repoDbContext)
        {
        }

        public async Task<IEnumerable<LetterBag>> GetAllLetterBags(int limit = 18)
        {
            return await PrepareQuery().Take(limit).ToListAsync();
        }

        public async Task<IEnumerable<LetterBag>> GetAllLetterBagsForShipment(Guid shipmentId)
        {
            return await PrepareQuery().Where(b => b.ShipmentId.Equals(shipmentId)).ToListAsync();
        }

    }
}