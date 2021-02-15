// CAP 2  -  PROGRAM STRUCTURE
// Bindings
// 1
let caught = 5 * 5;

// 2
let ten = 10;
console.log(ten * ten);
// ! 100


// 3 
let mood = "light";
console.log(mood);
// ! light
mood = "dark";
console.log(mood);
// ! dark


// 4
let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt);
// ! 105


// 5
let one = 1, two = 2;
console.log(one + two);
// ! 3


// 6
var name = "Ayda";
const greeting = "Hello ";
console.log(greeting + name);
// ! Hello Ayda


// Functions
// 7
prompt("Enter passcode");


// Return Values
// 8
console.log(Math.max(2, 4));
// ! 4


// 9
console.log(Math.min(2, 4) + 100);
// ! 102


// Control flow
// 10
let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " +
theNumber * theNumber);


// Conditional Execution
// 11
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
    console.log("Your number is the square root of " + theNumber * theNumber);
}


// 12
if (1 + 1 == 2) console.log("It's true");
// ! It's true


// 13
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
    console.log("Your number is the square root of " + theNumber * theNumber);
} else {
    console.log("Hey. Why didn't you give me a number?");
}


// 14
let num = Number(prompt("Pick a number"));
if (num < 10) {
    console.log("Small");
} else if (num < 100) {
    console.log("Medium");
} else {
    console.log("Large");
}


// While and do loops
// 15
console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);


// 16
let number = 0;
while (number <= 12) {
console.log(number);
number = number + 2;
}
// ! 0
// ! 2
// ... etcetera


// 17
let result = 1;
let counter = 0;
while (counter < 10) {
    result = result * 2;
    counter = counter + 1;
}
console.log(result);
// ! 1024


// 18
let yourName;
do {
    yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);


// Indenting Code
// 19
if (false != true) {
    console.log("That makes sense.");
    if (1 < 2) {
        console.log("No surprise there.");
    }
}


// for Loops
// 20
for (let number = 0; number <= 12; number = number + 2) {
    console.log(number);
}
// ! 0
// ! 2
// ... etcetera


// 21
let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
result = result * 2;
}
console.log(result);
// ! 1024


// Breaking Out of a Loop
// 22
for (let current = 20; ; current = current + 1) {
    if (current % 7 == 0) {
        console.log(current);
        break;
    }
}
// ! 21


// Updating Bindings Succinctly
// 23
// counter = counter + 1;
// counter += 1;
for (let number = 0; number <= 12; number += 2) {
    console.log(number);
}


// Dispatching on a Value with switch
// 24
if (x == "value1") action1();
else if (x == "value2") action2();
else if (x == "value3") action3();
else defaultAction();


// 25
switch (prompt("What is the weather like?")) {
    case "rainy":
        console.log("Remember to bring an umbrella.");
        break;
    case "sunny":
        console.log("Dress lightly.");
    case "cloudy":
        console.log("Go outside.");
        break;
    default:
        console.log("Unknown weather type!");
        break;
}


// Comments
// 26
let accountBalance = calculateBalance(account);
// It's a green hollow where a river sings
accountBalance.adjust();
// Madly catching white tatters in the grass.
let report = new Report();
// Where the sun on the proud mountain rings:
addToReport(accountBalance, report);
// It's a little valley, foaming like light in a glass.



// Exercises
// Looping a Triangle
/*Write a loop that makes seven calls to console.log to output the following
triangle:
#
##
###
####
#####
######
#######
It may be useful to know that you can find the length of a string by writing
.length after it.
let abc = "abc";
console.log(abc.length);
// ! 3 */

let j = '';
let si = '#######';
for(let i = 1; i <= si.length; i++){
    j = j + "#";
    console.log(j);
}


// FizzBuzz
/*Write a program that uses console.log to print all the numbers from 1 to 100,
with two exceptions. For numbers divisible by 3, print "Fizz" instead of the
number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
When you have that working, modify your program to print "FizzBuzz"
for numbers that are divisible by both 3 and 5 (and still print "Fizz" or
"Buzz" for numbers divisible by only one of those).
(This is actually an interview question that has been claimed to weed out
a significant percentage of programmer candidates. So if you solved it, your
labor market value just went up.)*/

for(let i = 1; i <= 100; i++){
    if(i % 3 == 0 && i % 5 == 0){
        console.log("FizzBuzz");
    }else if(i % 3 == 0){
        console.log("Fizz");
    } else if(i % 5 == 0){
        console.log("Buzz");
    }else {
        console.log(i);
    }
}

// Chessboard
/*Write a program that creates a string that represents an 88 grid, using newline
characters to separate lines. At each position of the grid there is either a
space or a # character. The characters should form a chessboard.
Passing this string to console.log should show something like this:
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
When you have a program that generates this pattern, define a binding
size = 8 and change the program so that it works for any size, outputting a
grid of the given width and height. */

let size = 9;
let x = "# # # #";
let y = " # # # #";
for(let i = 1; i <= size; i++){
    if(i % 2 == 0){
        console.log(x);
    }else {
        console.log(y);
    }
}