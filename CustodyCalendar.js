const fs = require('fs');

Date.prototype.addDay = function(numberOfDays) {
    return this.setDate(this.getDate()+numberOfDays);
}

class CustodyCalendar {

    constructor() {
        this.pattern0="AABBAAA";
        this.pattern1="BBAABBB";
    }

    dateToYMD(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + (m<=9 ? '0' + m : m) + (d <= 9 ? '0' + d : d);
      }
    
    getParent(date, weekCounter) {
        let weekPattern = weekCounter %2;
        let day = date.getDay();

        //left shift days of week. making sunday == 6 rather than 0
        if (day == 0) day=7;
        day--;

        return (weekPattern==0) ? this.pattern0[day] : this.pattern1[day];
    }

    generate(startDate, numberOfDays) {    
        
        let date = new Date(startDate.getTime());
        let weekCounter = 0;
        let fileContents = "";
    
        fileContents+= "BEGIN:VCALENDAR\n";
        fileContents+= "PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\n";
        fileContents+= "VERSION:2.0\n";
    
        for(var i=0; i<numberOfDays; i++) {
    
            let dateString = dateToYMD(date);
            let eventName = this.getParent(date, weekCounter)=="A" ? "Tim" : "Vicki";

            if(eventName == "Tim" && date.getDay() == 4){
                console.log(date.toString());
            }
    
            fileContents+= "BEGIN:VEVENT\n";
            fileContents+= "SUMMARY: "+eventName+"\n";
            fileContents+= "DTSTART:"+dateString+"\n";
            fileContents+= "UID: "+(dateString+"_CCalender_").padEnd(36,"0")+"\n";
            fileContents+= "END:VEVENT"+"\n"; 
    
            date.addDay(1);
            if(date.getDay() == 1){
                weekCounter++;
            }
        }
    
        fileContents+= "END:VCALENDAR\n" ;
    
        fs.writeFileSync('calendar.ics', fileContents);
        console.log("Written ical calendar to calendar.ics");
    }
}

module.exports = CustodyCalendar;