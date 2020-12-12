using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class AppDbContext : DbContext
    {
        public DbSet<Parcel> Parcels { get; set; } = default!;
        public DbSet<LetterBag> LetterBags { get; set; } = default!;
        public DbSet<ParcelBag> ParcelBags { get; set; } = default!;
        public DbSet<Shipment> Shipments { get; set; } = default!;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
    }
}
