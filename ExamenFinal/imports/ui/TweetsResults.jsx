import React, {Component} from "react";


import Tweet from "./Tweet.jsx";

export default class TweetResults extends Component {
    constructor(props) {
      super(props);
    }

  renderTweets() {
    return this.props.tweets.map((tweet) => {
      key= tweet.id;
      lAl = tweet.coordinates.coordinates;
      lat = lAl[0];
      long = lAl[1];
      projection = this.props.getProjection();
      plano = projection([lat,long])
      x = (plano[0]);
      y = (plano[1]);
      console.log("la:"+lat+", lon:"+long+ "plano x:"+x+", y:"+y);
      var canvas = document.getElementById('myCanvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src= tweet.user.profile_image_url;
            ctx.drawImage(img, x-15, y-15, 30, 30)
      }
      return (<div className="tweet">
      </div>);
    });
  }

  render() {
    return (
      <div>
        {this.renderTweets()}
      </div>
    );
  }
}
