const CustodyCalendar = require('./CustodyCalendar');

var calendar = new CustodyCalendar();
calendar.generate(new Date("2023-01-01"), 365);