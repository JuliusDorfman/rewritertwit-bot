const Tweet = require('../models/Tweet');

exports.findAll = (req, res) => {
  console.log('ROUTE: /api/twitterAPI, {GET}')
  Tweet.find()
    .sort({
      created: -1
    })
    .exec()
    .then()
    .then((tweet) => res.json(tweet))
    .catch((err) => next(err));
};

exports.addTest = (req, res) => {
  console.log('ROUTE: /api/twitterAPI/addtest, {GET}')
  let testTweet = {
    text: "Test User from clientside",
    user: "Hello World from clientside"
  }
  const tweet = new Tweet(testTweet);
  tweet.save()
    .then(() => res.json(tweet))
    .catch((err) => next(err));
}


exports.postTweet = (req, res, next) => {
  console.log('ROUTE: /api/twitterAPI/posttweet, {POST}')
  const tweet = new Tweet();

  tweet.save()
    .then(() => res.json(tweet))
    .catch((err) => (err));
};

// exports.putTweet()

exports.deleteTweet = (req, res, next) => {
  console.log('ROUTE: /api/twitterAPI/deletetweet/:id, {DELETE}')
  Tweet.findOneAndDelete({
      _id: req.params.id
    })
    .exec()
    .then((tweet) => res.json())
    .catch((err) => next(err));
};