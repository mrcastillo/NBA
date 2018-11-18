import React, { Component } from 'react';
import axios from "axios";
import _ from "lodash";

import './css/index.css';

import Scoreboard from "./components/Scoreboard";
import Teams from "./components/Teams";
import { Grid, Row, Col } from "react-bootstrap";

class App extends Component {
  constructor(props){
    super(props);
  }


  componentDidMount() {
    
  }

  getScoreboard() {
    var url = `http://localhost:8181/scoreboard`;

    axios.get(url)
    .then((scoreboard) => {
      scoreboard = scoreboard.data;
      
      this.setState({})
    })
  }

  render() {
    return (
      <Grid className={"app-layout"}>

        <Scoreboard />
        <Teams />

      </Grid>
    );
  }
}

export default App;
