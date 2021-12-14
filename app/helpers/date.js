function isDatePassed(datePassed, dateToday) {
  if (datePassed.setHours(0, 0, 0, 0) <= dateToday.setHours(0, 0, 0, 0)) {
    return true
  }

  return false
}

function oneDayAheadCurrentDate(date) {
  const today = date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}

const dateHelper = {
  isDatePassed,
  oneDayAheadCurrentDate
}

module.exports = dateHelper
