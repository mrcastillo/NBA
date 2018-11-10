import React from "react";
import axios from "axios";
import _ from "lodash";

import { Row, Col} from "react-bootstrap";

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
                        <Col xs={6} className={"game"} key={key}>
                            <div className={"game-top-section"}>
                                <img className={"game-team-logo"} src={require(`../images/nba-logos/${score.hTeam.triCode}.png`)} width="15%" height="15%"/>
                                <p className={"game-team-score"}>{score.hTeam.score} - {score.vTeam.score}</p>
                                <img className={"game-team-logo"} src={require(`../images/nba-logos/${score.vTeam.triCode}.png`)} width="15%" height="15%" />
                            </div>

                            <div className={"game-mid-section"}>
                                <p id={"game-clock"}>{score.clock === "" ? "00:00" : score.clock}</p>
                                <p id={"game-team-tricode"}>{score.hTeam.triCode} {score.hTeam.win}-{score.hTeam.loss} - {score.vTeam.triCode} {score.vTeam.win}-{score.vTeam.loss}</p>
                                <p className={"game-start-time"}>{score.startTimeEastern}</p>
                                
                            </div>
                        </Col>
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
    };

    render(){
        return(
            <Row className={"nba-game-container"}>
                <Col xs={12}>
                    <p className={"game-welcome"}>Today's NBA Games</p>
                    {/*<h1 onClick={this.getScoreboard}>Test</h1>*/}
                </Col>
                
                {this.state.scoreboard}
            </Row>
        )
    }
}

export default ScoreBoard;