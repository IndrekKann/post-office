using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories;
using Domain;

namespace BLL.Services
{
    public class ShipmentService
    {
        private readonly ShipmentRepository _shipmentRepository;
        private readonly LetterBagRepository _letterBagRepository;
        private readonly ParcelBagRepository _parcelBagRepository;
        
        public ShipmentService(ShipmentRepository shipmentRepository, LetterBagRepository letterBagRepository, ParcelBagRepository parcelBagRepository)
        {
            _shipmentRepository = shipmentRepository;
            _letterBagRepository = letterBagRepository;
            _parcelBagRepository = parcelBagRepository;
        }

        public async Task<IEnumerable<Shipment>> GetAllShipments()
        {
            return await _shipmentRepository.GetAllShipments();
        }

        public async Task<Guid?> RegisterShipment(Shipment shipment)
        {
            if (IsShipmentNumberUnique(shipment.ShipmentNumber))
            {
                var addedShipment = await _shipmentRepository.Add(shipment);
                foreach (var bag in shipment.Bags)
                {
                    bag.Id = Guid.NewGuid();
                    bag.ShipmentId = addedShipment.Id;
                    // await _bagRepository.Add(bag);
                }
                return addedShipment.Id;
            }
            
            return null;
        }

        public bool IsShipmentNumberUnique(string shipmentNumber)
        {
            var shipments = _shipmentRepository.GetAllShipments().Result;
            foreach (var shipment in shipments)
            {
                if (shipment.ShipmentNumber.ToLower().Equals(shipmentNumber.ToLower()))
                {
                    return false;
                }
            }

            return true;
        }

        public string GenerateShipmentNumber()
        {
            return "";
        }

        public string GenerateFlightNumber()
        {
            return "";
        }

    }
}