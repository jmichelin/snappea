var request_yelp = require('./request_yelp');

module.exports = function(requestObj,res,diners){ //account for multiple diners

	request_yelp(requestObj,function(yelpErr,yelpRes,yelpBody){
		console.log("+++| 6 | requestObj in getRecommendation: ", requestObj)
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
					console.log('categories', categories);
					console.log('category', category);
					//sets categoryName to uppercase category (e.g., category = ['Japanese', 'japanese']);
					var categoryName = category[0];
					// for each user {categories: {<categoryoffood>: [<num of times selected>, <num of times seen>, <multiplier>]}
					if (diners[i].categories[categoryName]){
						var numerator = diners[i].categories[categoryName][0] * diners[i].categories[categoryName][2];
						console.log("unweighted numerator:", diners[i].categories[categoryName][0]);
						console.log("multiplier:", diners[i].categories[categoryName][2]);
						console.log("numerator:", numerator);
						var denominator = diners[i].categories[categoryName][1];
						console.log("denominator:", denominator);
						console.log("previous sum:", sum);
						sum+=numerator/denominator;
						console.log("unweighted sum:", diners[i].categories[categoryName][0] / diners[i].categories[categoryName][1]);
						console.log("sum:", sum);
					}
				})
				console.log('categories.length', categories.length);
				var weight = Math.pow(sum/categories.length+1,2);
				console.log("weight:", weight);
				business.weight += weight;
				console.log("line 41 business.weight:", business.weight);
			});
		}
		businesses.forEach(function(business) {
			business.weight = business.weight/diners.length;
			console.log("line 46 business.weight:", business.weight);
		})

		var totalWeight = 0;
		businesses.forEach(function(business){
			totalWeight += business.weight;
			console.log('52 totalWeight', totalWeight);
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
				console.log("current:", current);
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
