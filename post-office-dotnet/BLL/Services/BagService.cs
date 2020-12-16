using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.Repositories;
using Domain;

namespace BLL.Services
{
    public class BagService
    {
        private readonly BagRepository _repository;

        public BagService(BagRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Bag>> GetAllBagsForShipment(Guid shipmentId)
        {
            return await _repository.GetAllBagsForShipment(shipmentId);
        }

        public async Task<Guid> AddBag(Guid shipmentId, Bag bag)
        {
            bag.ShipmentId = shipmentId;
            var addedBag = await _repository.Add(bag);
            
            return addedBag.Id;
        }
        
    }
}