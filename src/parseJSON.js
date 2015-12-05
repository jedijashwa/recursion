// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

	// function for removing blank space from start and end
	var removeBlanks = function (string) {
		while (string.charAt(0) === (' ')|| string.charAt(0) === ('\n')|| string.charAt(0) === ('\t')|| string.charAt(0) === ('\r')){
			string = string.slice(1);
		}
		return string;
	};

	// function for finding the close of an array or object
	var findClose = function (string) {
		var open = string.charAt(0);
		if (open == '{') close = '}';
		else if (open == '[') close = ']';
		else throw new SyntaxError('findClose called for invalid type');
		if (string.indexOf(close) === undefined) throw new SyntaxError('findClose called for item that doesn\'t close');

		// remove frist open and replace with '.' to maintain string indexes
		string = string.replace(open, '.');

		// for everytime there is another open before the next close, replace both
		while ((string.indexOf(close) > string.indexOf(open)) && (string.indexOf(open) >= 0)) {
			string = string.replace(close, '.');
			string = string.replace(open, '.');
		}

		// returns next close, which should now close initial open,
		return string.indexOf(close);
	};

	// ensures json isn't starting or ending with a blank space
	json = removeBlanks(json);

	// handles arrays
	if (json.charAt(0) == '[') {
		// ensures array closes
		if (json.charAt(json.length - 1) != ']') throw new SyntaxError('Array doesn\'t close');
		// creates empty array for output
		var output = [];
		// ditches the opening of the array
		json = json.slice(1);
		// loops until no items remain
		while (json.charAt(0) != ']') {
			json = removeBlanks(json);
			// checks to see if next item is object or array
			if ((json.charAt(0) == ('[')) || (json.charAt(0) == ('{'))) {
				// parses item then pushes it to output array
				output.push(parseJSON(json.slice(0, findClose(json))));
				json = json.slice(findClose(json)+1);
			// checks to see if item is a string
			} else {
				if (json.indexOf(',') >= 0) {
					var stopIndex = json.indexOf(',');
					var nextIndex = stopIndex + 1;
				} else {
					var stopIndex = json.length - 1;
					var nextIndex = stopIndex;
				}
				output.push(parseJSON(json.slice(0, stopIndex)));
				json = json.slice(nextIndex);
			};
		};
		return output;
	// handles objects
	} else if (json.charAt(0) == '{') {
		// ensures object closes
		if (json.charAt(json.length - 1) != '}') throw new SyntaxError('Object doesn\'t close');
		// creates empty object for output
		var output = {};
		// ditches the opening and closing of the object
		json = json.slice(1);
		// loops until no items remain
//		while (json.charAt(0) != '}') {

//		};

	// handles if neither array nor object
	// needs to be updated for escaping
	} else if ((json.charAt(0) == '\'') || (json.charAt(0) == '\"')) {
		return json.slice(1, json.length-1);
	} else if (json === 'true') {
		return true;
	} else if (json === 'false') {
		return false;
	} else if (json === 'undefined') {
		return undefined;
	} else if (json === 'null') {
		return null;
	} else {
		return Number(json);
	};
};


/* first attempt failed....
  // your code goes here
  // holds the object to be output
  var jsonObject = {};
  // removes the first character which should be '{'
  if (json.charAt(0) == '{') { 
  	var jsonString = json.slice(1);
  // returns undefined and logs error if first character is not '{'
  } else {
//  	console.log("parseJSON() passed invalid argument");
  	return undefined;
  };
  // blank string for holding property name and empty property value
  var propName = "", propValue;
  // continues while current character isn't closing the object
  while (jsonString.charAt(0) != '}'){
  	// stores first character in remaining string for readablility
  	var firstChar = jsonString.charAt(0);

  	// throws out spaces
  	if (firstChar == (' '|"\n"|"\r"|"\t")) { 
  		jsonString = jsonString.slice(1);
  	} else {
 	 	// ensures property name is proceded by quotation mark
 		if (firstChar == ("\""|"\'")){
 			// drops off the first character
 			jsonString = jsonString.slice(1);
 			// defines propName as substring ending with quotation mark
 			propName = jsonString.slice(0, jsonString.indexOf(firstChar) - 1);
 		// returns undefined if property name isn't a string
 		} else return undefined;

 		// drops off already saved property name
 		jsonString.slice(jsonString.indexOf(firstChar) + 2);

 		// throws out spaces, tabs, and line breaks
 		while (jsonString.charAt(0) == (" "|"\n"|"\r"|"\t")) {
 			jsonString = jsonString.slice(1);
 		}; 

 		// checks to see if property is function
 		if (jsonString.slice(0,7) == "function") {

 		// checks to see if property is array
 		} else if (jsonString.charAt(0) == "[") {

 		// checks to see if property is object
 		} else if (jsonString.charAt(0) == "{") {

 		// checks to see if property is string
 		} else if (jsonString.charAt(0) == ("\""|"\'")) {
 			propValue = jsonString.slice(1, jsonString.indexOf(jsonString.charAt(0)) - 1);
 		} else {
 			propValue = 0;
 			propValue += jsonString.slice(0, jsonString.indexOf(",") - 1);
 		};

 		// addes property to output object
 		jsonObject[propName] = propValue;
 	};
  };
 */
