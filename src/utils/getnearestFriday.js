// utils/getNearestFriday.js

// Function to get the nearest Friday before a given date
export function getPreviousFriday(date) {
  const targetDate = new Date(date);
  const dayOfWeek = targetDate.getDay();

  // Calculate how many days to subtract to get to the previous Friday
  const daysToFriday = (dayOfWeek - 5 + 7) % 7;

  // Adjust the targetDate to the previous Friday
  targetDate.setDate(targetDate.getDate() - daysToFriday);

  // Subtract 1 more day to get the correct previous Friday
  targetDate.setDate(targetDate.getDate() - 1);

  return targetDate;
}

// Function to get the nearest Friday before the 15th of the current month
export function getPreviousFridayFrom15(date) {
  const targetDate = new Date(date);
  targetDate.setDate(15); // Set to 15th of the current month
  if (targetDate.getDay() === 0) {
    return getPreviousFriday(targetDate);
  } else if (targetDate.getDay() === 6) {
    return getPreviousFriday(targetDate);
  } else {
    targetDate.setDate(targetDate.getDate() - 1);
    return targetDate;
  }
}

function setCorrectDate(targetDate) {
  // First, set the month to the previous month and set the day to 30
  targetDate.setMonth(targetDate.getMonth() - 1);

  // Save the current date and set it to the 31st to check if it overflows
  const prevMonthDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    31
  );

  if (prevMonthDate.getDate() === 31) {
    targetDate.setDate(31);
  } else {
    targetDate.setDate(30);
  }

  return targetDate;
}

// Function to get the nearest Friday before the end of the previous month (30/31)
export function getPreviousFridayFromPreviousMonthEnd(date) {
  let targetDate = new Date(date);

  targetDate = setCorrectDate(targetDate);

  //const newEndDate = new Date(cutoffDate.getFullYear(), cutoffDate.getMonth() + 1, 0);
  console.log(targetDate);
  if (targetDate.getDay() === 0) {
    return getPreviousFriday(targetDate);
  } else if (targetDate.getDay() === 6) {
    return getPreviousFriday(targetDate);
  } else {
    targetDate.setDate(targetDate.getDate() - 1);
    return targetDate;
  }
}

export function getCutoffEndofMonth(date) {
  let targetDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  if (targetDate.getDay() === 0) {
    return getPreviousFriday(targetDate);
  } else if (targetDate.getDay() === 6) {
    return getPreviousFriday(targetDate);
  } else {
    targetDate.setDate(targetDate.getDate() - 1);
    return targetDate;
  }
}

// Function to get the date range for a given cutoff date
export function getDateRange(cutoffDate) {
  const cutoff = new Date(cutoffDate);

  // If cutoff is after the 15th, we select from 15th to end of current month
  const firsthalf = getPreviousFridayFrom15(cutoff).getDate();
  console.log({ "first half": firsthalf });
  if (cutoff.getDate() >= firsthalf) {
    const fridayBefore15 = getPreviousFridayFrom15(cutoff);
    const fridayBeforeEndOfMonth = getCutoffEndofMonth(cutoff)
    fridayBeforeEndOfMonth.setDate(fridayBeforeEndOfMonth.getDate() - 1);
    return { start: fridayBefore15, end: fridayBeforeEndOfMonth };
  } else {
    // If cutoff is before the 15th, select from the previous month's end to the 15th
    const fridayBefore15 = getPreviousFridayFrom15(cutoff);
    const fridayBeforeEndOfPreviousMonth =
      getPreviousFridayFromPreviousMonthEnd(cutoff);
    fridayBefore15.setDate(fridayBefore15.getDate() - 1);
    return { start: fridayBeforeEndOfPreviousMonth, end: fridayBefore15 };
  }
}
