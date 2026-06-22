using System;

namespace BuilderPatternExample
{
    class Program
    { 
        static void Main(string[] args)
        {
            Computer gamingPC = new Computer.ComputerBuilder("Intel i7")
                                            .SetRAM("16 GB")
                                            .SetStorage("1TB SSD")
                                            .Build();
            gamingPC.showDetails();

            Console.WriteLine();

            Computer officePC = new Computer.ComputerBuilder("Intel i5")
                                            .SetRAM("8 GB")
                                            .SetStorage("512GB SSD")
                                            .Build();
            officePC.showDetails();

            Console.ReadKey();
        }
    }
}