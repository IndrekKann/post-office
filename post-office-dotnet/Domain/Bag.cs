using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Bag : BaseEntity
    {
        public Guid ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }

        [MaxLength(15, ErrorMessage = "Bag number cannot be longer than 15 characters")]
        [RegularExpression("^[a-zA-Z0-9]{1,15}$", ErrorMessage = "Bag number does not match the required format")]
        public string BagNumber { get; set; } = default!;
    }
}
