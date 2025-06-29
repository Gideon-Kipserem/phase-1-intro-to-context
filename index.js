// Your code here
// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Function to create a time in event
function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });
  return employee;
}

// Function to create a time out event
function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });
  return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
