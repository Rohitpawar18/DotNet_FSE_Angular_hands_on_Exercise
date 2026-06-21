using System;

// Repository Interface
public interface ICustomerRepository
{
    string FindCustomerById(int id);
}

//Concrete Repository
public class CustomerRepositoryImpl : ICustomerRepository
{ 
    public string FindCustomerById(int id)
    {
        return "Customer with ID:" + id + ", Name : Rohit";
    }
}

// Service class
public class CustomerService
{ 
    private ICustomerRepository repository;

    //Constructor injection
    public CustomerService(ICustomerRepository repository)
    {
        this.repository = repository;
    }

    public void GetCustomer(int id)
    {
        string customer = repository.FindCustomerById(id);
        Console.WriteLine(customer);
    }
}

class Program 
{ 
    static void Main(string[] args)
    {
        //create Repository
        ICustomerRepository repository = new CustomerRepositoryImpl();

        // Inject repository into service
        CustomerService service = new CustomerService(repository);

        //find customer
        service.GetCustomer(101);

        Console.ReadKey();
    }
}