using System;
using System.Collections.Generic;
using System.Text;

namespace RetailInventory
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;

        //One Catrgory can have meany products
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
