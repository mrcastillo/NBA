import React from "react";
import axios from "axios";
import _ from "lodash";

class ScoreBoard extends React.Component{
    constructor(props){
        super(props);

        this.getScoreboard = this.getScoreboard.bind(this);

        this.state = {
            scoreboard: []
        }
    }
    
    componentDidMount() {
        this.getScoreboard();
        var interval = 4000;
        setInterval(this.getScoreboard, interval);
        interval = 3000;
    }

    getScoreboard() {
        var url = `http://localhost:8181/scoreboard`;

        axios.get(url)
        .then((scoreboard) => {
            if (scoreboard.status === 200) {
                scoreboard = scoreboard.data;

                var gameDetailElements = [];

                _.each(scoreboard, (score, key) => {
                    gameDetailElements.push(
                        <div className={"game"} key={key}>
                            <p>{score.hTeam.triCode} vs {score.vTeam.triCode}</p>
                            <p>{score.clock === "" ? "00:00" : score.clock}</p>
                            <p>{score.hTeam.score} - {score.vTeam.score}</p>
                        </div>
                    )
                })

                console.log(scoreboard);
                this.setState({
                    scoreboard: gameDetailElements
                });
            }
            else {
                console.error(`There was an error with the scoreboard request - ${scoreboard.status} \n ${scoreboard.statusText}`);
            }

        });
    }

    render(){
        return(
            <div className={"nba-game-container"}>
                <p>Today's NBA Games</p>
                <h1 onClick={this.getScoreboard}>Test</h1>
                {this.state.scoreboard}
            </div>
        )
    }
}

export default ScoreBoard;