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

  render() {
    return (
      <Grid className={"app-layout"}>

        {/*
        <Row className={"top-header"}>
          <Col xs={12}>
            <h1>NBA API</h1>
            <h3>NBA Data - Development</h3>
          </Col>
        </Row>
        */}
        { /*
          <Scoreboard />
          
        */}
        <Scoreboard />
        <hr />
        <Teams />
      </Grid>
    );
  }
}

export default App;
