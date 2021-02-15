// CAP 6  -  THE SECRET LIFE OF OBJECTS
// Encapsulation - Methods
// 1
let rabbit = {};
rabbit.speak = function(line) {
console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I'm alive.");
// ! The rabbit says 'I'm alive.'


// 2
function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};
whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
// ! The white rabbit says 'Oh my ears and whiskers, how
// late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// ! The hungry rabbit says 'I could use a carrot right now.'


// 3
speak.call(hungryRabbit, "Burp!");
// ! The hungry rabbit says 'Burp!'


// 4
function normalize() {
    console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// ! [0, 0.4, 0.6]


// Prototypes
// 5
let empty = {};
console.log(empty.toString);
// ! function toString(){...}
console.log(empty.toString());
// ! [object Object]


// 6
console.log(Object.getPrototypeOf({}) == Object.prototype);
// ! true
console.log(Object.getPrototypeOf(Object.prototype));
// ! null


// 7
console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// ! true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// ! true


// 8
let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// ! The killer rabbit says 'SKREEEE!'


// Classes
// 9
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}


// 10
function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbit("weird");


// 11
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// ! true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// ! true


// Class Notation
// 12
class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}
let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

// 13
let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// ! hello


// Overriding Derived Properties
// 14
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// ! small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// ! long, sharp, and bloody
console.log(blackRabbit.teeth);
// ! small
console.log(Rabbit.prototype.teeth);
// ! small


// 15
console.log(Array.prototype.toString == Object.prototype.toString);
// ! false
console.log([1, 2].toString());
// ! 1,2


// 16
console.log(Object.prototype.toString.call([1, 2]));
// ! [object Array]


// Maps
// 17
let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
};
console.log(`Júlia is ${ages["Júlia"]}`);
// ! Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// ! Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// ! Is toString's age known? true


// 18
console.log("toString" in Object.create(null));
// ! false


// 19
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);
console.log(`Júlia is ${ages.get("Júlia")}`);
// ! Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// ! Is Jack's age known? false


console.log(ages.has("toString"));
// ! false


// 20
console.log({x: 1}.hasOwnProperty("x"));
// ! true
console.log({x: 1}.hasOwnProperty("toString"));
// ! false


// Polymorphism
// 21
Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));
// ! a black rabbit


// Symbols
// 22
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// ! false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// ! 55


// 23
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
return `${this.length} cm of blue yarn`;
};
console.log([1, 2].toString());
// ! 1,2
console.log([1, 2][toStringSymbol]());
// ! 2 cm of blue yarn


// 24
let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
// ! a jute rope


// The Iterator Interface
// 25
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// ! {value: "O", done: false}
console.log(okIterator.next());
// ! {value: "K", done: false}
console.log(okIterator.next());
// ! {value: undefined, done: true}


// 26
class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }
    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}


// 27
class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }
    next() {
        if (this.y == this.matrix.height) return {done: true};
        let value = {x: this.x,
        y: this.y,
        value: this.matrix.get(this.x, this.y)};
        this.x++;
            if (this.x == this.matrix.width) {
                this.x = 0;
                this.y++;
            }
        return {value, done: false};
    }
}


// 28
Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
};


// 29
let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
    for (let {x, y, value} of matrix) {
        console.log(x, y, value);
}
// ! 0 0 value 0,0
// ! 1 0 value 1,0
// ! 0 1 value 0,1
// ! 1 1 value 1,1


// Getters, Setters, and Statics
// 30
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
};
console.log(varyingSize.size);
// ! 73
console.log(varyingSize.size);
// ! 49


// 31
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}
let temp = new Temperature(22);
console.log(temp.fahrenheit);
// ! 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// ! 30


// Inheritance
// 32
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }
    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
            super.set(y, x, value);
        }
    }
}
let matrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix.get(2, 3));
// ! 3,2


// The instanceof Operator
// 33
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// ! true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// ! true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// ! false
console.log([1] instanceof Array);
// ! true


// Exercises
// A Vector Type
/*Write a class Vec that represents a vector in two-dimensional space. It takes
x and y parameters (numbers), which it should save to properties of the
same name.
Give the Vec prototype two methods, plus and minus, that take another
vector as a parameter and return a new vector that has the sum or difference
of the two vectors’ (this and the parameter) x and y values.
Add a getter property length to the prototype that computes the length
of the vector—that is, the distance of the point (x, y) from the origin (0, 0). */

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(v){
        return new Vec(this.x + v.x, this.y + v.y);
    }
    minus(v){
        return new Vec(this.x - v.x, this.y - v.y);
    }
    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5


// Groups
/*The standard JavaScript environment provides another data structure called
Set. Like an instance of Map, a set holds a collection of values. Unlike Map,
it does not associate other values with those—it just tracks which values
are part of the set. A value can be part of a set only once—adding it again
doesn’t have any effect.
Write a class called Group (since Set is already taken). Like Set, it has add,
delete, and has methods. Its constructor creates an empty group, add adds a
value to the group (but only if it isn’t already a member), delete removes its
argument from the group (if it was a member), and has returns a Boolean
value indicating whether its argument is a member of the group.
Use the === operator, or something equivalent such as indexOf, to determine
whether two values are the same.
Give the class a static from method that takes an iterable object as argument
and creates a group that contains all the values produced by iterating
over it.*/

class Group {
    constructor(){
        this.group = [];
    }
    has(item){
        return this.group.includes(item);
    }
    add(item){
        if(!this.group.includes(item)){
            this.group.push(item);
        }
    }
    delete(item){
        let index = this.group.indexOf(item);
        if (index !== -1) {
            this.group.splice(index, 1);
        }
    }
    static from(a) {
        let g = new Group();
        for (let item of a) {
          g.add(item);
        }
        return g;
      }
  }
  
let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false


// Iterable Groups
/*Make the Group class from the previous exercise iterable. Refer to the section
about the iterator interface earlier in the chapter if you aren’t clear on the
exact form of the interface anymore.
If you used an array to represent the group’s members, don’t just return
the iterator created by calling the Symbol.iterator method on the array. That
would work, but it defeats the purpose of this exercise.
It is okay if your iterator behaves strangely when the group is modified
during iteration.*/

class Group {
    constructor(){
        this.group = [];
    }
    has(item){
        return this.group.includes(item);
    }
    add(item){
        if(!this.group.includes(item)){
            this.group.push(item);
        }
    }
    delete(item){
        let index = this.group.indexOf(item);
        if (index !== -1) {
            this.group.splice(index, 1);
        }
    }
    static from(a) {
        let g = new Group();
        for (let item of a) {
          g.add(item);
        }
        return g;
      }
    [Symbol.iterator](){
        return new GroupIterator(this);
    }
  }

class GroupIterator{
    constructor(c){
        this.i = 0;
        this.group = c.group;
    }
    next(){
        if(this.i == this.group.length)
        return{done: true};
        let value = this.group[this.i];
        this.i++;
        return {value, done:false};
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c

// Borrowing a Method
/*Earlier in the chapter I mentioned that an object’s hasOwnProperty can be
used as a more robust alternative to the in operator when you want to ignore
the prototype’s properties. But what if your map needs to include the word
"hasOwnProperty"? You won’t be able to call that method anymore because the
object’s own property hides the method value.
Can you think of a way to call hasOwnProperty on an object that has its own
property by that name?*/

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
//console.log(map.hasOwnProperty("one"));
// → true

console.log(Object.prototype.hasOwnProperty(map,"one"));
// false
console.log(hasOwnProperty.call(map,"one"));
//true