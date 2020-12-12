using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace DAL.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> Get(Guid id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T?> Delete(Guid id);
    }
}