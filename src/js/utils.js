class Utils {
  constructor() {
    console.log('Utils created');
  }

  // Method to calculate the total average of an array of numbers.
  static getAverage(arr) {
    var total = 0;

    /* If the array is empty, which means the position title entered was boss, then
    this string will be returned instead of the average hours. */
    if(!arr.length) return "I Make my own hours!";

    // Looping through each number in the array.
    arr.forEach(function(e){
      total += e;
    });

    // Dividing the total by the length of the passed array and rounding it.
    return Math.ceil(total / arr.length);
  }

  // Method that takes in an array of numbers to calculate all employee hours.
  static getTotalHours(arr) {
    var total = 0;

    /* If the array is empty, which means the position title entered was boss, then
    0 is returned instead of the total hours. */
    if(!arr.length) return 0;

    // Looping through each number in the array.
    arr.forEach(function(e){
      total += e;
    });

    return total;
  }

  /* Method that takes in a created person or employee and converts the hours array
  to a numbers array. */
  static convertToIntArray(personOrEmployee) {
    // Checks weather personOrEmployee is an instance of my Employee class and not a Person.
    if(personOrEmployee instanceof EmployeeES5) {
      // Getting the hours from the employee and saving it to my hoursString variable.
      var hoursString = personOrEmployee.position.hours;
      // Spliting the string up by spaces.
      var temp = hoursString.split(' ');

      // Looping through each of the parts of the split string and replacing it with a number.
      temp.forEach((el, index) => {
        el = Number(el);
        temp[index] = el;
      });
      return temp;
    }
    else {
      return [];
    }
  }
}
