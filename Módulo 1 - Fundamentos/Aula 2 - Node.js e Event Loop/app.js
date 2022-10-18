const { sum, sub, multi, div, mod, pow, root } = require('./modules/calc');
const isEven = require('./modules/evenTest');
const palindrome = require('./modules/palindromeTeste');

console.log(`Sum 1 and 2 = ${sum(1,2)}`);
console.log(`Sub 1 and 2 = ${sub(1,2)}`);
console.log(`Multi 1 and 2 = ${multi(1,2)}`);
console.log(`Div 1 and 2 = ${div(1,2)}`);
console.log(`Mod 1 and 2 = ${mod(1,2)}`);
console.log(`Pow 8^2 = ${pow(8,2)}`);
console.log(`Root 64^2 = ${root(64,2)}`);

console.log(`Is 2 even? Answer is: ${isEven(2)}`);

console.log(`Is Ana a palindrome? Answer is: ${palindrome('Ana')}`);