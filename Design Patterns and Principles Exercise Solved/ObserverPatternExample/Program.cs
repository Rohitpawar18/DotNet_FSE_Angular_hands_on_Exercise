using System;
using System.Collections.Generic;

//Observer Interface
public interface IObserver
{
    void update(string stockName, double price);
}

// Subject Interface
public interface IStock
{
    void RegisterObserver(IObserver observer);
    void RemoveObserver(IObserver observer);
    void NotifyObservers();
}

// Concrete Subject
public class StockMarket : IStock
{
    private List<IObserver> observers = new List<IObserver>();

    private string stockName;
    private double stockPrice;

    public void RegisterObserver(IObserver observer)
    {
        observers.Add(observer);
    }

    public void RemoveObserver(IObserver observer) {
        observers.Remove(observer);
    }

    public void NotifyObservers() {
        foreach (IObserver observer in observers) {
            observer.update(stockName, stockPrice);
        }
    }

    public void SetStock(string name, double price) {
        stockName = name;
        stockPrice = price;

        Console.WriteLine("\nStock Updated : ");
        Console.WriteLine(stockName + " = Rs."+stockPrice);

        NotifyObservers();
    }
}

// Concrete Observer Mobile App
public class MobileAPP : IObserver
{
    public void update (string stockName, double stockPrice)
    {
        Console.WriteLine("Mobile App : "+stockName + " price changed to Rs."+stockPrice);
    }
}

//Concrete Observer Web App
public class  WebApp : IObserver
{
    public void update(string stockName, double stockPrice)
    {
        Console.WriteLine("Web App : "+stockName + " price changed to Rs."+stockPrice);
    }
}

//Main class
class Program 
{ 
    static void Main(string[] args)
    {
        StockMarket stockMarket = new StockMarket();

        IObserver mobile = new MobileAPP();
        IObserver web = new WebApp();

        stockMarket.RegisterObserver(mobile);
        stockMarket.RegisterObserver(web);

        stockMarket.SetStock("TCS", 4300);

        Console.ReadKey();
    }
}
