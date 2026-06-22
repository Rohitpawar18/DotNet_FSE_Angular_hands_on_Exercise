using System;

class Task {
    public int TaskId;
    public string TaskName;
    public string Status;
    public Task next;

    public Task(int id, string name, string status)
    {
        TaskId = id;
        TaskName = name;
        Status = status;
        next = null;
    }
}

class TaskLinkedList {

    private Task head = null;

    //Add Task
    public void AddTask(int id, string name, string status)
    {
        Task newTask = new Task(id, name, status);

        if(head == null)
        {
            head = newTask;
        }
        else
        {
            Task temp = head;
            while(temp.next != null)
            {
                temp = temp.next;
            }

            temp.next = newTask;
        }
        Console.WriteLine("Task Added");
    }

    //Search Task
    public void SearchTask(int id)
    {
        Task temp = head;

        while(temp != null)
        {
            if(temp.TaskId == id)
            {
                Console.WriteLine($"\nFound: {temp.TaskName}, Status: {temp.Status}");
                return;
            }
            temp = temp.next;
        }
        Console.WriteLine("Task Not Found.");
    }

    //Display Tasks
    public void DisplayTasks()
    {
        Task temp = head;

        Console.WriteLine("\nTask List:");

        while(temp != null)
        {
            Console.WriteLine($"ID: {temp.TaskId}, Name: {temp.TaskName}, Status: {temp.Status}");

            temp = temp.next;
        }
    }

    //Delete Task
    public void DeleteTask(int id)
    {
        if(head == null)
        {
            Console.WriteLine("List Empty.");
            return;
        }

        if(head.TaskId == id)
        {
            head = head.next;
            Console.WriteLine("\nTask Deleted");
            return;
        }

        Task temp = head;

        while(temp.next != null && temp.next.TaskId != id)
        {
            temp = temp.next;
        }

        if(temp.next == null)
        {
            Console.WriteLine("Task Not Found.");
        }
        else
        {
            temp.next = temp.next.next; 
            Console.WriteLine("Task Deleted.");
        }
    }
}

class Program 
{ 
    static void Main(string[] args)
    {
        TaskLinkedList tasks = new TaskLinkedList();

        tasks.AddTask(1, "Design UI", "Pending");
        tasks.AddTask(2, "Create Login", "Completed");
        tasks.AddTask(3, "Testing", "Pending");

        tasks.DisplayTasks();

        tasks.SearchTask(2);

        tasks.DeleteTask(2);

        tasks.DisplayTasks();

        Console.ReadKey();
    }
}