let express = require('express');
let fs = require("fs");
const {TwitterApi} = require('twitter-api-v2');
require('dotenv').config()

// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi(process.env.TWITTER_CLIENT);

// Tell typescript it's a readonly app
const client = twitterClient.readOnly;

let router = express.Router();

async function getUserInfo(name) {

    const user = await client.v2.userByUsername(name);

    if (user.errors) {
      return { error : "User not found" };
    } else if (user.data) {
      const userInfo = await client.v2.user(user.data.id, { 'user.fields': ['public_metrics', 'created_at'] });
      return userInfo;
    }

}

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function readFile(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:name', async(req, res) => {
  
  let result = await getUserInfo(req.params.name.toString());
  res.send(result);


});

router.get('/all-data/', async(req, res) => {
 
  let existing_users = {};
  let nonexistent = {};

  let nameData = readFile("../public/name-data.json");

  let namesList = Object.keys(nameData);
  let firstHalf = await client.v2.usersByUsernames(namesList.slice(0, 100), { 'user.fields' : ['public_metrics', 'created_at', 'profile_image_url', 'verified']})
  let secondHalf = await client.v2.usersByUsernames(namesList.slice(100), { 'user.fields' : ['public_metrics', 'created_at', 'profile_image_url', 'verified']})

  function defineUserObj(user) {
      let nameKey = user.username.slice(0, 1).toUpperCase() + user.username.slice(1).toLowerCase();
      existing_users[user.username] = {
        name : user.username.toLowerCase(),
        name_popularity : nameData[nameKey].popularity,
        name_gender : nameData[nameKey].gender,
        user_exists : true,
        user_data : {
          display_name : user.name,
          profile_image : user.profile_image_url,
          follower_count : user.public_metrics.followers_count,
          created_at: user.created_at,
          industry : "Unknown / Private Figure",
          is_verified : user.verified,
        }
      }
  }

  function defineNonExistent(user) {
      nonexistent[user.resource_id.toLowerCase()] = {
        name_popularity : nameData[user.resource_id].popularity,
        name_gender : nameData[user.resource_id].gender,
        user_exists : false,
        user_error : user.detail
      }
  }

  firstHalf.data.forEach(user => defineUserObj(user));
  firstHalf.errors.forEach(user => defineNonExistent(user));
  secondHalf.data.forEach(user => defineUserObj(user));
  secondHalf.errors.forEach(user => defineNonExistent(user));

  res.send({
    existing_users : existing_users,
    nonexistent_users : nonexistent,
  });

})

module.exports = router;
