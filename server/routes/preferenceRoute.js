var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db');

router.delete('/',function(req,res){
    var username = req.body.username;
    console.log('username',username);
    db.User.findOne({username:username},function(err,user){
        if(err){
            console.log('err finding user');
            res.send(err);
        }
        else{
            console.log('found user');
            user.categories = {test:'test'};
            user.markModified('categories');
            user.save(function(err,user){
                console.log('updated user',user);
                res.json(user);
            })
        }
    })
})

router.put('/',function(req,res){
	var username = req.body.username;
	var selected = req.body.selected;
	var unselected = req.body.unselected;
  var multipliers = req.body.multipliers;
	console.log('username',username);
	console.log('selected',selected);
	console.log('unselected',unselected);

	db.User.findOne({username: username}, function(err, user){
      if (err) {
        console.log('err finding user');
        res.send(err);
      }
      else {
        console.log('found user', user);

        //takes each selected category and adds one to number of times selected and number of times seen
        selected.forEach(function(item){
        	var categoryName = item[0];
        	if (user.categories[categoryName]){
        		user.categories[categoryName][0]+=1;
        		user.categories[categoryName][1]+=1;
        	}
        	else {
        		user.categories[categoryName] = [1,1,1]; //[times selected, times seen, multiplier defaults at 1]
        	}
        });

        unselected.forEach(function(item){
        	var categoryName = item[0];
        	if (user.categories[categoryName]){
        		user.categories[categoryName][1]+=1;
        	}
        	else {
        		user.categories[categoryName] = [0,1,1];
        	}
        });

        // for(var key in user.categories){
        // 	var categoryName = user.categories[key][1];
        // 	user.categories[categoryName][2] = multipliers[categoryName];
        // }

        user.markModified('categories');
        user.save(function(err,user){
        	console.log('updated user:',user);
        	res.json(user);
        });
      }
    });

})

module.exports = router;
