// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // declares variable json to hold output
  var json = '';
  // checks to see if object is array
  if (Array.isArray(obj)){
  	// starts JSON for array with '['
  	json += '[';
  	// add first element to json
  	console.log(obj[0]);
  	json += stringifyJSON(obj[0]);
  	// loop for adding all remaining elements of array
  	for (var index = 1; index < obj.length; index++){
  		console.log('17: ' + obj[index]);
  		console.log('18: ' + stringifyJSON(obj[index]));
  		json += ',' + stringifyJSON(obj[index]);
  	}
  	json += ']';
  	// checks for null value and adds null to json as string
  } else if (obj === null) {
  	json += 'null';
  	// checks for string and adds string to json in double quotes
  } else if (typeof obj == 'string') {
  	json += '\"' + obj + '\"';
  	// checks for number or bool and adds number or bool to json
  } else if (typeof obj == 'number' || typeof obj == 'boolean') {
  	json += obj;
  	// checks for undefined or function and ignores
  } else if (obj == undefined || typeof obj == 'function') {
  	// everything else should be an object and will be treates as such
  } else {
  	// adds starting bracket to json for object
  	json += '{';
  	// variable that indicates that object is empty
  	var empty = true;
  	// loops for all elements in object
  	for (var prop in obj){
  		// only runs if property isn't function or undefined unless it's null
  		if ((obj[prop] != undefined && typeof obj[prop] != 'function') || obj[prop] === null){
  			// writes property name to json in double quotes followed by collon
  			json += '\"' + prop + '\":';
  			// adds stringified version of property to json
  			json += stringifyJSON(obj[prop]) + ',';
  			empty = false;
  		};
  	};
  	// removes last comma and space from json if not an empty object;
  	if (!empty) json = json.slice(0, json.length - 1);
  	// adds closing bracket for object to json
  	json += '}';
  };
  console.log(json);
  return json;
};
