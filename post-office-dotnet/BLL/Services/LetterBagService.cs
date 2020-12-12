using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories;
using Domain;

namespace BLL.Services
{
    public class LetterBagService
    {
        private readonly LetterBagRepository _repository;

        public LetterBagService(LetterBagRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LetterBag>> GetAllLetterBags()
        {
            return await _repository.GetAllLetterBags();
        }

        public async Task<IEnumerable<LetterBag>> GetAllLetterBagsForShipment(Guid shipmentId)
        {
            return await _repository.GetAllLetterBagsForShipment(shipmentId);
        }

        // public async Task<Guid> AddLetterBag(LetterBag bag)
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