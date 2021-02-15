// CAP 3  -  FUNCTIONS
// Defining a Function
// 1
const square = function(x) {
    return x * x;
};
console.log(square(12));
// ! 144


// 2
const makeNoise = function() {
    console.log("Pling!");
};
makeNoise();
// ! Pling!
const power = function(base, exponent) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};
console.log(power(2, 10));
// ! 1024


// Bindings and Scopes
// 3
let x = 10;
if (true) {
    let y = 20;
    var z = 30;
    console.log(x + y + z);
// ! 60
}
// y is not visible here
console.log(x + z);
// ! 40


// 4
const halve = function(n) {
    return n / 2;
    };
let n = 10;
console.log(halve(100));
// ! 50
console.log(n);
// ! 10


// Nested Scope
// 5
const hummus = function(factor) {
    const ingredient = function(amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += "s";
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
    };
    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
    ingredient(2, "tablespoon", "olive oil");
    ingredient(0.5, "teaspoon", "cumin");
};


// Functions as Values
//6
let launchMissiles = function() {
    missileSystem.launch("now");
};
if (safeMode) {
    launchMissiles = function() {/* do nothing */};
}


// Declaration Notation
// 7
function square(x) {
    return x * x;
}


// 8 
console.log("The future says:", future());
function future() {
    return "You'll never have flying cars";
}


// Arrow Functions
// 9
const power = (base, exponent) => {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};


// 10
const square1 = (x) => { return x * x; };
const square2 = x => x * x;


// 11
const horn = () => {
    console.log("Toot");
};


// The Call Stack
// 12
function greet(who) {
    console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");


// 13
function chicken() {
    return egg();
}
function egg() {
    return chicken();
}
console.log(chicken() + " came first.");
// ! ??


// Optional Arguments
// 14
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// ! 16


// 15
function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
}
console.log(minus(10));
// ! -10
console.log(minus(10, 5));
// ! 5


// 16
function power(base, exponent = 2) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
}
console.log(power(4));
// ! 16
console.log(power(2, 6));
// ! 64


// 17
console.log("C", "O", 2);
// ! C O 2


// Closure
// 18
function wrapValue(n) {
    let local = n;
    return () => local;
}
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// ! 1
console.log(wrap2());
// ! 2


// 19
function multiplier(factor) {
    return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
// ! 10


// Recursion
// 20
function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    } else {
        return base * power(base, exponent - 1);
    }
}
console.log(power(2, 3));
// ! 8


// 21
function findSolution(target) {
    function find(current, history) {
        if (current == target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
            return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}
console.log(findSolution(24));
// ! (((1 * 3) + 5) * 3)


// Growing Functions
// 22
function printFarmInventory(cows, chickens) {
    let cowString = String(cows);
    while (cowString.length < 3) {
        cowString = "0" + cowString;
    }
    console.log(`${cowString} Cows`);
    let chickenString = String(chickens);
    while (chickenString.length < 3) {
        chickenString = "0" + chickenString;
    }
    console.log(`${chickenString} Chickens`);
}
printFarmInventory(7, 11);


// 23
function printZeroPaddedWithLabel(number, label) {
    let numberString = String(number);
    while (numberString.length < 3) {
        numberString = "0" + numberString;
    }
    console.log(`${numberString} ${label}`);
    }
function printFarmInventory(cows, chickens, pigs) {
    printZeroPaddedWithLabel(cows, "Cows");
    printZeroPaddedWithLabel(chickens, "Chickens");
    printZeroPaddedWithLabel(pigs, "Pigs");
}
printFarmInventory(7, 11, 3);


// 24
function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}
function printFarmInventory(cows, chickens, pigs) {
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}
printFarmInventory(7, 16, 3);


// Summary
// 25
// Define f to hold a function value
const f = function(a) {
    console.log(a + 2);
};
// Declare g to be a function
function g(a, b) {
    return a * b * 3.5;
}
// A less verbose function value
let h = a => a % 3;


// Exercises
//Minimum
/*Chapter 2 introduced the standard function Math.min, which returns its smallest
argument (see “Return Values” on page 27). We can build something
like that now. Write a function min that takes two arguments and returns
their minimum.*/

function min_var1(a,b){
    console.log(Math.min(a,b));
}
console.log(min_var1(7,3));
console.log(min_var1(9,222));

/*__________________________________________________________________________*/
function min_var2(a,b){
    if(a < b){
        console.log(a);
    }else{
        console.log(b);
    }
}
console.log(min_var2(7,3));
console.log(min_var2(9,222));


//Recursion
/*We’ve seen that % (the remainder operator) can be used to test whether
a number is even or odd by using % 2 to see whether it’s divisible by two.
Here’s another way to define whether a positive whole number is even
or odd:
• Zero is even.
• One is odd.
• For any other number N, its evenness is the same as N 􀀀 2.
Define a recursive function isEven corresponding to this description.
The function should accept a single parameter (a positive, whole number)
and return a Boolean.
Test it on 50 and 75. See how it behaves on 􀀀1. Why? Can you think of a
way to fix this?*/

function isEven(a){
    if(a == 0){
        return console.log(a +  " is even", true);
    }
    if(a == 1){
        return console.log(a + " is odd", false);
    }
    if(a <0){
        return "??";
    }else {
        return isEven(a-2);
    }
}
console.log(isEven(-1));
console.log(isEven(50));
console.log(isEven(75));


// Bean Counting
/*You can get the Nth character, or letter, from a string by writing "string"[N].
The returned value will be a string containing only one character (for
example, "b"). The first character has position 0, which causes the last one
to be found at position string.length - 1. In other words, a two-character
string has length 2, and its characters have positions 0 and 1.
Write a function countBs that takes a string as its only argument and
returns a number that indicates how many uppercase “B” characters there
are in the string.
Next, write a function called countChar that behaves like countBs, except
it takes a second argument that indicates the character that is to be counted
(rather than counting only uppercase “B” characters). Rewrite countBs to
make use of this new function. */

function countBs(prop){
    let j = 0;
    for(let i = 0; i <= prop.length - 1; i++)
    {
        if(prop[i]=='B')
        {
            j++;   
        }
    }
    return console.log(prop + "   :   counting the character B is equal with   :   " + j);
}
let prop = "ThisB is a B proposition B meant to BeB";
console.log(countBs(prop));

/*__________________________________________________________________________*/
function countChars(syntax, char){
    let count = 0;
    for(let i = 0; i <= syntax.length - 1; i++)
    {
        if(syntax[i]==char)
        {
            count++;
        }
    }
    return console.log(syntax + "   :   counting the character   :   " + char + "   :   is equal with   :   " + count);
}
console.log(countChars(prop, "p"));

/*__________________________________________________________________________*/
function countBs_rewrite(prop){
    return countChars(prop, "B");
}
console.log(countBs_rewrite(prop));