import React, { Component } from 'react';
import axios from "axios";
import _ from "lodash";

import './css/index.css';

import Scoreboard from "./components/Scoreboard";
import Teams from "./components/Teams";

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={"app-layout"}>

        <div className={"top-header"}>
          <h1>NBA API</h1>
          <h3>NBA Data - Development</h3>
        </div>

        { /*
          <Scoreboard />
          
        */}
        <Scoreboard />
        <hr />
        <Teams />
      </div>
    );
  }
}

export default App;
