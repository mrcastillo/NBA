"use strict";

var monthsOfTheYear = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysOfTheMonth = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
module.exports = {
  convertSingleDigit: function convertSingleDigit(number) {
    if (number < 10) {
      number = "0".concat(number);
    } else {
      number = number;
    }

    return number;
  },
  //year month day 20180105 = 2018 january 05
  yyyymmdd: function yyyymmdd() {
    var date = new Date();
    var year, month, day;
    year = date.getFullYear();
    month = date.getMonth();
    month += 1;
    day = date.getDate();

    if (date.getMonth() < 9) {
      month = "0".concat(month);
    }

    if (date.getDate() <= 9) {
      day = "0".concat(day);
    }

    return "".concat(year).concat(month).concat(day);
  },
  //Returns the months length
  monthLength: function monthLength(month, year) {
    return new Date(year, month, 0).getDate();
  },
  currentYear: function currentYear() {
    var Year = new Date().getFullYear();
    return Year;
  },
  currentMonth: function currentMonth() {
    var date = new Date();
    var Month;
    Month = date.getMonth() + 1;
    Month = this.convertSingleDigit(Month);
    return Month;
  },
  //Return the name of the month
  currentMonthName: function currentMonthName() {
    var currentMonth = monthsOfTheYear[this.currentMonth() - 1];
    return currentMonth;
  },
  currentDay: function currentDay() {
    var date = new Date();
    var Day = new Object();
    Day.numeric = this.convertSingleDigit(date.getDate());
    return Day;
  }
};