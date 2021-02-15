// CAP 1  -  VALUES, TYPES, AND OPERATORS
// Unary Operators
// 1
console.log(typeof 4.5)
// ! number
console.log(typeof "x")
// ! string


// 2
console.log(- (10 - 2))
// ! -8


// Boolean Values
// Comparison
// 3
console.log(3 > 2)
// ! true
console.log(3 < 2)
// ! false


// 4
console.log("Aardvark" < "Zoroaster")
// ! true


// 5
console.log("Itchy" != "Scratchy")
// ! true
console.log("Apple" == "Orange")
// ! false


// 6
console.log(NaN == NaN)
// ! false


// Logical Operators
// 7
console.log(true && false)
// ! false
console.log(true && true)
// ! true


// 8
console.log(false || true)
// ! true
console.log(false || false)
// ! false


// 9
console.log(true ? 1 : 2);
// ! 1
console.log(false ? 1 : 2);
// ! 2


// Automatic Type Conversion
// 10
console.log(8 * null)
// ! 0
console.log("5" - 1)
// ! 4
console.log("5" + 1)
// ! 51
console.log("five" * 2)
// ! NaN
console.log(false == 0)
// ! true


// 11
console.log(null == undefined);
// ! true
console.log(null == 0);
// ! false


// Short-Circuiting of Logical Operators
// 12
console.log(null || "user")
// ! user
console.log("Agnes" || "user")
// ! Agnes