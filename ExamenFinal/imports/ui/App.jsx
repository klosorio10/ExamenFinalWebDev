import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import ColombiaMap from "./ColombiaMap.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projection : null
    };
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }

  getProjection(){
    console.log("getProyection desde el hijo");
    console.log(this.state.projection);
    return this.state.projection;
  }

  setProjection(mapa){
      this.setState({ projection:mapa });
  }

  render() {
    console.log("render!");
    return (
      <div>
        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Results:</h2>
        <div className="outsideWrapper">
          <div className="insideWrapper">
            <canvas className="coveringCanvas" id="myCanvas" width="960px" height="500px"></canvas>
            <ColombiaMap className="coveredImage" data={{}} setProjection={(mapa)=> this.setProjection(mapa)}/>
            <TweetsResults tweets={this.props.tweets} getProjection={()=>this.getProjection()}/>
          </div>
        </div>


      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
