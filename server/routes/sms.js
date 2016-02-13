var express = require('express');
var router = express.Router();
var auth = require('../utilities/utils');
var client = require('twilio')(auth.twilioSID, auth.twilioToken);

router.post('/', function(req, res){
  client.messages.create({
    to: req.body.phone,
    from: auth.twilioNumber,
    body: req.body.message,
    mediaUrl: req.body.url,
  }, function(err, message) {
    if(err){ console.error(err)};
    console.log(message.sid);
    res.send(message.sid);
  });
})

module.exports = router;
