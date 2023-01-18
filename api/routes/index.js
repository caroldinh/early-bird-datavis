var express = require('express');
const names = require('../public/names.json');
const {TwitterApi} = require('twitter-api-v2');
require('dotenv').config()

// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi(process.env.TWITTER_CLIENT)

// Tell typescript it's a readonly app
const readOnlyClient = twitterClient.readOnly;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:name', async(req, res) => {

});

router.get('/all-data/', async(req, res) => {
  
  names.forEach(entry, async() => {

    const user = await readOnlyClient.v2.userByUsername(req.params.name.toString());
    //res.send(req.params.name);
    if (user.errors) {
      res.send("Error");
    } else if (user.data) {
      const userInfo = await readOnlyClient.v2.user(user.data.id, { 'user.fields': ['public_metrics', 'created_at'] });
      res.send(userInfo);
    }

  })

})

module.exports = router;
