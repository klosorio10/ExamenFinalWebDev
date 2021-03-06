import Twitter from "twitter";
import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";
// var Twitter = require("twitter");

// TODO: Now we have only one stream overall,
// we should have one per user at least
let stream = null;

// This is a in memory only collection
export const Tweets = new Mongo.Collection("tweets");


// Twitter streamer should run only on the server
if (Meteor.isServer) {
  Meteor.publish("tweets", function tweetsPublication() {
    return Tweets.find({}, {sort: {created_at: -1}});
  });

  // This method will trigger the streamer
  Meteor.methods({
    "twitter.stream"(query) {
      console.log("Twitter search" + query);

      // Create the Twitter object
      let client = new Twitter({
        //consumer_key: process.env.TWITTER_CONSUMER_KEY,
        //consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        //access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        //access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        consumer_key: "lBTKDtk70iDBJe6918CMfrW9P",
        consumer_secret: "OZAKBQsDvda244eRizabfMB5KDVKDha8IxThldLlcnR6ODO3GS",
        access_token_key: "823972659373502464-jPF0JgTOmGt9sPxBHp1lHM3COYWC1n7",
        access_token_secret: "FPNNosHAB6bZRvEXLjue4614O39vNjd4jaMCeSWpNnglK"

      });

      if (stream) {
        console.log("Stopping previous stream");
        stream.destroy();
        // Remove all the tweets
        Tweets.remove({});
      }
      // Colombia
      let locations = "-79.12,-4.23,-66.85,12.59";
      stream = client.stream("statuses/filter", {track: query, locations:locations});
      stream.on("data", Meteor.bindEnvironment(function(tweet) {
        // resolve(tweet);
        if(tweet.coordinates !== null){
          Tweets.insert(tweet);
          console.log(tweet.coordinates);
        }
      }));

      stream.on("error", function(error) {
        console.log(error);
        throw Meteor.Error(error);
      });
    }// twitter.stream
  }); //Meteor.methods
}
