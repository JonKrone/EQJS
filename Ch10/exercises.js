var months = function() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July",
										"August", "September", "October", "November", "December"];
  var exports = {};

  return {
  	byName: function(name) { return monthNames.indexOf(name); },
	  byNumber: function(number) { return monthNames[number]; }
  };
}();
console.log(months.byNumber(2));
console.log(months.byName("November"));

/*

Critters:
Plant
PlantEater
SmartPlantEater
Tiger
WallFollower
Wall
BouncingCritter


Map:
World
LifelikeWorld
View
randomElement
elementFromChar
charFromElement


Grid:
Vector
Grid
directions
directionNames
dirPlus