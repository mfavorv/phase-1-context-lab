const createEmployeeRecord = (employeeDetails) => {
  return {
    firstName: employeeDetails[0],
    familyName: employeeDetails[1],
    title: employeeDetails[2],
    payPerHour: employeeDetails[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

const createEmployeeRecords = (employeeData) => {
  return employeeData.map(createEmployeeRecord);
}

const createTimeInEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });

  return this;
}

const createTimeOutEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });

  return this;
}

const hoursWorkedOnDate = function(date) {
  const timeInEvent = this.timeInEvents.find(event => event.date === date);
  const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

  return hoursWorked;
}

const wagesEarnedOnDate = function(date) {
  const hours = hoursWorkedOnDate.call(this, date);
  const wages = hours * this.payPerHour;
  return wages;
}

const allWagesFor = function() {
  const dates = this.timeInEvents.map(event => event.date);
  const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
  return totalWages;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

const calculatePayroll = function(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor.call(employeeRecord), 0);
}
