// CAP 8  -  Bugs and Errors
// Strict mode
// 1
/*function canYouSpotTheProblem() {
    "use strict";
    for (counter = 0; counter < 10; counter++) {
      console.log("Happy happy");
    }
}
  
canYouSpotTheProblem();
// → ReferenceError: counter is not defined


// 2
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand


// 3
"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined


// Types
// 4
// (VillageState, Array) → {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
    // ...
}


// Testing
// 5
function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
  }
  
  test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
  });
  test("convert Greek text to uppercase", () => {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
  });
  test("don't convert case-less characters", () => {
    return "مرحبا".toUpperCase() == "مرحبا";
});


// Debugging
// 6
function numberToString(n, base = 10) {
    let result = "", sign = "";
    if (n < 0) {
      sign = "-";
      n = -n;
    }
    do {
      result = String(n % base) + result;
      n /= base;
    } while (n > 0);
    return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…


// Error propagation
// 7
function promptNumber(question) {
    let result = Number(prompt(question));
    if (Number.isNaN(result)) return null;
    else return result;
}
console.log(promptNumber("How many trees do you see?"));


// 8
function lastElement(array) {
    if (array.length == 0) {
      return {failed: true};
    } else {
      return {element: array[array.length - 1]};
    }
}


// Exceptions
// 9
function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new Error("Invalid direction: " + result);
  }
  
  function look() {
    if (promptDirection("Which way?") == "L") {
      return "a house";
    } else {
      return "two angry bears";
    }
  }
  
  try {
    console.log("You see", look());
  } catch (error) {
    console.log("Something went wrong: " + error);
}


// Cleaning up after exceptions
// 10
const accounts = {
    a: 100,
    b: 0,
    c: 20
  };
  
  function getAccount() {
    let accountName = prompt("Enter an account name");
    if (!accounts.hasOwnProperty(accountName)) {
      throw new Error(`No such account: ${accountName}`);
    }
    return accountName;
  }
  
  function transfer(from, amount) {
    if (accounts[from] < amount) return;
    accounts[from] -= amount;
    accounts[getAccount()] += amount;
}


// 11
function transfer(from, amount) {
    if (accounts[from] < amount) return;
    let progress = 0;
    try {
      accounts[from] -= amount;
      progress = 1;
      accounts[getAccount()] += amount;
      progress = 2;
    } finally {
      if (progress == 1) {
        accounts[from] += amount;
      }
    }
}


// Selective catching
// 12
for (;;) {
    try {
      let dir = promtDirection("Where?"); // ← typo!
      console.log("You chose ", dir);
      break;
    } catch (e) {
      console.log("Not a valid direction. Try again.");
    }
}


// 13
class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}


// 14
for (;;) {
    try {
      let dir = promptDirection("Where?");
      console.log("You chose ", dir);
      break;
    } catch (e) {
      if (e instanceof InputError) {
        console.log("Not a valid direction. Try again.");
      } else {
        throw e;
      }
    }
}


// Assertions
// 15
function firstElement(array) {
    if (array.length == 0) {
      throw new Error("firstElement called with []");
    }
    return array[0];
}
*/

// Exercises
// Retry
/* Say you have a function primitiveMultiply that in 20 percent of cases multiplies two numbers 
and in the other 80 percent of cases raises an exception of type MultiplicatorUnitFailure. 
Write a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result.
Make sure you handle only the exceptions you are trying to handle. */

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
    for(;;){
        try{ 
            return primitiveMultiply(a,b);
        } catch(e){
            if(!(e instanceof MultiplicatorUnitFailure))
            throw e;
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64


// The locked box
/*  It is a box with a lock. There is an array in the box, but you can get at it only when the box is unlocked. 
Directly accessing the private _content property is forbidden.Write a function called withBoxUnlocked that takes 
a function value as argument, unlocks the box, runs the function, and then ensures that the box is locked again 
before returning, regardless of whether the argument function returned normally or threw an exception. 
For extra points, make sure that if you call withBoxUnlocked when the box is already unlocked, the box stays unlocked.*/

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
  function withBoxUnlocked(body) {
    let locked = box.locked;
    if(!locked){
        return body;
    }
    box.unlock();

    try{
        return body;
    }finally {
        box.lock();
    }
  }
  
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });
  
  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised: " + e);
  }
  console.log(box.locked);
  console.log(box.unlock);
  console.log(box.withBoxUnlocked);

  // → true

