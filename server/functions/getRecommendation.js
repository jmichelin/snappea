var request_yelp = require('./request_yelp');

module.exports = function(requestObj,res,diners){ //account for multiple diners

	request_yelp(requestObj,function(yelpErr,yelpRes,yelpBody){
		if (yelpErr){
			console.log('error finding businesses');
			res.send(yelpErr);
		}
		var parsed = JSON.parse(yelpBody);
		var businesses = parsed.businesses;

		businesses.forEach(function(business) {
			console.log('business', business);
			business.weight = 0;
		})

		for (var i = 0; i < diners.length; i++) {
			businesses.forEach(function(business){ //for each biz
				var categories = business.categories; // obj of cat
				var sum = 0;
				categories.forEach(function(category){ //for each cat
					console.log('category', category);
					//second item in cat e.g. japanese vs. category[0] which is Japanese
					var categoryName = category[1];
					// for each user {categories: {<categoryoffood>: [<num of times selected>, <num of times seen>]}
					if (diners[i].categories[categoryName]){
						var numerator = diners[i].categories[categoryName][0];
						console.log("numerator:", numerator);
						var denominator = diners[i].categories[categoryName][1];
						console.log("denominator:", denominator);
						sum+=numerator/denominator;
						console.log("sum:", sum);
					}
				})
				var weight = Math.pow(sum/categories.length+1,4);
				console.log("weight:", weight);
				business.weight += weight;
				console.log("business.weight:", business.weight);
			});
		}
		businesses.forEach(function(business) {
			business.weight = business.weight/diners.length;
			console.log("business.weight:", business.weight);
		})

		var totalWeight = 0;
		businesses.forEach(function(business){
			totalWeight += business.weight;
			console.log('totalWeight', totalWeight);
		});
		//below returns recommendations in slightly shuffled way so as not to return same list everytime
		var recommendations = [];
		while (businesses.length) {
			var index = Math.random()*totalWeight;
			console.log("index:", index);
			var current = 0;
			for (var i=0; i<businesses.length; i++){
				console.log("current:", current);
				current+=businesses[i].weight;
				if (current>index) {
					//var chosen = businesses[i];
					break;
				}
			}
			totalWeight -= businesses[i].weight;
			recommendations.push(businesses.splice(i,1)[0]);
		};
		for (var i = 0; i < recommendations.length; i++) {
			if (recommendations[i].image_url) {
				recommendations[i].image_url = recommendations[i].image_url.slice(0, -6)+'o.jpg';
			}
		}
		res.json(recommendations);
	})

}
