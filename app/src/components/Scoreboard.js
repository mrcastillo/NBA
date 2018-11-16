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

                                <div className={"game-team-scoreboard"}>
                                    <p className={"game-team-win-lose"}>{score.vTeam.win}-{score.vTeam.loss}</p>
                                    <img className={"game-team-logo"} src={require(`../images/nba-logos/${score.vTeam.triCode}.png`)} />
                                </div>

                                <div className={"game-team-scoreboard"}>
                                    <span id={score.isGameActivated ? "game-status-on" : "game-status-off"}> &nbsp; </span>
                                    <p className={"game-clock"}>Q{score.period.current} - {score.clock === "" ? "00:00" : score.clock}</p>
                                </div>

                                <div className={"game-team-scoreboard"}>
                                    <p className={"game-team-win-lose"}>{score.hTeam.win}-{score.hTeam.loss}</p>
                                    <img className={"game-team-logo"} src={require(`../images/nba-logos/${score.hTeam.triCode}.png`)} />
                                </div>
                            </div>

                            <div className={"game-bot-section"}>
                                <p className={"game-team-score"}>{score.vTeam.triCode}-{score.vTeam.score}</p>
                                <p className={"game-team-score"}>{score.hTeam.triCode}-{score.hTeam.score}</p>
                                <p id={"game-start-time"}>{score.startTimeEastern}</p>
                                {/*<p id={"game-nugget-text"}>{score.nugget.text}</p> */}
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