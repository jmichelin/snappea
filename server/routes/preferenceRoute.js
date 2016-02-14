var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db');
var topCategories = require('../topCategories');

router.get('/', function(req,res) {
  var username = req.query.username;
  console.log('line 8 username', username);
  db.User.findOne({username:username},function(err,user){
    if(err){
      console.log('err finding user');
      res.send(err);
    }else{
      console.log('line 13 user.topCategories', user.topCategories);
      res.json(user.topCategories);
    }
  });
});

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
      user.topCategories = topCategories;
      user.markModified('categories');
      user.markModified('topCategories');
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
  var category = req.body.category;
  var multiplier = req.body.multiplier;
  console.log('username',username);
  console.log('selected',selected);
  console.log('unselected',unselected);
  console.log("category:", category);
  console.log("multiplier:", multiplier);

  db.User.findOne({username: username}, function(err, user){
    if (err) {
      console.log('err finding user');
      res.send(err);
    }
    else {
      console.log('found user', user);

      //if a category is liked or disliked, multiplier is set to 2 or 0 respectively
      if(category) {
        user.topCategories.forEach(function(categoryObj) {
          if(categoryObj.name === category) {
            categoryObj.multiplier = multiplier;
            if (user.categories[category]){
              user.categories[category][2] = multiplier;
            }
            else if(multiplier === 2){
              user.categories[category] = [1,1,2]; //default for liked category if not yet selected by user
            }
            else if(multiplier === 0) {
              user.categories[category] = [0,1,0]; //default for disliked category if not yet unselected by user
            }
          }
        });
        user.markModified('topCategories');
        user.markModified('categories');
      }

      //takes each selected category and adds one to number of times selected and number of times seen
      if(selected) {

        selected.forEach(function(item){
          var categoryName = item[0];
          if (user.categories[categoryName]){
            user.categories[categoryName][0]+=1;
            user.categories[categoryName][1]+=1;
          }
          else {
            user.categories[categoryName] = [1,1,1]; //[times selected, times seen, multiplier for topCategories defaults at 1
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

          user.markModified('categories');
        }

        user.save(function(err,user){
          console.log('updated user:',user);
          res.json(user);
        });
      }
    });

  })

  module.exports = router;
