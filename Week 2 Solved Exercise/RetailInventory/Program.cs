using Microsoft.EntityFrameworkCore;
using RetailInventory;

Console.WriteLine("=== Retil Inventory System ===\n");

using var context = new AppDbContext();
// make sure databse is created
await context.Database.EnsureCreatedAsync();

// Insert Data
// Clear old data first to avoid duplicates
var existingProducts = context.Products.ToList();
var existingCategories = context.Categories.ToList();

if (existingProducts.Any())
{
    context.Products.RemoveRange(existingProducts);
    await context.SaveChangesAsync();
}
if (existingCategories.Any())
{
    context.Categories.RemoveRange(existingCategories);
    await context.SaveChangesAsync();
}

// Add Categories (only if database is empty)

    Console.WriteLine("Adding Categories...\n");

    //create categories
    var electronics = new Category { Name = "Electronics" };
    var groceries = new Category { Name = "Groceries" };

    await context.Categories.AddRangeAsync(electronics, groceries);
    await context.SaveChangesAsync();
    Console.WriteLine("Categories added successfully!\n");

    //create products linked to catregories
    var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
    var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };
    var product3 = new Product { Name = "Phone", Price = 30000, Category = electronics };
    var product4 = new Product { Name = "Wheat Bag", Price = 800, Category = groceries };

    await context.Products.AddRangeAsync(product1, product2, product3, product4);
    await context.SaveChangesAsync();
    Console.WriteLine("Products added successfully to respective Categories!\n");


//Retrieving data
Console.WriteLine(">>> Retrieving Data\n");

Console.WriteLine("All Products : ");
var allProducts = await context.Products.ToListAsync();
foreach (var p in allProducts)
{
    Console.WriteLine($"    - {p.Name} : Rs.{p.Price}");
}


//Find Profuct By Id
Console.WriteLine("\n Find Product by ID: 1 : ");
var productById = await context.Products.FindAsync(1);
Console.WriteLine($"    Found : {productById?.Name}");


//FirstOrDefault With Condition
Console.WriteLine("\n First product with price > 50000: ");
var expensive = await context.Products
            .FirstOrDefaultAsync(p => p.Price > 50000);
Console.WriteLine($"    Expensive Product : {expensive?.Name ?? "Not Found"}");


// Update Price Of Laptop
var laptopToUpdate = await context.Products
            .FirstOrDefaultAsync(p => p.Name == "Laptop");

if(laptopToUpdate != null)
{
    Console.WriteLine($"\nLaptop Price BEFORE update : Rs.{laptopToUpdate.Price}");
    laptopToUpdate.Price = 50000;
    await context.SaveChangesAsync();
    Console.WriteLine($"\nLaptop Price AFTER update : Rs.{laptopToUpdate.Price}");
}


// Delete Rice Bag
var toDelete = await context.Products
            .FirstOrDefaultAsync(p => p.Name == "Rice Bag");

if(toDelete != null)
{
    context.Products.Remove(toDelete);
    await context.SaveChangesAsync();
    Console.WriteLine("\n'Rice Bag' Deleted Successfully");
}
else
{
    Console.WriteLine("\n'Rice Bag' Not Found");
}


// LINQ Queries
Console.WriteLine("\n>>> LINQ Queries\n");

Console.WriteLine("Products with Price > 1000, sorted high to low:");
var filtered = await context.Products
        .Where(p => p.Price > 500)
        .OrderByDescending(p => p.Price)
        .ToListAsync();

foreach (var p in filtered)
{
    Console.WriteLine($"    - {p.Name} : Rs.{p.Price}");
}


// DTO projection
Console.WriteLine("\nProduct Name & Price only (DTO projection):");
var productDTO = await context.Products
        .Select(p => new { p.Name, p.Price })
        .ToListAsync();

foreach(var p in productDTO)
{
    Console.WriteLine($"    - {p.Name} => Rs.{p.Price}");
}


// With Category Name
Console.WriteLine("\nProducts with Category Name:");
var withCategory = await context.Products
            .Include(p => p.Category)
            .Select(p => new { p.Name, p.Price, CategoryName = p.Category.Name})
            .ToListAsync();

foreach(var p in withCategory)
{
    Console.WriteLine($"    - {p.Name} | Rs.{p.Price} | {p.CategoryName}");
}