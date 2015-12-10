// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	// Array to hold all elements found with className
	var elements =[];
	// Finds elements in HTML node and all of its children that are elements (nodeType 1)
	var findElementsWithClass = function (parent){
		// Checks to see if parent has className at all in it's classes
		if (parent.classList.contains(className)) {
			// Adds parent to elements array
			elements.push(parent);
		};
		// Loops through all children nodes that are elements
		for (var i = 0; i < parent.childNodes.length; i++) {
			// Checks to see if child node is element
			if (parent.childNodes[i].nodeType == 1){
				// Runs findElementsWithClass on each child node of parent
				findElementsWithClass(parent.childNodes[i]);
			};
		};
		return;
	};
	// Runs findElementsWithClass on the body, which recursivly goes through all
	// it's chiildren as well.
	findElementsWithClass(document.body);
	return elements;
};
