const twit = require('twit');
const config = require('./config.js');
const TwitterPost = new twit(config.postingMethod());
const TwitterStream = new twit(config.streamingMethod());
const DictionaryConfig = config.dictionaryMethod();
const Tweet = require('../../models/Tweet');
const axios = require('axios');
const moment = require('moment');

//TODO: PUNCTUATION IS NOT APPEARING PROPERLY
//MAKE TWEETS REPLIES RATHER THAN STATUS UPDATES


//TODO: ONLY CAPTURE THE OBNOXIOUS TWEETS THAT TWEET LIKE THIS:
// "
// RT @LazasBautista: Stop wasting money on ordering food.
// RT @LazasBautista: Stop wasting money on ordering food.
// RT @LazasBautista: Stop wasting money on ordering food.
// RT @LazasBautista: Stop wasting money on ordering food.
// RT @LazasBautista: Stop wasting money on ordering food.
// RT @LazasBautista: Stop wasting money on ordering food.
//"

//TODO: IF REWRITTEN TWEET IS SAME AS ORIGINAL DO NOT TWEET

//TODO: After 'a' and 'an' check for next character in next word and change to appropriate 'a' or 'an';


// Post Hello World
// TwitterPost.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(`GET COMPLETE, \n Posted: \n ""`)
// });

//
//  Stream catching all instances of 'food'
//
const stream = TwitterStream.stream('statuses/filter', {
  track: 'food',
  language: 'en'
})


function startStream() {
  let tweetCount = 0;
  // let escapedChars = RegExp(/[@#$%&*\'\"\`\]\?\’\…]/);
  let escapedChars = RegExp(/[@#$%&*\'\"\`\]\?\’]/);
  let capitalizedChars = RegExp(/[A-Z]/);
  let escapedImages = RegExp(/http/);
  let retweetedCharacters = RegExp(/RT\s@[a-zA-Z]+:/);
  stream.on('tweet', function(tweet) {
    let tweetText = tweet.text;
    let tweetUser = tweet.user.screen_name;
    let tweetDate = tweet.created_at;
    let tweetID = tweet.id_str;
    let name = tweet.user.screen_name;


    //This will log entire tweet response
    console.log("FULL TWEET: ", tweet)

    let tweetModel = new Tweet({
      text: tweetText,
      alteredText: 'tweetImproved',
      user: tweetUser
    });


    //LOOKING FOR EXTENDED TWEET
    // console.log("TWEET CAME IN: \n", tweetText);
    // console.log('\nTRUNCATED: ', tweet.truncated);

    // if (tweet.truncated) {
    //   console.log('EXTENDED TWEET: ', tweet.user.extended_tweet.full_text);
    // } else {
    //   console.log("NOT TRUNCATED")
    // }

    // if (tweet.retweeted_status.extended_tweet.truncated) {
    // console.log("\n\nEXTENDED TWEET\n\n", tweet.retweeted_status.extended_tweet.full_text);
    // } else {
    //   console.log('not a retweet')
    // }
    //LOOKING FOR EXTENDED TWEET


    // Capture 4 tweets every 15 minutes
    tweetCount++
    if (tweetCount === 1) {
      tweetCount = 0;
      stream.stop();

      let tweetTextArray = tweetText.split(' ');
      let rewrittenArray = tweetTextArray;
      let axiosArray = [];
      console.log(`\n\n TWEET TEXT ARRAY: ${tweetTextArray}\n\n`);
      for (let i = 0; i < tweetTextArray.length; i++) {

        let word = tweetTextArray[i];
        let thesaurusURL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${DictionaryConfig.thesaurus_key}`

        if ((word.length >= 4 && escapedChars.test(word) === false && word[0] !== '@')) {
          if (!capitalizedChars.test(word[0])) {
            let newPromise = axios({
                method: 'get',
                url: thesaurusURL
              })
              .then((res) => {
                if (typeof res.data[0] === 'string') {
                  let newWordIndex = Math.floor(Math.random() * (res.data.length))
                  // console.log("CURRENT WORD", res.data[newWordIndex]);
                  rewrittenArray[i] = (res.data[newWordIndex]);
                } else {
                  let newWordIndex = Math.floor(Math.random() * (res.data[0].meta.syns[0].length))
                  // console.log("CURRENT WORD", res.data[0].meta.syns[0][newWordIndex]);
                  rewrittenArray[i] = (res.data[0].meta.syns[0][newWordIndex]);
                }
              })
              .catch((err) => {
                console.log("ERROR at word lookup with word: ", word);
              });
            axiosArray.push(newPromise);
          }
        } else {
          if (escapedImages.test(word)) {
            console.log('SKIPPED CURRENT WORD', word)
          } {
            rewrittenArray[i] = (word);
          }
        }
      }
      axios.all(axiosArray)
        .then(axios.spread((...responses) => {
          tweetModel.alteredText = rewrittenArray.join(' ');
          // let cutIndex = tweetDate.indexOf('+');
          // tweetModel.created = tweetDate.substring(0, cutIndex - 1);
          tweetModel.created = moment().format("MMM Do YYYY, h:mm:ssa");
          tweetModel.tweetID = tweetID;
          if (rewrittenArray !== tweetText) {
            //
            //SAVE TO DB IF REWRITTENTWEET IS NOT IDENTICAL TO ORIGINAL
            //
            tweetModel.save()
              .then((res) => {
                console.log("\nORIGINAL: ", tweetText + '\n');
                console.log("\nREWRITTEN: ", rewrittenArray.join(' ') + '\n');
                // console.log("TWEETMODEL: ", tweetModel);
                console.log('\nSAVE TO DB COMPLETE:\n', res + '\n');
                //   //
                //   //POST THE REWRITTEN TWEET
                //   //
                TwitterPost.post('statuses/update', {
                  in_reply_to_status_id: tweetID,
                  status: tweetModel.alteredText
                }, function(err, data, response) {
                  console.log(`\nPOSTED: "${tweetModel.alteredText}"\n\n`)
                });
                return res;
              }).catch((err) => console.log("Unable to save", err))
          }
        }))
        .catch(err => console.log("ERROR: ", err))

      //
      // REWRITE THIS
      //
      // for (let i = 0; i < tweetTextArray.length; i++) {
      //   let word = tweetTextArray[i];
      //   if ((word.length >= 5 && escapedChars.test(word) === false && word[0] !== '@')) {
      //     if (!capitalizedChars.test(word[0])) {
      //       let thesaurusURL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${DictionaryConfig.thesaurus_key}`

      //       axios.get(thesaurusURL)
      //         .then((res) => {
      //           if (typeof res.data[0] === 'string') {
      //             let newWordIndex = Math.floor(Math.random() * (res.data.length))
      //             // console.log("CURRENT WORD", res.data[newWordIndex]);
      //             rewrittenArray[i] = (res.data[newWordIndex]);
      //           } else {
      //             let newWordIndex = Math.floor(Math.random() * (res.data[0].meta.syns[0].length))
      //             // console.log("CURRENT WORD", res.data[0].meta.syns[0][newWordIndex]);
      //             rewrittenArray[i] = (res.data[0].meta.syns[0][newWordIndex]);
      //           }
      //         }).catch(err => `CURRENT ERROR ON WORD: ${word}; ERR: ${err}`)
      //     } else {
      //       console.log("NOT CHANGED: ", word);
      //       rewrittenArray[i] = (word);
      //     }
      //   } else {
      //     console.log("NOT CHANGED: ", word);
      //     rewrittenArray[i] = (word);
      //   }
      // }


      // function tweetImproved() {

      //   tweetModel.alteredText = rewrittenArray.join(' ');
      //   let cutIndex = tweetDate.indexOf('+');
      //   tweetModel.created = tweetDate.substring(0, cutIndex - 1);
      // }

      // function sentTweetModel() {
      //   console.log(tweetModel);
      //   // Saving to DB
      // tweetModel.save()
      //   .then((res) => {
      //     res.json()
      //   })
      //   .catch((err) => (err));
      // }

      // setTimeout(tweetImproved, 1000);
      // setTimeout(sentTweetModel, 1000);


      // function postTweets() {
      //   //
      //   //POST THE REWRITTEN TWEET
      //   //
      //   TwitterPost.post('statuses/update', {
      //     in_reply_to_status_id: tweetID,
      //     status: tweetModel.alteredText
      //   }, function(err, data, response) {
      //     console.log(`GET COMPLETE, \n Posted: ${tweetModel.alteredText}\n ""`)
      //   });
      // }

      // setTimeout(postTweets, 1200);

      //
      //REWRITE THIS END;
      //

      // 1 Tweets every 5 minutes. 12 tweets an Hour
      console.log('Stream Break')
      setInterval(() => {
        stream.start();
      }, 5*60000)
    }
  });
}



module.exports.startStream = startStream;

stream.on('disconnect', function(disconnectMessage) {
  console.log(disconnectMessage)
});

stream.on('error', function(errorMessage) {
  console.log(errorMessage)
});
