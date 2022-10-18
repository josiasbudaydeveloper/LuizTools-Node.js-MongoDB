/**
 * Calculates the first parameter + the second parameter
 * @param num1 first value
 * @param num2 second value
 * @returns num1 + num2
 */
function sum(num1, num2) {
  return num1 + num2
}

/**
 * Calculates the first parameter - the second parameter
 * @param num1 first value
 * @param num2 second value
 * @returns num1 - num2
 */
function sub(num1, num2) {
  return num1 - num2
}

/**
 * Calculates the first parameter * the second parameter
 * @param num1 first value
 * @param num2 second value
 * @returns num1 * num2
 */
function multi(num1, num2) {
  return num1 * num2
}

/**
 * Calculates the first parameter / the second parameter
 * @param num1 dividend
 * @param num2 divisor
 * @returns num1 / num2
 */
function div(dividend, divisor) {
  return dividend / divisor
}

/**
 * Calculates the remainder of the division of the first parameter to the second parameter
 * @param num1 divident
 * @param num2 divisor
 * @returns remainder of num1 / num2
 */
function mod(dividend, divisor) {
  return dividend % divisor
}

/**
 * Calculates the power of the second parameter on the base of the first parameter
 * @param num1 base of the power
 * @param num2 exponent of the power
 * @returns base^exponent (also known as num1**num2)
 */
function pow(base, exponent) {
  return Math.pow(base, exponent)
}

/**
 * Calculates the root of a number in a power
 * @param number
 * @param power
 * @returns the number that multiplied the informed power times will become that informed number
 */
function root(number, power) {
  return number**(1/power);
}

module.exports = { sum, sub, multi, div, mod, pow, root }