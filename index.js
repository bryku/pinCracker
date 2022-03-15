var pinCracker = require('./pinCracker.js');


/* DOOR PIN
	Door Pins uses contain 4 digits.
	Each digit is between 0-9.

	This gives us a total of 4^10 or 10,000 potential pins.
*/
var pins = pinCracker(4, 9).done();
console.log('default',pins.length);

// We can narrow this down if we know additional information
var pins = pinCracker(4,9).contains([1]).done(); // remove any pins that don't contain: 1
console.log('contains',pins.length);

var pins = pinCracker(4,9).excludes([9]).done(); // remove any pins that contain: 1
console.log('excludes',pins.length);

var pins = pinCracker(4,9).startsWith(1).done(); // remove any pins that doesn't start with: 1
console.log('startsWith',pins.length);

var pins = pinCracker(4,9).endsWith(4).done(); // remove any pins that doesn't end with: 4
console.log('endsWith',pins.length);

var pins = pinCracker(4,9).matches({1: 4}).done(); // matches specific keys
console.log('matches',pins.length);


/*
	Imagine if we know someone has a 4 digit pin.
	We just so happen to learn that the pin contains 1,2,4 but we don't know the order.
	We also know that the pin starts with 1 and ends with 4.
	We even learn that the second digit is 2.
	Lastly we find out that digital 7,8,9 are broken.
	Using this information we can greatly reduce the possible pins.
*/

var pins = pinCracker(4,9).contains([1,2,4]).startsWith(1).endsWith(4).matches({1:2}).excludes([7,8,9]).done(); // matches specific keys
console.log('matches',pins.length);
/* Output
  [ 1, 2, 0, 4 ],
  [ 1, 2, 1, 4 ],
  [ 1, 2, 2, 4 ],
  [ 1, 2, 3, 4 ],
  [ 1, 2, 4, 4 ],
  [ 1, 2, 5, 4 ],
  [ 1, 2, 6, 4 ],
*/



/* Locker Combination
	Most MasterLocks use 3 digits between 0-39.
	This gives us 40^3 or 64,000 possible combinations.
*/
var combos = pinCracker(3,39).done();
	console.log(combos.length);

// Imagine if you know that all of the numbers are less than 10;
var combos = pinCracker(3,39).excludes([1,2,3,4,5,6,7,8,9]).done();
	console.log(combos.length); // 29,791 possible combos

// Imagine if you also knew that none of the numbers are greater than 30;
var combos = pinCracker(3,39)
	.excludes([1,2,3,4,5,6,7,8,9])
	.excludes([30,31,32,33,34,35,36,37,38,39,40])
	.done();
	console.log(combos.length); // 9,261 possible combos

// We can then further reduce the combinations if we know the first digit
var combos = pinCracker(3,39)
	.excludes([1,2,3,4,5,6,7,8,9])
	.excludes([30,31,32,33,34,35,36,37,38,39,40])
	.startsWith(10)
	.done();
	console.log(combos.length); // 441 possible combos

// If we happen to know another number,but don't know if it is the 2nd or 3rd, we can continue to reduce the combos.
	var combos = pinCracker(3,39)
	.excludes([1,2,3,4,5,6,7,8,9])
	.excludes([31,32,33,34,35,36,37,38,39,40])
	.startsWith(10)
	.contains([20])
	.done();
	console.log(combos.length); // 43 possible combos

