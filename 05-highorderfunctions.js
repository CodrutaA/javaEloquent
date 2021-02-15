// CAP 5  -  HIGHER-ORDER FUNCTIONS
// 1
let total = 0, count = 1;
while (count <= 10) {
	total += count;
	count += 1;
}
console.log(total);


// 2
console.log(sum(range(1, 10)));


// Abstracting Repetition
// 3
for (let i = 0; i < 10; i++) {
	console.log(i);
}


// 4
function repeatLog(n) {
	for (let i = 0; i < n; i++) {
		console.log(i);
	}
}


// 5
function repeat(n, action) {
	for (let i = 0; i < n; i++) {
		action(i);
	}
}
repeat(3, console.log);
// ! 0
// ! 1
// ! 2


// 6
let labels = [];
repeat(5, i => {
	labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// ! ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]


//Higher-Order Functions
// 7
function greaterThan(n) {
	return m => m > n;
	}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// ! true


// 8
function noisy(f) {
	return (...args) => {
	console.log("calling with", args);
	let result = f(...args);
	console.log("called with", args, ", returned", result);
	return result;
	};
}
noisy(Math.min)(3, 2, 1);
// ! calling with [3, 2, 1]
// ! called with [3, 2, 1] , returned 1


// 9
function unless(test, then) {
	if (!test) then();
}
repeat(3, n => {
	unless(n % 2 == 1, () => {
		console.log(n, "is even");
	});
});
// ! 0 is even
// ! 2 is even


// 10
["A", "B"].forEach(l => console.log(l));
// ! A
// ! B


//Script Data Set
// 11
// {
// 	name: "Coptic",
// 	ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
// 	direction: "ltr",
// 	year: -200,
// 	living: false,
// 	link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
// }


// Filtering Arrays
// 12
function filter(array, test) {
	let passed = [];
	for (let element of array) {
		if (test(element)) {
			passed.push(element);
		}
	}
	return passed;
}
console.log(filter(SCRIPTS, script => script.living));
// ! [{name: "Adlam", ...}, ...]


// 13
console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// ! [{name: "Mongolian", ...}, ...]


// Transforming with map
// 14
function map(array, transform) {
	let mapped = [];
	for (let element of array) {
		mapped.push(transform(element));
	}
	return mapped;
}
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// ! ["Adlam", "Arabic", "Imperial Aramaic", ...]


// Summarizing with reduce
// 15
function reduce(array, combine, start) {
	let current = start;
	for (let element of array) {
		current = combine(current, element);
	}
	return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// ! 10


// 16
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// ! 10


// 17
function characterCount(script) {
	return script.ranges.reduce((count, [from, to]) => {
		return count + (to - from);
	}, 0);
}
console.log(SCRIPTS.reduce((a, b) => {
	return characterCount(a) < characterCount(b) ? b : a;
}));
// ! {name: "Han", ...}


// Composability
// 18
let biggest = null;
for (let script of SCRIPTS) {
	if (biggest == null || characterCount(biggest) < characterCount(script)) {
		biggest = script;
	}
}
console.log(biggest);
// ! {name: "Han", ...}


// 19
function average(array) {
	return array.reduce((a, b) => a + b) / array.length;
	}
console.log(Math.round(average(
	SCRIPTS.filter(s => s.living).map(s => s.year))));
// ! 1188
console.log(Math.round(average(
	SCRIPTS.filter(s => !s.living).map(s => s.year))));
// ! 188


// 20
let total = 0, count = 0;
for (let script of SCRIPTS) {
	if (script.living) {
		total += script.year;
		count += 1;
	}
}
console.log(Math.round(total / count));
// ! 1188


// Strings and Character Codes
// 21
function characterScript(code) {
	for (let script of SCRIPTS) {
		if (script.ranges.some(([from, to]) => {
			return code >= from && code < to;
	})) {
		return script;
		}
	}
	return null;
}
console.log(characterScript(121));
// ! {name: "Latin", ...}


// 22
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character)
console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)


// 23
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
	console.log(char);
}
// → 🌹
// → 🐉


// Recognizing Text
// 24
function countBy(items, groupName) {
	let counts = [];
	for (let item of items) {
		let name = groupName(item);
		let known = counts.findIndex(c => c.name == name);
		if (known == -1) {
			counts.push({name, count: 1});
		} else {
			counts[known].count++;
		}
	}
	return counts;
}
console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// ! [{name: false, count: 2}, {name: true, count: 3}]


// 25
function textScripts(text) {
	let scripts = countBy(text, char => {
		let script = characterScript(char.codePointAt(0));
		return script ? script.name : "none";
	}).filter(({name}) => name != "none");
	let total = scripts.reduce((n, {count}) => n + count, 0);
	if (total == 0) return "No scripts found";
		return scripts.map(({name, count}) => {
			return `${Math.round(count * 100 / total)}% ${name}`;
		}).join(", ");
	}
console.log(textScripts('􀓳􀠃􀰤􀛡 "woof", 􀕤 􀢩􀰤􀛡, "тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic


// Exercises
// Flatening
let arrays = [[3,7],[2,6],[8,9,10]];
function reduce(array, combine, start) {
    let current = start;
        for (let element of array) {
            current = combine(current, element);
        }
    return current;
}

let oneArray = arrays.reduce((array1,array2) => array1.concat(array2));
console.log(oneArray);

console.log(oneArray.sort(function(a, b){return a-b}));

function orderArray(array){
    let aux;
    for(let i = 0; i <= array.length-1; i++){
        for(let j = i; j <= array.length; j++){
            if(array[j] < array[i]){
                aux = array[i];
                array[i] = array[j];
                array[j] = aux;
            }
        }
    }
    return array;
}

console.log(orderArray(oneArray));


// Your Own Loop
function loop(value, test, update, body) {
    for (let i = value; test(i); update(i)) {
      body(i)
    }
  }
//for(let i = 0; i<=n; i++)
let i = 10;
let n = 3;

loop(i , n => n > 0 , n => n-1 , console.log(n));


// Everything
function every(array, test) {
   return array.some(test);
}

let array = [3, 2, 5];
let number = 10;
console.log("Everything function using some method has an array: ", array," with operation >=",number, " and returns: ", every(array, n => n >= 10));
console.log("Everything function using some method has an array: ", array," with operation <=",number, " and returns: ", every(array, n => n <= 10));

function everyLoop(array, test) {
    for(let number of array){
        if(test(number)===false){
            return false;
        }
    }
    return true;
}

console.log("Everything function using loop method has an array: ", array," with operation >=",number, " and returns: ", every(array, n => n >= 10));
console.log("Everything function using loop method has an array: ", array," with operation <=",number, " and returns: ", every(array, n => n <= 10));


// Dominant Writing Direction
function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => code >= from && code < to)) {
        return script;
      }
    }
    return null;
  }

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex(c => c.name == name);
      if (known == -1) {
        counts.push({name, count: 1});
      } else {
        counts[known].count++;
      }
    }
    return counts;
}

function dominantDirection(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
    switch (scripts.length) {
      case 0:
        return 'no dominant direction found';
      case 1:
        return scripts[0].name;
      default:
        if (scripts.reduce((acc, cur) => acc.count === cur.count)) {
          return 'no dominant direction found';
        } else {
          return scripts.reduce((acc, cur) => acc.count >= cur.count ? acc.name : cur.name);
        }
    }
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
console.log(dominantDirection(""));
// → no dominant direction found
console.log(dominantDirection("Heyخير"));
// → no dominant direction found