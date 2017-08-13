
window.addEventListener("load", function(){
  console.log("Page loaded");
  // Instantiate Singleton
  var myAssignment = AssignPrototype.getInstance();
});

class AssignPrototype {
  constructor() {
    console.log("Singleton created.");

    // Creating ES5 Person prototype.
    var ES5Person = (function(){
      // Constructor
      function ES5Person(_name){
        console.log("ES5Person created");
        this.name = _name;
      }
      // polymorphism. Same function names are overridden in Employee class

      // Method to display different title string if the position title equals boss.
      ES5Person.prototype.getTitleString = function() {
        return "Get back to work!";
      };
      // Method to display different hour string if the position title equals boss.
      ES5Person.prototype.getHoursString = function() {
        return "Whenever I want!";
      };
      // Method to display different parking string if the position title equals boss.
      ES5Person.prototype.getParkingString = function() {
        return "I park my Heli on the roof!";
      };

      // So we have access to this object from outside of this namespace.
      return ES5Person
    })();

    // Creating ES5 Employee prototype using prototypal inheritance from person prototype.
    var EmployeeES5 = (function(){

      EmployeeES5.prototype = Object.create(ES5Person.prototype);

      // Constructor
      function EmployeeES5(_name,_position,_parkingSpotNumber){
        console.log("EmployeeES5 created");
        ES5Person.call(this,_name)
        this.parkingSpotNumber = _parkingSpotNumber;
        this.position = _position;
      }
      // Method to display different title string if the position title equals anything except boss.
      EmployeeES5.prototype.getTitleString = function() {
        return this.position.title;
      };
      // Method to display different hour string if the position title equals anything except boss.
      EmployeeES5.prototype.getHoursString = function() {
        return this.position.hours;
      };
      // Method to display different parking string if the position title equals anything except boss.
      EmployeeES5.prototype.getParkingString = function() {
        return this.parkingSpotNumber;
      };

      // So we have access to this object from outside of this namespace.
      return EmployeeES5;
    })();

    // Creating ES5 Position prototype.
    var PositionES5 = (function(){
      // Constructor
      function PositionES5(_title, _hours){
        console.log("PositionES5 created");
        this.title = _title;
        this.hours = _hours;
      }

      // So we have access to this object from outside of this namespace.
      return PositionES5;
    })();

    // Creating ES5 Employer prototype.
    var EmployerES5 = (function(){
      // Constructor
      function EmployerES5(_name){
        console.log("EmployerES5 created");
        this.name = _name;
      }

      // So we have access to this object from outside of this namespace.
      return EmployerES5;
    })();

    // Created an Init function that sets the Employer to IBM, populates
    // the input field with the value and sets global variables to window.
    (function init() {
      // Instantiating an instance of my Employer Object and setting it to variable on window.
      window.currentEmployer = new EmployerES5();

      // Setting intial value to IBM.
      currentEmployer.name = "IBM";

      // Setting global variables to window.
      window.employerInput = document.getElementById('employerField');
      window.eName = document.getElementById('employeeName');
      window.eHours = document.getElementById('employeeHours');
      window.ePosition = document.getElementById('employeePosition');
      window.eParkingSpotNumberInput = document.getElementById("parkingSpotNumber");

      // Creating a global array to hold my Employees and setting it to window.
      window.employees = new Array;

      // Calling populateEmployerField function and passing it the intial value.
      populateEmployerField(currentEmployer.name);

      // Adding event listener to Add Employee button to call addEmployee function.
      document.getElementById("addBtn").addEventListener("click", addEmployee);
      // Adding event listener to Calculate Hours button to call calculateTotals function.
      document.getElementById("calcBtn").addEventListener("click", calculateTotals);
    })();

    // This function will fill the employer field in with the current value.
    function populateEmployerField(value) {
      //var employerInput = document.getElementById('employerField');
      console.log("Setting populateEmployerField to: ", value);
      employerInput.value = value;
    }

    // onClick event for Add Employee Btn.
    function addEmployee() {
      if (eName.value != "" && eHours.value != "" &&
        ePosition.value != "" && eParkingSpotNumberInput.value != "")
      {
        console.log("Values not empty. Allow creation of new Employee.");

        // set the current employer objects name to the value given
        currentEmployer.name = employerInput.value;

        // Creating a variable that holds the value of the employees position converted to lowercase.
        var titleGiven = ePosition.value.toLowerCase();
        var personOrEmployee = null;

        // If statement to check if the position title entered is equal to boss.
        if(titleGiven === "boss") {
          // If it equals boss a person is created with passed values and saved to my personOrEmployee variable.
          personOrEmployee = new ES5Person(eName.value, ePosition.value, eHours.value);
        }
        // Else for position check.
        else {
          // If the position does not equal boss a new position object is created.
          var position = new PositionES5(ePosition.value, eHours.value);
          console.log("Created a new Position class instance: ", position);

          // A new employee is created with passed values and saved to my personOrEmployee variable.
          personOrEmployee = new EmployeeES5(eName.value, position, eParkingSpotNumberInput.value);
          console.log("Created a new Employee class instance: ", personOrEmployee);
        }

        console.log("Person or Employee object: ", personOrEmployee);

        // Pushing new Employee to employees array.
        employees.push(personOrEmployee);

        console.log("Total employees: ", employees.length);
        console.log("New array of employees: ", employees);

        displayInfo();
        clearInputs();

        eName.focus();
      }
    }

    // Creating function that takes in an input and resets it to null or default
    function clearInputs() {
      employerInput.value = currentEmployer.name;
      eName.value = '';
      eHours.value = '';
      ePosition.value = '';
      eParkingSpotNumberInput.value = '';
    }

    // Creating function to print employees to the table when Calculate Totals Btn is pressed.
    function calculateTotals() {
      var hourInts;
      var totalContainer = document.getElementById("totalContainer");
      // Creating a new div.
      var totalText = "<div>";

      var hourTotal = 0;
      var currentPersonOrEmployee;

      // For loop to loop through employees array.
      for( var i = 0; i < employees.length; i++ ) {
        currentPersonOrEmployee = employees[i];

        // If the employee is an instance of the EmployeeES5 prototype then the code will run.
        if (currentPersonOrEmployee instanceof EmployeeES5) {

          // Calling my Utils class convertToIntArray function and passing it a
          // employee. Then setting the value to the hourInts variable
          hourInts = Utils.convertToIntArray(currentPersonOrEmployee);
        } else {
          // Else I am setting the hourInts variable to an empty array.
          hourInts = [];
        }

        // Calling my Utils class getTotalHours function and passing it my hours as
        // ints. Then adding the value to my hourTotal variable.
        hourTotal += Utils.getTotalHours(hourInts);
      }

      // Adding the new div to my totalContainer and populating it with a string and the total employee hours.
      totalContainer.innerHTML = totalText + "Total Employee Hours (This Week): " + hourTotal;
    }

    // Creating displayInfo function to print all employee details to my table.
    function displayInfo() {
      var hourInts;
      var tableBody = document.getElementById("dataBody");

      // Reseting and emptying table to get rid of any existing values.
      tableBody.innerHTML = "";

      var currentPersonOrEmployee;

      // Looping through employees array and assigning each employee to the currentPersonOrEmployee variable
      for( var i = 0; i < employees.length; i++ ) {
        currentPersonOrEmployee = employees[i];

        // If the employee is an instance of the EmployeeES5 prototype then the code will run.
        if (currentPersonOrEmployee instanceof EmployeeES5) {

          // Calling my Utils class convertToIntArray function and passing it a
          // employee. Then setting the value to the hourInts variable
          hourInts = Utils.convertToIntArray(currentPersonOrEmployee);
        } else {
          // Else I am setting the hourInts variable to an empty array.
          hourInts = [];
        }

        // Creating a table row to hold the new data/cells
        var row = document.createElement("tr");

        // Creating a table data/cell that will display the employees name.
        var cell = document.createElement("td");
        var cellText = document.createTextNode(currentPersonOrEmployee.name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Creating a table data/cell that will display the hours string for a person("Whenever I want!") or a
        // employer which will display the hours for the week.
        var cell = document.createElement("td");
        var cellText = document.createTextNode(currentPersonOrEmployee.getHoursString());
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Creating a table data/cell and if an employee is being created then this will display the average hours for the week.
        var cell = document.createElement("td");
        var cellText = document.createTextNode(Utils.getAverage(hourInts));
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Creating a table data/cell that will display the title string for a person("Get back to work!";)
        // or a employee which will show position title
        var cell = document.createElement("td");
        var cellText = document.createTextNode(currentPersonOrEmployee.getTitleString());
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Creating a table data/cell that will display parking spot number.
        var cell = document.createElement("td");
        var cellText = document.createTextNode(currentPersonOrEmployee.getParkingString());
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Creating a table data/cell that will display employer name.
        var cell = document.createElement("td");
        var cellText = document.createTextNode(currentEmployer.name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Appending the new row to my table.
        tableBody.appendChild(row);
      }
    };

  }

  static getInstance(){
    if (!AssignPrototype._instance) {
      AssignPrototype._instance = new AssignPrototype();
      return AssignPrototype._instance;
    }
    else {
      throw "Trying to create a second Singleton!";
    }
  }
}
