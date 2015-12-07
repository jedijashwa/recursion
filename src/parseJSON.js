// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

	// function for removing blank space from start and end
	var removeBlanks = function (string) {
		// loops until first character of string is not blank space
		while (string.charAt(0) === ' '|| string.charAt(0) === '\n'|| string.charAt(0) === '\t'|| string.charAt(0) === '\r'){
			// removes first character of string
			string = string.slice(1);
		}
		// defines lastIndex of string for easier readability
		var lastIndex = string.length - 1;
		// loops until last character of string is not blank space
		while (string.charAt(lastIndex) === ' ' || string.charAt(lastIndex) === '\n' || string.charAt(lastIndex) === '\t' || string.charAt(lastIndex) === '\r'){
			// removes last character
			string = string.slice(0, lastIndex);
		}
		return string;
	};

	// function for finding the close of an array or object
	var findClose = function (string) {
		// looks for first character
		var open = string.charAt(0);
		// defines close based on first character
		if (open == '{') close = '}';
		else if (open == '[') close = ']';
		// throws error if first character isn't an open
		else throw new SyntaxError('findClose called for invalid type');
		// throws error if proper close isn't found
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

	// function for removing backslashes properly from strings
	var removeBackslash = function (string){
		var fixed = '';	
		while (string.indexOf('\\') >=0) {
		    // Finds index of backslash
		    backIndex = string.indexOf('\\')
		    // Adds string up to index of backslash plus the following character
		    fixed += string.slice(0, backIndex) + string.slice(backIndex+1, backIndex+2);
		    // Removes everyhint thats been handed from string
		    string = string.slice(backIndex+2);
		};
  		fixed += string;
  		return fixed;
	};

	// ensures json isn't starting or ending with a blank space
	json = removeBlanks(json);

	// handles arrays
	if (json.charAt(0) == '[') {
		// removes blanks
		json = removeBlanks(json);
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
				output.push(parseJSON(json.slice(0, findClose(json) + 1)));
				// removes already parsed item from json
				json = json.slice(findClose(json)+1);
				// if new json string starts with comma, removes comma
				if (json.charAt(0) === ',') json = json.slice(1);
			} else {
				// checks to see if this is the last item
				if (json.indexOf(',') > 0) {
					// sets where to stop
					var stopIndex = json.indexOf(',');
					// sets where new string will start
					var nextIndex = stopIndex + 1;
				} else {
					// acts as above but with different values for last item
					var stopIndex = json.length - 1;
					var nextIndex = stopIndex;
				}
				// parses current item
				var item = parseJSON(removeBlanks(json.slice(0, stopIndex)));
				// pushes item to output array if item isn't null
				if (removeBlanks(json.slice(0, stopIndex)) !== ''){
					output.push(item);
				};
				// removes item from json
				json = json.slice(nextIndex);
			};
		};
		return output;

	// handles objects
	} else if (json.charAt(0) == '{') {
		// removes blanks
		json = removeBlanks(json);
		// ensures object closes
		if (json.charAt(json.length - 1) != '}') throw new SyntaxError('Object doesn\'t close');
		// creates empty object for output and empty propName
		var output = {};
		var propName = '';
		// ditches the opening of object
		json = json.slice(1);
		// loops until no items remain
		while (json.charAt(0) != '}') {
			json = removeBlanks(json);
			// sets property name
			propName = json.slice(0, json.indexOf(':'))
			propName = removeBlanks(propName);
			propName = propName.slice(1, propName.length - 1);
			// removes property name from json
			json = json.slice(json.indexOf(':') + 1);
			json = removeBlanks(json);
			// now works exactly as array above
			// checks to see if next item is object or array
			if ((json.charAt(0) == ('[')) || (json.charAt(0) == ('{'))) {
				// parses item then pushes it to output object
				output[propName] = (parseJSON(json.slice(0, findClose(json)+1)));
				json = json.slice(findClose(json)+1);
				if (json.charAt(0) === ',') json = json.slice(1);
			} else {
				if (json.indexOf(',') >= 0) {
					var stopIndex = json.indexOf(',');
					var nextIndex = stopIndex + 1;
				} else {
					var stopIndex = json.length - 1;
					var nextIndex = stopIndex;
				}
				var item = parseJSON(removeBlanks(json.slice(0, stopIndex)));
				if (propName !== '') {
					output[propName] = item;
				};
				json = json.slice(nextIndex);
			};		
		};
		return output;

	// handles if neither array nor object
	// needs to be updated for escaping
	} else if ((json.charAt(0) == '\'') || (json.charAt(0) == '\"')) {
		return removeBackslash(json.slice(1, json.length-1));
	} else if (json === 'true') {
		return true;
	} else if (json === 'false') {
		return false;
	} else if (json === 'undefined') {
		return undefined;
	} else if (json === 'null' || json === '') {
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
