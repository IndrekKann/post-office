using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DAL.Helpers
{
    public static class DataInitializer
    {
        public static void MigrateDatabase(AppDbContext context)
        {
            context.Database.Migrate();
        }

        public static void DeleteDatabase(AppDbContext context)
        {
            context.Database.EnsureDeleted();
        }

        public static void SeedData(AppDbContext context)
        {


            context.SaveChanges();
        }
        
    }
}