using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Shipment : BaseEntity
    {
        [RegularExpression("^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{6}$", ErrorMessage = "Shipment number does not match the required format")]
        public string ShipmentNumber { get; set; } = default!;
        
        public AirportAbbreviation Airport { get; set; }
        
        [RegularExpression("^\\w{2}\\d{4}$", ErrorMessage = "Flight number does not match the required format")]
        public string FlightNumber { get; set; } = default!;
        
        public DateTime FlightDate { get; set; }
        
        public ICollection<Bag> Bags { get; set; } = default!;

        public bool IsFinalized { get; set; }

        public enum AirportAbbreviation
        {
            TLL,
            RIX,
            HEL
        }
        
    }
}
