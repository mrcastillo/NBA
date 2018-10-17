const connection = require(`./database`);
const web = require('./web');
const time = require('./time');
const fs = require('fs');

var nba = new Object();

nba.teams = web.getRequest("http://data.nba.net/prod/v1/2017/teams.json");
nba.nbatoday = web.getRequest("http://data.nba.net/10s/prod/v1/today.json");

module.exports = {
	start_live_scores : function(callback){
		global.scoreScrapper = setInterval( async function(){
		  var live_scoreboard = await web.getRequest(`http://data.nba.net/prod/v1/20180201/scoreboard.json`);
		  nba.live_scores = live_scoreboard.games;
		  callback(nba.live_scores);
		}, 5000);
	},
	stop_live_scores : function(){
		clearInterval(global.scoreScrapper);
		console.log("stopped")
	},
	get_file_nba_schedule : async function(){
		var nba_schedule = await web.getRequest('http://data.nba.net/prod/v1/2017/schedule.json');
  	nba_schedule = nba_schedule.league.standard;

	  var parsed_nba_schedule = [];

	  for(var i = 0; i < nba_schedule.length; i++){
	    //console.log(schedule[0]);
	    var new_schedule_for_import = {
	      gameId:           nba_schedule[i].gameId,
	      gameUrlCode:      nba_schedule[i].gameUrlCode,
	      seasonStageId:    nba_schedule[i].seasonStageId,
	      statusNum:        nba_schedule[i].statusNum,
	      startTimeUTC:     nba_schedule[i].startTimeUTC,
	      startDateEastern: nba_schedule[i].startDateEastern,
	      startTimeEastern: nba_schedule[i].startTimeEastern,
	      isBuzzerBeater:   nba_schedule[i].isBuzzerBeater,
	      nugget:           nba_schedule[i].nugget.text,
	      hTeam_teamId:     nba_schedule[i].hTeam.teamId,
	      hTeam_score:      nba_schedule[i].hTeam.score,
	      hTeam_wins:       nba_schedule[i].hTeam.win,
	      hTeam_loss:      nba_schedule[i].hTeam.loss,
	      vTeam_teamId:     nba_schedule[i].vTeam.teamId,
	      vTeam_score:      nba_schedule[i].vTeam.score,
	      vTeam_wins:       nba_schedule[i].vTeam.win,
	      vTeam_loss:      nba_schedule[i].vTeam.loss,
	      isLeaguePass:   	nba_schedule[i].watch.broadcast.video.isLeaguePass
	      //isTNTOT:        nba_schedule[i].watch.broadcast.video.isTNTOT,
	      //isBlackout:     nba_schedule[i].watch.broadcast.video.isNationalBlackout,
	      //canPurcahse:    nba_schedule[i].watch.broadcast.video.canPurchase,
	      //watch_national:   nba_schedule[i].watch.broadcast.video.national.broadcasters.shortName,
	      //watch_canada:     nba_schedule[i].watch.broadcast.video.canadian[0].shortName,
	      //watch_spanish:    nba_schedule[i].watch.broadcast.video.spanish_national[0].shortName
	    };

	    parsed_nba_schedule.push(new_schedule_for_import);
	  }
	  //Convert to readable string, instead of [object Object];
	  parsed_nba_schedule = JSON.stringify(parsed_nba_schedule);

	  //Pathname for our file storage.
	  const pathName = `${__dirname}/../storage/nba_data/nba_schedule.json`;

	  //Create JSON file containing out JSON data into a file.
	  await fs.writeFile(pathName, parsed_nba_schedule, (err) => {
	  	if(err){
	  		console.error('There was a error when writing NBA Schedule to a file.\n' + err);
	  		return;
	  	}
	  	console.log(`NBA Schedule was successfully written to ${pathName}`);
	  });
	},
	get_file_nba_conference_standings: async function(){
		var c_standings = await web.getRequest('http://data.nba.net/prod/v1/current/standings_conference.json');
		w_standings = c_standings.league.standard.conference.west;
		e_standings = c_standings.league.standard.conference.east;
		var west_standings = new Array();
		var east_standings = new Array();

		for(var i = 0; i < w_standings.length; i++){

			var west_team = {
				teamId: 									w_standings[i].teamId,		
				win: 											w_standings[i].win,
				loss: 										w_standings[i].loss,
				winPct: 									w_standings[i].winPct,
				winPctV2: 								w_standings[i].winPctV2,
				lossPct: 									w_standings[i].lossPct,
				lossPctV2: 								w_standings[i].lossPctV2,
				gamesBehind: 							w_standings[i].gamesBehind,
				divGamesBehind: 					w_standings[i].divGamesBehind,
				clinchedPlayoffsCode: 		w_standings[i].clinchedPlayoffsCode,
				clinchedPlayoffsCodeV2: 	w_standings[i].clinchedPlayoffsCodeV2,
				confRank: 								w_standings[i].confRank,
				confWin: 									w_standings[i].confWin,
				confLoss: 								w_standings[i].confLoss,
				divWin: 									w_standings[i].divWin,
				divLoss: 									w_standings[i].divLoss,
				homeWin: 									w_standings[i].homeWin,
				homeLoss: 								w_standings[i].homeLoss,
				awayWin: 									w_standings[i].awayWin,
				awayLoss: 								w_standings[i].awayLoss,
				lastTenWin: 							w_standings[i].lastTenWin,
				lastTenLoss: 							w_standings[i].lastTenLoss,
				streak: 									w_standings[i].streak,
				divRank: 									w_standings[i].divRank,
				isWinStreak: 							w_standings[i].isWinStreak,
				sortDefaultOrder: 				w_standings[i].sortDefaultOrder
			};
			west_standings.push(west_team);
		}

		for(var i = 0; i < e_standings.length; i++){
			var east_teams = {
				teamId: 									e_standings[i].teamId,		
				win: 											e_standings[i].win,
				loss: 										e_standings[i].loss,
				winPct: 									e_standings[i].winPct,
				winPctV2: 								e_standings[i].winPctV2,
				lossPct: 									e_standings[i].lossPct,
				lossPctV2: 								e_standings[i].lossPctV2,
				gamesBehind: 							e_standings[i].gamesBehind,
				divGamesBehind: 					e_standings[i].divGamesBehind,
				clinchedPlayoffsCode: 		e_standings[i].clinchedPlayoffsCode,
				clinchedPlayoffsCodeV2: 	e_standings[i].clinchedPlayoffsCodeV2,
				confRank: 								e_standings[i].confRank,
				confWin: 									e_standings[i].confWin,
				confLoss: 								e_standings[i].confLoss,
				divWin: 									e_standings[i].divWin,
				divLoss: 									e_standings[i].divLoss,
				homeWin: 									e_standings[i].homeWin,
				homeLoss: 								e_standings[i].homeLoss,
				awayWin: 									e_standings[i].awayWin,
				awayLoss: 								e_standings[i].awayLoss,
				lastTenWin: 							e_standings[i].lastTenWin,
				lastTenLoss: 							e_standings[i].lastTenLoss,
				streak: 									e_standings[i].streak,
				divRank: 									e_standings[i].divRank,
				isWinStreak: 							e_standings[i].isWinStreak,
				sortDefaultOrder: 				e_standings[i].sortDefaultOrder
			}
			east_standings.push(east_teams);
		}

		west_standings = JSON.stringify(west_standings);
		east_standings = JSON.stringify(east_standings);

		const westFilePath = `${__dirname}/../storage/nba_data/nba_conference_west.json`;
		const eastFilePath = `${__dirname}/../storage/nba_data/nba_conference_east.json`;

		fs.writeFile(westFilePath, west_standings, (err) => {
			if(err){
				console.error(`There was a problem writing West Conference Standings to a file.\n` + err);
				return;
			}
			console.log('Successfully wrote West Conference Standings.');
		});

		fs.writeFile(eastFilePath, east_standings, (err) => {
			if(err){
				console.error(`There was a problem writing East Conference Standings to a file\n` + err);
				return;
			}
			console.log(`Successfully wrote East Conference Standings.`);
		});
	},
	get_file_nba_coaches: async function(){
		var nba_coaches = await web.getRequest('http://data.nba.net/prod/v1/2017/coaches.json');
		nba_coaches = JSON.stringify(nba_coaches.league.standard);
		console.log(nba_coaches);
		const pathName = `${__dirname}/../storage/nba_data/nba_coaches.json`;
		await fs.writeFile(pathName, nba_coaches, (err) => {
			if(err){
				console.error(`There was an error writing NBA Coaches to a file.\n` + err);
				return;
			}
			console.log(`NBA Schedule was successfully written to ${pathName}`);
		});

		/*for(var i = 0; i < nba_coaches.length; i++){
			var getCoach = {
				firstName = 			coaches[i].firstName,
				lastName = 				coaches[i].lastName,
				isAssistant = 		coaches[i].isAssistant,
				personId = 				coaches[i].personId,
				teamId = 					coaches[i].teamId,
				sortSequence = 		coaches[i].sortSequence,
				college = 				coaches[i].college,
			}
		}
		*/
	},
	updateCreateNBASchedule: async function(){

		//Query to create a table if it does not exist.
  	var tableQuery 	= `CREATE TABLE IF NOT EXISTS nba_schedule (`
  	tableQuery += `gameId INT NOT NULL,`
  	tableQuery += `gameUrlCode INT NOT NULL,`
  	tableQuery += `seasonStageId TEXT NOT NULL,`
  	tableQuery += `statusNum TEXT NOT NULL,`
  	tableQuery += `startTimeUTC TEXT NOT NULL,`
  	tableQuery += `startDateEastern TEXT NOT NULL,`
  	tableQuery += `startTimeEastern TEXT NOT NULL,`
  	tableQuery += `isBuzzerBeater TEXT NOT NULL,`
  	tableQuery += `nugget TEXT NOT NULL,`
  	tableQuery += `hTeam_teamId INT NOT NULL,`
  	tableQuery += `hTeam_score INT NOT NULL,`
  	tableQuery += `hTeam_win INT NOT NULL,`
  	tableQuery += `hTeam_loss INT NOT NULL,`
  	tableQuery += `vTeam_teamId INT NOT NULL,`
  	tableQuery += `vTeam_score INT NOT NULL,`
  	tableQuery += `vTeam_win INT NOT NULL,`
  	tableQuery += `vTeam_loss INT NOT NULL,`
  	tableQuery += `isLeaguePass TEXT NOT NULL,`
  	tableQuery += `PRIMARY KEY(gameId) );`;

  	//Executes our tableQuery.
  	await connection.query(tableQuery, (err, result, fields) => {
  		if(err){
  			throw `>>Trouble Creating nba_schedule Table.\n>>` + err;
  		}
  		console.log(result)
  	});

  	//This query will insert or update our data into MYSQL
  	var insertNBAQuery = `REPLACE INTO nba_schedule`;
  	insertNBAQuery += `(gameId, gameUrlCode, seasonStageId, statusNum, startTimeUTC, startDateEastern, startTimeEastern, isBuzzerBeater, nugget, hTeam_teamId, hTeam_score, hTeam_win, hTeam_loss, vTeam_teamId, vTeam_score, vTeam_win, vTeam_loss, isLeaguePass)`
  	insertNBAQuery += `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
  	
  	//Prepare our query for insertion with execute.
  	await connection.prepare(insertNBAQuery, async (err, statement) => {
  		if(err){
  			throw err;
  		} 
  		
  		/*scheduleJSON returns an object that looks like this:
			{ gameId: '0011700001',
			  seasonStageId: 1,
			  gameUrlCode: '20170930/DENGSW',
			  statusNum: 3,
			  extendedStatusNum: 0,
			  isStartTimeTBD: false,
			  startTimeUTC: '2017-10-01T00:30:00.000Z',
			  startDateEastern: '20170930',
			  startTimeEastern: '8:30 PM ET',
			  isBuzzerBeater: false,
			  period: { current: 4, type: 0, maxRegular: 4 },
			  nugget: { text: 'First preseason game of 2017-18' },
			  hTeam: { teamId: '1610612744', score: '102', win: '0', loss: '1' },
			  vTeam: { teamId: '1610612743', score: '108', win: '1', loss: '0' },
			  watch: { broadcast: { video: [Object] } } }*/
  		var scheduleJSON = await web.getRequest('http://data.nba.net/prod/v1/2017/schedule.json');
  		scheduleJSON = scheduleJSON.league.standard;

  		var nbaSchedule = []; // Push every game in schedule in this array.
  		//Loop through scheduleJSON and push game data to our NBA Schedule as an array
  		for(var i = 0; i < scheduleJSON.length; i++){
  			
  			nbaSchedule.push([
  				scheduleJSON[i].gameId,
	  			scheduleJSON[i].seasonStageId,
	  			scheduleJSON[i].gameUrlCode,
	  			scheduleJSON[i].statusNum,
	  			scheduleJSON[i].startTimeUTC,
	  			scheduleJSON[i].startDateEastern,
	  			scheduleJSON[i].startTimeEastern,
	  			scheduleJSON[i].isBuzzerBeater,
	  			scheduleJSON[i].nugget.text,
	  			scheduleJSON[i].hTeam.teamId,
	  			scheduleJSON[i].hTeam.score ? scheduleJSON[i].hTeam.score : 0,
	  			scheduleJSON[i].hTeam.win ? scheduleJSON[i].hTeam.win : 0,
	  			scheduleJSON[i].hTeam.loss ? scheduleJSON[i].hTeam.loss : 0,
	  			scheduleJSON[i].vTeam.teamId,
	  			scheduleJSON[i].vTeam.score ? scheduleJSON[i].vTeam.score : 0,
	  			scheduleJSON[i].vTeam.win ? scheduleJSON[i].vTeam.win : 0,
	  			scheduleJSON[i].vTeam.loss ? scheduleJSON[i].vTeam.loss : 0,
	  			scheduleJSON[i].watch.broadcast.video.isLeaguePass
	  		]);
	  		
	  		statement.execute(nbaSchedule[i], (err, rows, fields) => {
	  			if(err){
	  				console.error(`There was an error when attempting to insert NBA Schedule data into mysql table.\n` + err);
	  				throw err;
	  			}
	  			console.log(rows)
	  			console.log(`Execute Function Completed. Row Inserted.`);
	  		});
  		}
  		statement.close()
  	});
	},
	returnNBASchedule : function(insertedGameDate = time.yyyymmdd()){
		return new Promise((resolve, reject) => {
			//const today = time.yyyymmdd();
			//const monthLength = time.monthLength();

			const selectTable = `SELECT * FROM nba_schedule WHERE startDateEastern = ?`;
			const gameDate = [insertedGameDate];

			connection.execute(selectTable, gameDate, (err, rows, fields) => {
				if(err) reject(err);
				//console.log(rows[0]);
				//console.log(fields[0]);
				resolve(rows);
			});
		});
	}
	

	/*
	get_nba_allstars : async function(){
		var allstars = await web.getRequest('http://data.nba.net/prod/v1/allstar/2017/AS_roster.json');
		allstars = allstars.roster.players;
		allstar_teams = allstars.roster.teams;
		allstar_game_date = allstars.sportsContent.sportsMeta.seasonMeta.calendarDate;

		var nba_allstars = [];

		for(var i = 0; i < allstars.length; i++){
			var allstar_player = {

			}
		}
	}
	*/
}