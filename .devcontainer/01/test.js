"use strict"
console.log("Nandani");
const accountID=1445533;
let accountEmail= "nandani@gmail.com";
console.table([accountID,accountEmail]);

//type of 

console.log(typeof(null));//object
console.log(typeof(undefined));//undefined

let BlankValue=null;
let NoValue;
console.table([BlankValue,NoValue]);

//type conversion

let score="33"
let valueInNumber=Number(score);
console.log(typeof(valueInNumber));
let a="34abc"
let aInNumber=Number(a);

console.log(aInNumber);//NaN

//strict checking, it checks data type also

console.log("2"===2);//false

//non strict checking, it is not checking data type, it typecast the variable and then check it

console.log("2"=2)//true

