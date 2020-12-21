using System;
using System.Collections.Generic;

namespace PublicAPI.DTO
{
    public class BagCreateDTO
    {
        public Guid ShipmentId { get; set; }
        public ICollection<BagDTO> Bags { get; set; } = default!;
        public ICollection<ParcelDTO>? Parcels { get; set; }
    }
}