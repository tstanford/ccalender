const fs = require('fs');

Date.prototype.addDay = function(numberOfDays) {
    return this.setDate(date.getDate()+numberOfDays);
}

var pattern0="AABBAAA";
var pattern1="BBAABBB";

function getParent(date, weekCounter) {
    let weekPattern = weekCounter %2;
    let day = date.getDay();

    //left shift days of week. making sunday == 6 rather than 0
    if (day == 0) day=7;
    day--;

    return (weekPattern==0) ? pattern0[day] : pattern1[day];
}

var date = new Date("2023-01-01");
var weekCounter = 0;

var fileContents = "";

fileContents+= "BEGIN:VCALENDAR\n";
fileContents+= "PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\n";
fileContents+= "VERSION:2.0\n";

for(var i=0; i<365; i++) {

    let dateString = (date.toISOString().split('T')[0]).toString();
    let eventName = getParent(date, weekCounter)=="A" ? "Tim" : "Vicki";

    fileContents+= "BEGIN:VEVENT\n";
    fileContents+= "SUMMARY: "+eventName+"\n";
    fileContents+= "DTSTART;VALUE=DATE:"+dateString.replace(/-/g, '')+"\n";
    fileContents+= "UID: "+(dateString+"_CCalender_").padEnd(36,"0")+"\n";
    fileContents+= "END:VEVENT"+"\n"; 

    date.addDay(1);
    if(date.getDay() == 1){
        weekCounter++;
    }
}

fileContents+= "END:VCALENDAR\n" ;

fs.writeFileSync('calender.ics', fileContents);


