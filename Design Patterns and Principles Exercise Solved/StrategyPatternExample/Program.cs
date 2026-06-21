using System;

// Strategy interface
public interface IPaymentStrategy
{
    void pay(double amount);
}

// Concrete strategy for credit card payment
public class CreditCardPayment : IPaymentStrategy
{
    public void pay(double amount)
    {
        Console.WriteLine("Paid Rs."+amount+" using credit card");
    }
}

// Concrete strategy for PayPal payment
public class PayPalPayment : IPaymentStrategy
{
    public void pay(double amount)
    {
        Console.WriteLine("Paid Rs." + amount + " using PayPal");
    }
}

//Context class
public class PaymentContext
{
    private IPaymentStrategy paymentStrategy;

    public PaymentContext(IPaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void ExecutePayment(double amount) {
        paymentStrategy.pay(amount);
    }
}

class Program 
{
    static void Main(string[] args) {

        //credit card payment
        PaymentContext p1 = new PaymentContext(new CreditCardPayment());
        p1.ExecutePayment(5000);

        Console.WriteLine();

        //paypal payment
        PaymentContext p2 = new PaymentContext(new PayPalPayment());
        p2.ExecutePayment(2000);

        Console.ReadKey();
    }
}