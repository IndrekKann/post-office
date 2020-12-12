using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories;
using Domain;

namespace BLL.Services
{
    public class ParcelBagService
    {
        private readonly ParcelBagRepository _repository;

        public ParcelBagService(ParcelBagRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ParcelBag>> GetAllParcelBags()
        {
            return await _repository.GetAllParcelBags();
        }

        public async Task<IEnumerable<ParcelBag>> GetAllParcelBagsForShipment(Guid shipmentId)
        {
            return await _repository.GetAllParcelBagsForShipment(shipmentId);
        }

        // public async Task<Guid> AddParcelBag(ParcelBag bag)
        // {
        //     _repository.Add()
        // }

        public decimal CalculateParcelBagPrice(ParcelBag bag)
        {
            return bag.Parcels.Sum(parcel => parcel.Price);
        }

        public decimal CalculateParcelBagWeight(ParcelBag bag)
        {
            return bag.Parcels.Sum(parcel => parcel.Weight);
        }
    }
}