using System;

public interface INotifier
{
    void Send();
}

public class EmailNotifier : INotifier
{
    public void Send() {
        Console.WriteLine("Sending Email Notification");
    }
}

//Abstract Decorator
public abstract class NotifierDecorator : INotifier
{
    protected INotifier notifier;

    public NotifierDecorator(INotifier notifier)
    {
        this.notifier = notifier;
    }

    public virtual void Send() {
        notifier.Send();
    }
}

// Concrete Decorator SMS
public class SMSNotifierDecorator : NotifierDecorator
{
    public SMSNotifierDecorator(INotifier notifier) : base(notifier) { }

    public override void Send() {
        base.Send();
        Console.WriteLine("Sending SMS Notification");
    }
}

// Concrete Decorator Slack
public class SlackNotifierDecorator : NotifierDecorator
{
    public SlackNotifierDecorator(INotifier notifier) : base(notifier) { }

    public override void Send()
    {
        base.Send();
        Console.WriteLine("Sending Slack Notification");
    }
}

// Main class
class Program 
{
    static void Main(string[] args) {
        
        INotifier notifier = new SlackNotifierDecorator(
                             new SMSNotifierDecorator(
                                 new EmailNotifier()));

        notifier.Send();

        Console.ReadKey();
    }
    
}