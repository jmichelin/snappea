var express = require('express');
var router = express.Router();
var auth = require('../utilities/utils');
var client = require('twilio')(auth.twilioSID, auth.twilioToken);

router.post('/', function(req, res){
  var friendArray = req.body.sendTo;
  var message = req.body.message;
  //var url = req.body.restaurantUrl;
  var sid = [];

  client.messages.create({
    to: friendArray[0].phone,
    from: auth.twilioNumber,
    body: message
    //mediaUrl: url
  }, function(err, message) {
    if(err){ console.error(err)}
    else{ sid.push(message) };
  })

  // for(var i=0 ; i<friendArray.length ; i++){
  //}
  console.log('sid in sms route: ',sid);
  res.send(sid);
})

module.exports = router;
