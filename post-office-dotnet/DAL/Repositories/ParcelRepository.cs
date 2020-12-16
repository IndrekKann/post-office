using Domain;

namespace DAL.Repositories
{
    public class ParcelRepository : EfCoreRepository<Parcel, AppDbContext>
    {
        public ParcelRepository(AppDbContext repoDbContext) : base(repoDbContext)
        {
        }
        
    }
}