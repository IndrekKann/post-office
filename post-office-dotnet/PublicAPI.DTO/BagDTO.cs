using System;
using System.Collections.Generic;

namespace PublicAPI.DTO
{
    public class BagDTO
    {
        public Guid Id { get; set; }
        public string BagNumber { get; set; } = default!;
        public int Type { get; set; }
        public int LetterCount { get; set; }
        public decimal Weight { get; set; }
        public decimal Price { get; set; }
        public IEnumerable<ParcelDTO>? Parcels { get; set; }
    }
}
