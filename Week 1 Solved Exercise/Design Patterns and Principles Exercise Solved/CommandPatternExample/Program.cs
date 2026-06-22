using System;

//Command Interface
public interface ICommand
{
    void Execute();
}

//Receiver class
public class Light 
{
    public void TurnOn() {
        Console.WriteLine("Light is On");
    }

    public void TurnOff()
    {
        Console.WriteLine("Light is Off");
    }
}

//concrete command ON
public class LightOnCommand : ICommand
{
    private Light light;

    public LightOnCommand(Light light) { 
        this.light = light;
    }

    public void Execute() {
        light.TurnOn();
    }
}

//concrete command OFF
public class LightOffCommand : ICommand
{
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    public void Execute() {
        light.TurnOff();
    }
}

//Invoker class
public class RemoteControl
{
    private ICommand command;

    public void SetCommand(ICommand command)
    {
        this.command = command;
    }

    public void PressButton()
    {
        command.Execute();
    }
}

class Program 
{
    static void Main(string[] args) {

        Light light = new Light();

        ICommand lightOn = new LightOnCommand(light);
        ICommand lightOff = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        //Turn on light
        remote.SetCommand(lightOn);
        remote.PressButton();

        // Turn off light
        remote.SetCommand(lightOff);
        remote.PressButton();

        Console.ReadKey();
    }
}