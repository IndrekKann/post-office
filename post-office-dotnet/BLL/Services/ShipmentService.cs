using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories;
using Domain;
using PublicAPI.DTO;

namespace BLL.Services
{
    public class ShipmentService
    {
        private readonly ShipmentRepository _shipmentRepository;
        private readonly BagRepository _bagRepository;
        private readonly ParcelRepository _parcelRepository;
        
        public ShipmentService(ShipmentRepository shipmentRepository, BagRepository bagRepository, ParcelRepository parcelRepository)
        {
            _shipmentRepository = shipmentRepository;
            _bagRepository = bagRepository;
            _parcelRepository = parcelRepository;
        }

        public async Task<IEnumerable<Shipment>> GetAllShipments()
        {
            return await _shipmentRepository.GetAllShipments();
        }
        
        public async Task<Shipment> GetShipmentById(Guid id)
        {
            return await _shipmentRepository.GetShipmentById(id);
        }
        
        public async Task<IEnumerable<Bag>> GetAllBagsForShipment(Guid shipmentId)
        {
            return await _bagRepository.GetAllBagsForShipment(shipmentId);
        }
        
        // For testing 
        public async Task<IEnumerable<Bag>> GetAllBags()
        {
            return await _bagRepository.GetAll();
        }

        public async Task<Guid?> CreateShipment(Shipment shipment)
        {
            if (IsShipmentNumberUnique(shipment.ShipmentNumber))
            {
                var addedShipment = await _shipmentRepository.Add(shipment);
                return addedShipment.Id;
            }
            
            return null;
        }

        public async Task<Guid> CreateBags(BagCreateDTO bagCreateDTO)
        {
            var oldBags = await _bagRepository.GetAllBagsForShipment(bagCreateDTO.ShipmentId);

            foreach (var newBag in bagCreateDTO.Bags)
            {
                var isNew = true;
                foreach (var oldBag in oldBags)
                {
                    if (newBag.Id.Equals(oldBag.Id))
                    {
                        isNew = false;
                        var domainBag = new Bag
                        {
                            Id = oldBag.Id,
                            ShipmentId = oldBag.ShipmentId,
                            BagNumber = newBag.BagNumber,
                            Type = (Bag.BagType)Enum.ToObject(typeof(Bag.BagType), newBag.Type),
                            LetterCount = oldBag.LetterCount,
                            Weight = oldBag.Weight,
                            Price = oldBag.Price,
                        };
                        await _bagRepository.Update(domainBag);
                    }
                }
                if (isNew)
                {
                    var domainBag = new Bag
                    {
                        ShipmentId = bagCreateDTO.ShipmentId,
                        BagNumber = newBag.BagNumber,
                        Type = (Bag.BagType)Enum.ToObject(typeof(Bag.BagType), newBag.Type) 
                    };
                    await _bagRepository.Add(domainBag);
                }
            }

            foreach (var oldBag in oldBags)
            {
                var isDeleted = true;
                foreach (var newBag in bagCreateDTO.Bags)
                {
                    if (oldBag.Id.Equals(newBag.Id))
                    {
                        isDeleted = false;
                    }
                }
                if (isDeleted)
                {    
                    await _bagRepository.Delete(oldBag.Id);
                }
            }

            return bagCreateDTO.ShipmentId;
        }

        public async Task<Guid> CreateContentForBags(BagCreateDTO bagCreateDTO)
        {
            foreach (var bag in bagCreateDTO.Bags)
            {
                if ((Bag.BagType) bag.Type == Bag.BagType.Parcel)
                {
                    var parcels = new List<Parcel>();
                    
                    foreach (var parcel in bag.Parcels!)
                    {
                        var domainParcel = new Parcel
                        {
                            BagId = parcel.BagId,
                            ParcelNumber = parcel.ParcelNumber,
                            RecipientName = parcel.RecipientName,
                            DestinationCountry = parcel.DestinationCountry,
                            Price = parcel.Price,
                            Weight = parcel.Weight
                        };
                        parcels.Add(domainParcel);
                        await _parcelRepository.Add(domainParcel);
                    }

                    var parcelBag = new Bag
                    {
                        Id = bag.Id,
                        ShipmentId = bagCreateDTO.ShipmentId, 
                        BagNumber = bag.BagNumber,
                        Type = Bag.BagType.Parcel,
                        LetterCount = bag.Parcels.Count(),
                        Weight = parcels.Sum(parcel => parcel.Weight),
                        Price = parcels.Sum(parcel => parcel.Price),
                        Parcels = parcels
                    };
                    await _bagRepository.Update(parcelBag);
                }
                else if ((Bag.BagType) bag.Type == Bag.BagType.Letter)
                {
                    var letterBag = new Bag
                    {
                        Id = bag.Id,
                        ShipmentId = bagCreateDTO.ShipmentId, 
                        BagNumber = bag.BagNumber,
                        Type = Bag.BagType.Letter,
                        LetterCount = bag.LetterCount,
                        Weight = bag.Weight,
                        Price = bag.Price
                    };

                    await _bagRepository.Update(letterBag);
                }
            }
            
            return bagCreateDTO.ShipmentId;
        }

        public async Task<Guid> FinalizeShipment(Guid shipmentId)
        {
            var shipment = await _shipmentRepository.GetShipmentById(shipmentId);
            shipment.IsFinalized = true;
            await _shipmentRepository.Update(shipment);
            
            return shipmentId;
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
        
        public bool IsBagNumberUnique(string bagNumber)
        {
            var bags = _bagRepository.GetAll().Result;
            foreach (var bag in bags)
            {
                if (bag.BagNumber.ToLower().Equals(bagNumber.ToLower()))
                {
                    return false;
                }
            }
            return true;
        }
        
    }
}