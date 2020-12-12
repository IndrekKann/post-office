using System.Collections.Generic;

namespace Domain
{
    public class ParcelBag : Bag
    {
        public ICollection<Parcel> Parcels { get; set; } = default!;
    }
}
