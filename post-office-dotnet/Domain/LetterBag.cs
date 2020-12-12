using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class LetterBag : Bag
    {
        [Range(1, int.MaxValue)]
        public int LetterCount { get; set; }
        
        [Column(TypeName = "decimal(18,3)")]
        public decimal Weight { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}
