using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace DAL.Repositories
{
    public abstract class EfCoreRepository<TEntity, TContext> : IRepository<TEntity>
        where TEntity : class
        where TContext : DbContext
    {
        private readonly TContext _context;

        protected EfCoreRepository(TContext context)
        {
            _context = context;
        }
        
        public async Task<TEntity> Add(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();
            
            return entity;
        }

        public async Task<TEntity?> Delete(Guid id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(id);
            
            if (entity == null)
            {
                return entity;
            }

            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<TEntity> Get(Guid id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            
            return entity;
        }

        public IQueryable<TEntity> PrepareQuery()
        {
            return _context.Set<TEntity>().AsQueryable().AsNoTracking();
        }

    }
}