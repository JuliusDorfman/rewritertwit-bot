const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  user: {
    type: String,
    default: "<User Not found>"
  },
  created: {
    type: String,
    default: '<Date not found>'
  },
  tweetID: {
    type: String,
    default: '<Tweet ID not found>'
  },
  text: {
    type: String,
    default: "<Tweet Not found>",
  },
  alteredText: {
    type: String,
    default: "Unimprovable."
  }
});

module.exports = mongoose.model('Tweet', TweetSchema);
