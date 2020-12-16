using System;

namespace PublicAPI.DTO
{
    public class ParcelDTO
    {
        public Guid BagId { get; set; }
        public string ParcelNumber { get; set; } = default!;
        public string RecipientName { get; set; } = default!;
        public string DestinationCountry { get; set; } = default!;
        public decimal Weight { get; set; }
        public decimal Price { get; set; }
    }
}
