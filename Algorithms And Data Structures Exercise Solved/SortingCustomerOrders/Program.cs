using System;

class Order
{
    public int OrderId;
    public string CustomerName;
    public double TotalPrice;

    public Order(int id, string name, double price)
    {
        OrderId = id;
        CustomerName = name;
        TotalPrice = price;
    }
}

class Program
{
    //Display Orders
    static void DisplayOrders(Order[] orders)
    {
        foreach(Order order in orders)
        {
            Console.WriteLine($"ID: {order.OrderId}, Name: {order.CustomerName}, Price: {order.TotalPrice}");
        }
    }

    //Bubble Sort
    static void BubbleSort(Order[] orders)
    {
        int n = orders.Length;
        for(int i = 0; i < n - 1; i++)
        {
            for(int j = 0; j < n - i - 1; j++)
            {
                if (orders[j].TotalPrice > orders[j + 1].TotalPrice)
                {
                    Order temp = orders[j];
                    orders[j] = orders[j + 1];
                    orders[j + 1] = temp;
                }
            }
        }
    }

    //Quick Sort
    static void QuickSort(Order[] orders, int low, int high)
    {
        if(low < high)
        {
            int pivotIndex = Partition(orders, low, high);

            QuickSort(orders, low, pivotIndex - 1);
            QuickSort(orders, pivotIndex + 1, high);
        }
    }

    static int Partition(Order[] orders, int low, int high)
    {
        double pivot = orders[high].TotalPrice;
        int i = low - 1;

        for(int j = low; j < high; j++)
        {
            if (orders[j].TotalPrice < pivot)
            {
                i++;

                Order temp = orders[i];
                orders[i] = orders[j];
                orders[j] = temp;
            }
        }

        Order temp2 = orders[i + 1];
        orders[i + 1] = orders[high];
        orders[high] = temp2;

        return i + 1;
    }


    static void Main(string[] args)
    {
        Order[] orders = { 
            new Order(101,"Rohit", 1500),
            new Order(102,"Amit",5000),
            new Order(103,"Neha",3000),
            new Order(104,"Priya",7000)
        };

        Console.WriteLine("Original Orders:");
        DisplayOrders(orders);

        BubbleSort(orders);

        Console.WriteLine("\nAfter Bubble Sort:");
        DisplayOrders(orders);


        Order[] orders2 = {
            new Order(101,"Rohan", 5000),
            new Order(102,"Amol",500),
            new Order(103,"Nitin",7000),
            new Order(104,"Prem",3000)
        };

        Console.WriteLine("Original Orders:");
        DisplayOrders(orders2);

        QuickSort(orders2, 0, orders2.Length - 1);

        Console.WriteLine("\nAfter Quick Sort:");
        DisplayOrders(orders2);

        Console.ReadKey();
    }
}