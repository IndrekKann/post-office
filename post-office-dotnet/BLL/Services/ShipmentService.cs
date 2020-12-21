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

        public async Task<Bag> GetBagById(Guid bagId)
        {
            return await _bagRepository.Get(bagId);
        }

        public async Task<IEnumerable<Parcel>> GetAllParcelsForShipment(Guid shipmentId)
        {
            var parcels = new List<Parcel>();
            var bags = await _bagRepository.GetAllBagsForShipment(shipmentId);
            foreach (var bag in bags)
            {
                parcels.AddRange(await _parcelRepository.GetAllParcelsForBag(bag.Id));
            }

            return parcels;
        }

        public async Task<IEnumerable<string>> GetAllBagNumbers()
        {
            var bags = await _bagRepository.GetAll();
            return bags.Select(bag => bag.BagNumber).ToList();
        }
        
        public async Task<IEnumerable<string>> GetAllParcelNumbers()
        {
            var parcels = await _parcelRepository.GetAll();
            return parcels.Select(parcel => parcel.ParcelNumber).ToList();
        }

        public async Task<Guid> CreateShipment(Shipment shipment)
        {
            var addedShipment = await _shipmentRepository.Add(shipment);
            return addedShipment.Id;
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
                    var oldParcelIds = _parcelRepository.GetAllParcelsForBag(bag.Id).Result.Select(oldParcel => oldParcel.Id).ToList();
                    
                    foreach (var parcel in bagCreateDTO.Parcels!)
                    {
                        if (oldParcelIds.Contains(parcel.Id))
                        {
                            var domainParcel = new Parcel
                            {
                                Id = parcel.Id,
                                BagId = parcel.BagId,
                                ParcelNumber = parcel.ParcelNumber,
                                RecipientName = parcel.RecipientName,
                                DestinationCountry = parcel.DestinationCountry,
                                Weight = parcel.Weight,
                                Price = parcel.Price
                            };
                            await _parcelRepository.Update(domainParcel);
                        }
                        else
                        {
                            var domainParcel = new Parcel
                            {
                                BagId = parcel.BagId,
                                ParcelNumber = parcel.ParcelNumber,
                                RecipientName = parcel.RecipientName,
                                DestinationCountry = parcel.DestinationCountry,
                                Weight = parcel.Weight,
                                Price = parcel.Price
                            };
                            parcels.Add(domainParcel);
                            await _parcelRepository.Add(domainParcel);
                        }
                    }

                    foreach (var id in oldParcelIds)
                    {
                        var isDeleted = true;
                        foreach (var parcel in bagCreateDTO.Parcels)
                        {
                            if (parcel.Id.Equals(id))
                            {
                                isDeleted = false;
                            }
                        }
                        if (isDeleted)
                        {
                            await _parcelRepository.Delete(id);
                        }
                    }

                    var parcelBag = new Bag
                    {
                        Id = bag.Id,
                        ShipmentId = bagCreateDTO.ShipmentId, 
                        BagNumber = bag.BagNumber,
                        Type = Bag.BagType.Parcel,
                        LetterCount = parcels.Count,
                        Weight = parcels.Where(parcel => parcel.BagId == bag.Id).Sum(parcel => parcel.Weight),
                        Price = parcels.Where(parcel => parcel.BagId == bag.Id).Sum(parcel => parcel.Price),
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

        public Shipment CreateErrorMessage(Shipment shipment)
        {
            var errorShipment = new Shipment
            {
                Id = shipment.Id,
                ShipmentNumber = "Shipment number must be unique.",
                Airport = shipment.Airport,
                FlightNumber = shipment.FlightNumber,
                FlightDate = shipment.FlightDate,
                IsFinalized = shipment.IsFinalized,
            };

            return errorShipment;
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