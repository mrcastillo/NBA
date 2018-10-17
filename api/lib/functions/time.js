const monthsOfTheYear = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfTheMonth = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

module.exports = {
	convertSingleDigit : function(number){
		if(number < 10){
			number = `0${number}`;
		} 
		else{
			number = number;
		}
			return number;
	},

	//year month day 20180105 = 2018 january 05
	yyyymmdd : function(){
		var date = new Date();
		var year, month, day;

		//Year
		year = date.getFullYear();

		//Month
		month = date.getMonth();
		month += 1;
		month = this.convertSingleDigit(month);

		//Day
		day = date.getDate();
		day = this.convertSingleDigit(day);
		/*
		if(date.getMonth() < 10){
			month = `0${month}`;
		} 
		if(date.getDate() <= 9){
			day = `0${day}`;
		}
		*/
		return `${year}${month}${day}`
	},
	//Returns the months length
	monthLength : function(month, year){
		return new Date(year, month, 0).getDate();
	},
	currentYear : function(){
		var Year = new Date().getFullYear();
		return Year;
	},
	currentMonth : function(){
		var date = new Date();

		var Month;
			Month = date.getMonth() + 1;
			Month = this.convertSingleDigit(Month);  	

		return Month;
	},
	//Return the name of the month
	currentMonthName : function(){
		const currentMonth = monthsOfTheYear[this.currentMonth() - 1];
		return currentMonth;
	},
	currentDay : function(){
		var date = new Date();

		var Day = new Object;
		Day.numeric = this.convertSingleDigit(date.getDate());

		return Day;
	}
};