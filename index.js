function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  })

  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })

  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  let timeInEvent = employeeRecord.timeInEvents.find(e => e.date === date)
  let timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === date)

  return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
  let hours = hoursWorkedOnDate(employeeRecord, date)
  return hours * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
  let dates = employeeRecord.timeInEvents.map(e => e.date)

  let totalWages = dates.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date)
  }, 0)

  return totalWages
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord)
  }, 0)
}