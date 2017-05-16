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
    projection = null;
    }
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

  setProjection(mapa){
    this.setState({projection:mapa});
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
          <ColombiaMap width="600" height="600" data={{}}></ColombiaMap>
          <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>
          {this.pintarTweets()}
      </div>
    );
  }
}


pintarTweets( ) {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
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
