// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	// array to hold all elements found
	var elements =[];
	// finds elements in HTML node and all of its children that are elements (nodeType 1)
	var findElementsWithClass = function (parent, className){
		// checks to see if parent has className
		if (parent['className'].indexOf(className) >= 0 ){
			elements.push(parent);
		};
		for (var i = 0; i < parent.children.length; i++) {
			findElementsWithClass(parent.children[i], className);
		};
		return;
	};
	findElementsWithClass(document.body, className);
	return elements;
};
