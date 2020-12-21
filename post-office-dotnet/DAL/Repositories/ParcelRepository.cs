using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ParcelRepository : EfCoreRepository<Parcel, AppDbContext>
    {
        public ParcelRepository(AppDbContext repoDbContext) : base(repoDbContext)
        {
        }
        
        public async Task<IEnumerable<Parcel>> GetAllParcelsForBag(Guid bagId)
        {
            return await PrepareQuery().Where(parcel => parcel.BagId.Equals(bagId)).ToListAsync();
        }
        
    }
}