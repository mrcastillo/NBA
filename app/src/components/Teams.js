import React from "react";
import axios from "axios";
import _ from "lodash";

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
                    <p key={key}>{team.fullName}</p>
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
            <div className={"nba-teams"}>
                {this.state.teams}
            </div>
        )
    }
}

export default Teams;