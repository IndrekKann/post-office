using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Parcel : BaseEntity
    {
        public Guid BagId { get; set; }
        public Bag? Bag { get; set; }

        [RegularExpression("^\\w{2}\\d{6}\\w{2}$", ErrorMessage = "Parcel number does not match the required format")]
        public string ParcelNumber { get; set; } = default!;
        
        [MaxLength(100, ErrorMessage = "Recipient name cannot be longer than 100 characters")]
        public string RecipientName { get; set; } = default!;
        
        [RegularExpression("^\\w{2}$", ErrorMessage = "Destination country does not match the required format (e.g. EE, LV, FI)")]
        public string DestinationCountry { get; set; } = default!;
        
        [Column(TypeName = "decimal(18,3)")]
        public decimal Weight { get; set; } = default!;
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } = default!;
    }
}
