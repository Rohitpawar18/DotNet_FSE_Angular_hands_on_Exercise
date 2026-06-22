using System;

public interface IImage
{ 
    void Display();
}

//Real Object
public class RealImage : IImage
{
    private string fileName;

    public RealImage(string fileName)
    {
        this.fileName = fileName;
        LoadFromServer();
    }

    private void LoadFromServer() {
        Console.WriteLine("Loading Image from remote server : "+fileName);
    }

    public void Display() {
        Console.WriteLine("Displaying image : " + fileName);
    }
}

//Proxy Class
public class ProxyImage : IImage
{
    private RealImage realImage;
    private string fileName;

    public ProxyImage(string fileName)
    {
        this.fileName = fileName;
    }

    public void Display() { 
        //Lazy Initialization
        if(realImage == null)
        {
            realImage = new RealImage(fileName);
        }

        realImage.Display();
    }
}

class Program 
{
    static void Main(string[] args) 
    {
        IImage image = new ProxyImage("Nature.jpg");

        Console.WriteLine("Image Object Created");

        Console.WriteLine("\nFirst Display Call : ");
        image.Display();

        Console.WriteLine("\nSecond Display Call : ");
        image.Display();

        Console.ReadKey();
    }
}