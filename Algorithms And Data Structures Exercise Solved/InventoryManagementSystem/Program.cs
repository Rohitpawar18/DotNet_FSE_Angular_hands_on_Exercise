using System;
using System.Collections.Generic;

class Product
{ 
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }

    public Product(int id, string name, int quantity, double price)
    {
        ProductId = id;
        ProductName = name;
        Quantity = quantity;
        Price = price;
    }

    public void Display()
    {
        Console.WriteLine($"ID : {ProductId}, Name : {ProductName}, Quantity : {Quantity}, Price : {Price}");
    }
}

class Inventory
{
    private Dictionary<int, Product> products = new Dictionary<int, Product>();

    //Add Product
    public void AddProduct(Product product)
    {
        products[product.ProductId] = product;
        Console.WriteLine("Product added successfully");
    }

    //update product quantity
    public void UpdateProduct(int id, int newQuantity)
    {
        if (products.ContainsKey(id))
        {
            products[id].Quantity = newQuantity;
            Console.WriteLine("\nProduct Updated Successfully.");
        }
        else {
            Console.WriteLine("Product Not Found.");
        }
    }

    //delete product
    public void DeleteProduct(int id) {
        if (products.Remove(id))
        {
            Console.WriteLine("Product Deleted Successfully.");
        }
        else {
            Console.WriteLine("Product Not Found.");
        }
    }

    //Display all products
    public void DisplayProducts() {
        Console.WriteLine("\nInventory Products: ");
        foreach(var product in products.Values)
        {
            product.Display();
        }
    }
}

class Program { 
    static void Main(string[] args)
    {
        Inventory inventory = new Inventory();

        inventory.AddProduct(new Product(101, "Laptop", 10, 50000));
        inventory.AddProduct(new Product(102, "Mouse", 50, 800));
        inventory.AddProduct(new Product(103, "Keyboard", 30, 2000));

        inventory.DisplayProducts();

        inventory.UpdateProduct(102, 40);

        inventory.DisplayProducts();

        Console.ReadKey();
    }
}