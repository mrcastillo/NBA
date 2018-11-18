import React from "react";
import axios from "axios";
import _ from "lodash";
import { Row, Col} from "react-bootstrap";
 
class Teams extends React.Component{
    constructor(props){
        super(props);

        this.getNBATeams = this.getNBATeams.bind(this);

        this.state = {
            teams: []
        }
    }
    
    componentDidMount() {
        this.getNBATeams();
    }


    getNBATeams(){
        var url = `http://localhost:8181/teams`;
        axios.get(url)
        .then((teams) => {
            teams = teams.data;

            var element = [];

            _.each(teams, (team, key) => {
                element.push(
                    <div className={"team-box"}>
                        <div className={"team-logo-name"}>
                            <p key={key}>{team.fullName}</p>
                            <img src={require(`../images/nba-logos/${team.tricode}.png`)} />
                        </div>
                        
                        <div className={"team-info"}>
                            <p>Hello</p>
                        </div>

                    </div>
                )
                console.log(team)
            });

            this.setState({
                teams: element
            });
        });
    }
    render(){
        return(
            <Row>
                <Col xs={12} className={"nba-teams"}>
                    {this.state.teams}
                </Col>
            </Row>
        )
    }
}

export default Teams;