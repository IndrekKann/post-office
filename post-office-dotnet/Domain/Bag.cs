using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Bag : BaseEntity
    {
        public Guid ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }

        [MaxLength(15, ErrorMessage = "Bag number cannot be longer than 15 characters")]
        [RegularExpression("^[a-zA-Z0-9]{1,15}$", ErrorMessage = "Bag number does not match the required format")]
        public string BagNumber { get; set; } = default!;

        public ICollection<Parcel>? Parcels { get; set; }

        [Range(1, int.MaxValue)]
        public int LetterCount { get; set; }
        
        [Column(TypeName = "decimal(18,3)")]
        public decimal Weight { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public BagType Type { get; set; }
        
        public enum BagType
        {
            Parcel,
            Letter
        }
        
    }
}
