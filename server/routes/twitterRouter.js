const controller = require('../controllers/controller.js'),
  express = require('express'),
  router = express.Router()
  
// ROUTE:  /api/twitterAPI
// ACCESS: PUBLIC
router.route('/')
.get(controller.findAll);

// ROUTE /api/twitterAPI/addtest
// ACCESS: PUBLIC
router.route('/addtest')
  .get(controller.addTest);

// ROUTE /api/twitterAPI/postTweet
// ACCESS: PUBLIC
router.route('/posttweet')
  .get(controller.postTweet);

// ROUTE /api/twitterAPI/deleteTweet
// ACCESS: PUBLIC
router.route('/deletetweet/:id')
  .delete(controller.deleteTweet);


module.exports = router;