using System;
using System.Collections.Generic;
using System.Text;

namespace BuilderPatternExample
{
    public class Computer
    {
        private string CPU;
        private string RAM;
        private string Storage;

        //private constructor
        private Computer(ComputerBuilder builder)
        {
            CPU = builder.CPU;
            RAM = builder.RAM;
            Storage = builder.Storage;
        }

        //Builder class
        public class ComputerBuilder
        {
            public string CPU;
            public string RAM;
            public string Storage;

            //Required Fields
            public ComputerBuilder(string cpu)
            {
                CPU = cpu;
            }

            public ComputerBuilder SetRAM (string ram)
            {
                RAM = ram;
                return this;
            }

            public ComputerBuilder SetStorage (string storage)
            {
                Storage = storage;
                return this;
            }

            public Computer Build()
            {
                return new Computer(this);
            }
        }

        public void showDetails() {
            Console.WriteLine("Computer Configuration :");
            Console.WriteLine("CPU: "+ CPU);
            Console.WriteLine("RAM: " + RAM);
            Console.WriteLine("Storage: " + Storage);
        }
    }
}
