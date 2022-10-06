const uuid = require('uuid');

currentDate = new Date();

Date.prototype.getWeek = function () {
    // Create a copy of this date object
    var target = new Date(this.valueOf());
  
    // ISO week date weeks start on Monday, so correct the day number
    var dayNr = (this.getDay() + 6) % 7;
  
    // ISO 8601 states that week 1 is the week with the first Thursday of that year
    // Set the target date to the Thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);
  
    // Store the millisecond value of the target date
    var firstThursday = target.valueOf();
  
    // Set the target to the first Thursday of the year
    // First, set the target to January 1st
    target.setMonth(0, 1);
  
    // Not a Thursday? Correct the date to the next Thursday
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
  
    // The week number is the number of weeks between the first Thursday of the year
    // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

calDate = new Date();
year = calDate.getFullYear();
prevMonth = -1;
firstRun = true;
console.log("BEGIN:VCALENDAR");
console.log("PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN");
console.log("VERSION:2.0");
while (calDate.getFullYear() == year){

    let weekNumber = calDate.getWeek();
    let eventName = "";
    let dayOfWeek = calDate.getDay();

    const parentA = "Vicki";
    const parentB = "Tim";

    if (dayOfWeek == 0) {
        eventName = (weekNumber%2==0?parentA:parentB);
    }
    else if (dayOfWeek == 1) {
        eventName = (weekNumber%2==0?parentA:parentB);
    }
    else if (dayOfWeek == 2) {
        eventName = (weekNumber%2==0?parentA:parentB);
    }
    else if (dayOfWeek == 3) {
        eventName = (weekNumber%2==0?parentB:parentA);
    }
    else if (dayOfWeek == 4) {
        eventName = (weekNumber%2==0?parentB:parentA);
    }
    else if (dayOfWeek == 5) {
        eventName = (weekNumber%2==0?parentA:parentB);
    }
    else if (dayOfWeek == 6) {
        eventName = (weekNumber%2==0?parentA:parentB);
    }

    eventName = eventName;

    let dateString = (calDate.toISOString().split('T')[0]).toString();

    console.log("BEGIN:VEVENT");
    console.log("SUMMARY: "+eventName);
    console.log("DTSTART;VALUE=DATE:"+dateString.replace(/-/g, ''));
    console.log("UID: "+uuid.v4());
    console.log("END:VEVENT");
    
    firstRun = false;
    prevMonth = calDate.getMonth();
    calDate.setDate(calDate.getDate()+1);
}
console.log("END:VCALENDAR");