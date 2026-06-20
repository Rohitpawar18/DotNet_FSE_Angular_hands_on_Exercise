using System;

public interface IPaymentProcessor {
    void ProcessPayment();
}

public class PayPalGateway {
    public void SendPayment() {
        Console.WriteLine("Payment processed through PayPal.");
    }
}

public class PaymentAdapter : IPaymentProcessor { 
    private PayPalGateway gateway;

    public PaymentAdapter(PayPalGateway gateway) {
        this.gateway = gateway;
    }

    public void ProcessPayment()
    {
        gateway.SendPayment();
    }
}

class Program {
    static void Main(string[] args) {
        PayPalGateway gateway = new PayPalGateway();

        IPaymentProcessor payment = new PaymentAdapter(gateway);

        payment.ProcessPayment();

        Console.ReadKey();
    }
}