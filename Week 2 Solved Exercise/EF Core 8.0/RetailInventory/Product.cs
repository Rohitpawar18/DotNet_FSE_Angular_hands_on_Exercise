using Microsoft.Extensions.Logging.Abstractions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace RetailInventory
{
    public class Product
    {
        public int ProductId { get; set; }
        public String Name { get; set; } = string.Empty;
        public decimal Price { get; set; }

        //Foreign Key
        public int CategoryId { get; set; }

        //Navigation Property
        public Category Category { get; set; } = null;
    }
}
