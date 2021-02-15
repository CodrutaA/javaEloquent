// CAP 4  -  DATA STRUCTURES:OBJECTS AND ARRAYS
// Data Sets
// 1
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// ! 5
console.log(listOfNumbers[0]);
// ! 2
console.log(listOfNumbers[2 - 1]);
// ! 3


//Properties
// 2
null.length;
// ! TypeError: null has no properties


// Methods
// 3
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// ! function
console.log(doh.toUpperCase());
// ! DOH


// 4
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// ! [1, 2, 3, 4, 5]
console.log(sequence.pop());
// ! 5
console.log(sequence);
// ! [1, 2, 3, 4]


// Objects
// 5
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
  };
console.log(day1.squirrel);
// ! false
console.log(day1.wolf);
// ! undefined
day1.wolf = false;
console.log(day1.wolf);
// ! false


// 6
let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};


// 7
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// ! 1
delete anObject.left;
console.log(anObject.left);
// ! undefined
console.log("left" in anObject);
// ! false
console.log("right" in anObject);
// ! true


// 8
console.log(Object.keys({x: 0, y: 0, z: 2}));
// ! ["x", "y", "z"]


// 9
let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);
// ! {a: 1, b: 3, c: 4}


// 10
let journal = [
  {events: ["work", "touched tree", "pizza",
  "running", "television"],
  squirrel: false},
  {events: ["work", "ice cream", "cauliflower",
  "lasagna", "touched tree", "brushed teeth"],
  squirrel: false},
  {events: ["weekend", "cycling", "break", "peanuts",
  "beer"],
  squirrel: true},
  /* and so on... */
];


// Mutability
// 11
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};
console.log(object1 == object2);
// ! true
console.log(object1 == object3);
// ! false
object1.value = 15;
console.log(object2.value);
// ! 15
console.log(object3.value);
// ! 10


// 12
const score = {visitors: 0, home: 0};
// This is okay
score.visitors = 1;
// This isn't allowed
score = {visitors: 1, home: 1};


// The Lycanthrope’s Log
// 13
let journal = [];
function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}


// 14
addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);


// Computing Correlation
// 15
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
  Math.sqrt((table[2] + table[3]) *
  (table[0] + table[1]) *
  (table[1] + table[3]) *
  (table[0] + table[2]));
}
console.log(phi([76, 9, 4, 1]));
// ! 0.068599434


// 16
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}
console.log(tableFor("pizza", JOURNAL));
// ! [76, 9, 4, 1]


// Array Loops
// 17
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}


// 18
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}


// The Final Analysis
// 19
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}
console.log(journalEvents(JOURNAL));
// ! ["carrot", "exercise", "weekend", "bread", ...]


// 20
for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)));
}
// ! carrot: 0.0140970969
// ! exercise: 0.0685994341
// ! weekend: 0.1371988681
// ! bread: -0.0757554019
// ! pudding: -0.0648203724
// and so on...


// 21
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// ! weekend: 0.1371988681
// ! brushed teeth: -0.3805211953
// ! candy: 0.1296407447
// ! work: -0.1371988681
// ! spaghetti: 0.2425356250
// ! reading: 0.1106828054
// ! peanuts: 0.5902679812


// 22
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")) {
  entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// ! 1


// Further Arrayology
// 23
let todoList = [];
function remember(task) {
	todoList.push(task);
}
function getTask() {
	return todoList.shift();
}
function rememberUrgently(task) {
	todoList.unshift(task);
}


// 24
console.log([1, 2, 3, 2, 1].indexOf(2));
// ! 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// ! 3


// 25
console.log([0, 1, 2, 3, 4].slice(2, 4));
// ! [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// ! [2, 3, 4]


// 26
function remove(array, index) {
	return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// ! ["a", "b", "d", "e"]


//Strings and Their Properties
// 27
let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// ! undefined


// 28
console.log("coconuts".slice(4, 7));
// ! nut
console.log("coconut".indexOf("u"));
// ! 5


// 29
console.log("one two three".indexOf("ee"));
// ! 11


// 30
console.log(" okay \n ".trim());
// ! okay


// 31
console.log(String(6).padStart(3, "0"));
// ! 006


// 32
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// ! ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// ! Secretarybirds. specialize. in. stomping


// 33
console.log("LA".repeat(3));
// ! LALALA


// 34
let string = "abc";
console.log(string.length);
// ! 3
console.log(string[1]);
// ! b


// Rest Parameters
// 35
function max(...numbers) {
	let result = -Infinity;
	for (let number of numbers) {
		if (number > result) result = number;
	}
	return result;
}
console.log(max(4, 1, 9, -2));
// ! 9


// 36
let numbers = [5, 1, 7];
console.log(max(...numbers));
// ! 7


// 37
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// ! ["will", "never", "fully", "understand"]


//The Math Object
// 38
function randomPointOnCircle(radius) {
	let angle = Math.random() * 2 * Math.PI;
	return {
		x: radius * Math.cos(angle),y: radius * Math.sin(angle)
	};
}
console.log(randomPointOnCircle(2));
// ! {x: 0.3667, y: 1.966}


// 39
console.log(Math.random());
// ! 0.36993729369714856
console.log(Math.random());
// ! 0.727367032552138
console.log(Math.random());
// ! 0.40180766698904335


// 40
console.log(Math.floor(Math.random() * 10));
// ! 2


// Destructuring
// 41
function phi(table) {
	return (table[3] * table[0] - table[2] * table[1]) /
	Math.sqrt((table[2] + table[3]) *
	(table[0] + table[1]) *
	(table[1] + table[3]) *
	(table[0] + table[2]));
}


// 42
function phi([n00, n01, n10, n11]) {
	return (n11 * n00 - n10 * n01) / Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));
}


// 43
let {name} = {name: "Faraji", age: 23};
console.log(name);
// ! Faraji


// JSON
// 44
// {
// 	"squirrel": false,
// 	"events": ["work", "touched tree", "pizza", "running"]
// }


// 45
let string = JSON.stringify({squirrel: false, events: ["weekend"]});
console.log(string);
// ! {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// ! ["weekend"]

// Exercises
// The Sum of a Range
/*The introduction of this book alluded to the following as a nice way to compute
the sum of a range of numbers:
console.log(sum(range(1, 10)));
Write a range function that takes two arguments, start and end, and
returns an array containing all the numbers from start up to (and including)
end.
Next, write a sum function that takes an array of numbers and returns the
sum of these numbers. Run the example program and see whether it does
indeed return 55.
As a bonus assignment, modify your range function to take an optional
third argument that indicates the “step” value used when building the array.
If no step is given, the elements go up by increments of one, corresponding
to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5,
7, 9]. Make sure it also works with negative step values so that range(5, 2, -1)
produces [5, 4, 3, 2]. */

function range (start, end, step = start <= end ? 1 : -1){
    let listElement = [];
    for(let i=start; step >= 0 ? i <= end : i >= end; i+=step){
        listElement.push(i);
    }
    return listElement;
    console.log(listElement);
}

function sum(listElements){
    let result = 0;
    for(let numbers of listElements){
        result = result + numbers;
    }
    return result;
    console.log(result);
}

console.log(range(1, 10));
console.log(range(1, 10, 2));
console.log(sum(range(1,10)));
console.log(sum(range(1, 10, 2)));

console.log(range(5, 2));
console.log(range(5, 2, -1));
console.log(sum(range(5, 2)));
console.log(sum(range(5, 2, -1)));


// Reversing an Array
/*Arrays have a reverse method that changes the array by inverting the
order in which its elements appear. For this exercise, write two functions,
reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array
as argument and produces a new array that has the same elements in the
inverse order. The second, reverseArrayInPlace, does what the reverse
method does: it modifies the array given as argument by reversing its elements.
Neither may use the standard reverse method.
Thinking back to the notes about side effects and pure functions in
“Functions and Side Effects” on page 54, which variant do you expect to be
useful in more situations? Which one runs faster?*/

function reverseArray(array){
    //The first, reverseArray, takes an arrayas argument and produces a new array that has the same elements in the inverse order.
    let result = [];
    for(let i = array.length-1; i >= 0 ; i--){
        result.push(array[i]);
    }
    return result;
    console.log(result);
}
console.log(reverseArray([1,2,3,4,5]));


function reverseArrayInPlace(){
    //The second, reverseArrayInPlace, does what the reversemethod does: it modifies the array given as argument by reversing its elements.
	let len = array.length;
	for (let i = 0; i < Math.floor(len/2); i++) {
	  console.log(i, len-i-1, array[i], array[len-i-1], array);
	  let swap = array[i];
	  array[i] = array[len-i-1];
	  array[len-i-1] = swap;
	}
	return array;
}
let arrayValue2 = [1, 2, 3, 4];
console.log(reverseArrayInPlace(arrayValue2));


// A List
/*Objects, as generic blobs of values, can be used to build all sorts of data
structures. A common data structure is the list (not to be confused with
array). A list is a nested set of objects, with the first object holding a reference
to the second, the second to the third, and so on.
let list = {
	value: 1,
	rest: {
		value: 2,
		rest: {
			value: 3,
			rest: null
		}
	}
};

A nice thing about lists is that they can share parts of their structure. For
example, if I create two new values {value: 0, rest: list} and {value: -1,
rest: list} (with list referring to the binding defined earlier), they are both
independent lists, but they share the structure that makes up their last three
elements. The original list is also still a valid three-element list.
Write a function arrayToList that builds up a list structure like the one
shown when given [1, 2, 3] as argument. Also write a listToArray function
that produces an array from a list. Then add a helper function prepend,
which takes an element and a list and creates a new list that adds the element
to the front of the input list, and nth, which takes a list and a number
Data Structures: Objects and Arrays 79
and returns the element at the given position in the list (with zero referring
to the first element) or undefined when there is no such element.
If you haven’t already, also write a recursive version of nth. */

let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
            }
        }
};
console.log(list);

function arrayToList(array){
    let result = {};
    if(Array.isArray(array)){
        let currListItem = result;
        for(let number of array){ 
                let newListItem = {
                    value: number,
                    rest: null
                };
            if(typeof currListItem.rest === 'undefined'){
                result = newListItem;
            }else{
                currListItem.rest = newListItem;
            }
            currListItem = newListItem;
        }
    }
    return result;
    console.log(result);
}

console.log(arrayToList([1,2,3]));


function listToArray(list){
    let array =[];
    if(typeof list === 'undefined' || list.value === undefined || list.rest === undefined){
        return array;
    } else {
        array.push(list.value);
        while(list.hasOwnProperty('rest') && list.rest !== null){
            list = list.rest;
            if(list.hasOwnProperty('value')){
                array.push(list.value);
            }
        }
    }
    return array;
}
console.log(listToArray({value: 1,rest: {value: 2,rest: {value: 3,rest: null}}}));
console.log(listToArray({value: 10, rest: {xxx: 20, yyy: null}}));


//  Deep Comparison
/*The == operator compares objects by identity. But sometimes you’d prefer to
compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true only if
they are the same value or are objects with the same properties, where the
values of the properties are equal when compared with a recursive call to
deepEqual.
To find out whether values should be compared directly (use the ===
operator for that) or have their properties compared, you can use the typeof
operator. If it produces "object" for both values, you should do a deep comparison.
But you have to take one silly exception into account: because of a
historical accident, typeof null also produces "object".
The Object.keys function will be useful when you need to go over the
properties of objects to compare them.*/

function deepEqual(a, b) {
	if (a === b) {
	  // items are identical
	  return true;
	} else if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
		// items are objects - do a deep property value compare
	  // join keys from both objects together in one array
	  let keys = Object.keys(a).concat(Object.keys(b));
	  // filter out duplicate keys
	  keys = keys.filter(
		function (value, index, self) { 
		  return self.indexOf(value) === index;
		}
	  );
	  for (p of keys) {
		if (typeof a[p] === 'object' && typeof b[p] === 'object') {
		  if (deepEqual(a[p], b[p]) === false) {
			return false;
		  }
		} else if (a[p] !== b[p]) {
		  return false;
		}
	  }
	  return true;
	} else {
	 return false; 
	}
}
  
  
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 0}));
console.log(deepEqual(obj, {here: {is: "another"}, object: 2}));
console.log(deepEqual(obj, {here: {isnt: "an"}, object: 2}));
console.log(deepEqual(obj, {here: {is: "an", deep: {poop: null, value: -1}}, object: 2}));

let json = '{"candidate": "Jon Urry", "job": "Junior Full-Stack JavaScript Developer", "portfolio": "jon.urry.me", "skills": ["HTML", "CSS", "JavaScript", "ES6", "Node", "React", "Vue", "Git", "XML", "UX", "Responsive Design", "Design Patterns", "TDD", "Chrome Inspector", "Agile", "SEO", "Analytics", "WordPress", "Databases"], "contact": [{"email": "mailto:jon@urry.me"}, {"github": "github.com/jonurry"}, {"linkedin": "linkedin.com/in/jonurry"}, {"mobile": "tel:+44-7986-371-299"}, {"skype": "skype:jonurry"}, {"twitter": "twitter.com/jonurry"}]}';
let json2 = '{"candidate": "Jon Urry", "job": "Junior Full-Stack JavaScript Developer", "portfolio": "jon.urry.me", "skills": ["HTML", "CSS", "JavaScript", "ES6", "Node", "React", "Vue", "Git", "XML", "UX", "Responsive Design", "Design Patterns", "TDD", "Chrome Inspector", "Agile", "SEO", "Analytics", "WordPress", "Databases2"], "contact": [{"email": "mailto:jon@urry.me"}, {"github": "github.com/jonurry"}, {"linkedin": "linkedin.com/in/jonurry"}, {"mobile": "tel:+44-7986-371-299"}, {"skype": "skype:jonurry"}, {"twitter2": "twitter.com/jonurry2"}]}';
let jsonObj = JSON.parse(json);
let jsonObjCopy = JSON.parse(JSON.stringify(jsonObj));
let jsonObj2 = JSON.parse(json2);

console.log(jsonObj);
console.log(deepEqual(jsonObj, jsonObj));
console.log(deepEqual(jsonObj, jsonObjCopy));
console.log(deepEqual(jsonObj, jsonObj2));
console.log(deepEqual(null, obj));
console.log(deepEqual(obj, null));
console.log(deepEqual(null, null));