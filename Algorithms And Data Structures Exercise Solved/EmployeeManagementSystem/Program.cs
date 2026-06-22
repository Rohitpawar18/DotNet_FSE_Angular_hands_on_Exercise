using System;

class Employee
{
    public int EmployeeId;
    public string Name;
    public string Position;
    public double Salary;

    public Employee(int id, string name, string postion, double salary)
    {
        EmployeeId = id;
        Name = name;
        Position = postion;
        Salary = salary;
    }
}

class Program
{
    static Employee[] employees = new Employee[10];
    static int count = 0;

    //Add Employee
    static void AddEmployee(Employee emp)
    {
        if (count < employees.Length)
        {
            employees[count] = emp;
            count++;
            Console.WriteLine("Employee Added");
        }
        else {
            Console.WriteLine("Array Full");
        }
    }

    //Search Employee
    static void SearchEmployee(int id)
    {
        for(int i = 0; i < employees.Length; i++)
        {
            if (employees[i] != null && employees[i].EmployeeId == id)
            {
                Console.WriteLine($"\nFound : {employees[i].Name}, {employees[i].Position}, Salary: {employees[i].Salary}");
                return;
            }
        }
        Console.WriteLine("\nEmployee Not Found");
    }

    //Traverse Employees
    static void DisplayEmployees()
    {
        Console.WriteLine("\nEmployee Records: ");
        for(int i = 0; i < count; i++)
        {
            Console.WriteLine($"ID: {employees[i].EmployeeId}, Name: {employees[i].Name}, Position: {employees[i].Position}, Salary: {employees[i].Salary}");
        }
    }

    //Delete Employee
    static void DeleteEmployee(int id)
    {
        int index = -1;

        for(int i = 0; i < count; i++)
        {
            if (employees[i].EmployeeId == id)
            {
                index = i;
                break;
            }
        }

        if(index == -1)
        {
            Console.WriteLine("Employee Not Found.");
            return;
        }

        for (int i = index; i < count - 1; i++)
        {
            employees[i] = employees[i + 1];
        }

        employees[count - 1] = null;
        count--;

        Console.WriteLine("\nEmployee Deleted.");
    }

    static void Main(string[] args)
    {
        AddEmployee(new Employee(101, "Rohit", "Manager", 50000));
        AddEmployee(new Employee(102, "Sham", "Developer", 20000));
        AddEmployee(new Employee(103, "Suresh", "Tester", 30000));

        DisplayEmployees();

        SearchEmployee(102);

        DeleteEmployee(102);

        DisplayEmployees();

        Console.ReadKey();
    }

}