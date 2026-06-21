using System;

//Model
public class Student
{
    public string Name { get; set; }
    public int Id { get; set; }
    public string Grade { get; set; }
}

//View
public class StudentView
{
    public void DisplayStudentDetails(string name, int id, string grade) {
        Console.WriteLine("Student Details");
        Console.WriteLine("Name  : " + name);
        Console.WriteLine("ID    : " + id);
        Console.WriteLine("Grade : " + grade);
    }
}

// Controller
public class StudentController {
    private Student model;
    private StudentView view;

    public StudentController(Student model, StudentView view) {
        this.model = model;
        this.view = view;
    }

    public void SetStudentName(string name) { 
        model.Name = name;
    }

    public void SetStudentGrade(string grade)
    {
        model.Grade = grade;
    }

    public void UpdateView() {
        view.DisplayStudentDetails(model.Name, model.Id, model.Grade);
    }
}

class Program 
{
    static void Main(string[] args) {

        // create model
        Student student = new Student { 
            Name = "Rohit",
            Id = 101,
            Grade = "A"
        };

        //create view
        StudentView view = new StudentView();

        //create controller
        StudentController controller = new StudentController(student, view);

        controller.UpdateView();

        Console.WriteLine();

        //update student details
        controller.SetStudentName("Amit");
        controller.SetStudentGrade("B");

        Console.WriteLine("Updated Student Details: ");

        controller.UpdateView();

        Console.ReadKey();
    }
}