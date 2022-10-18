const mod = require('./calc').mod;

function isEven(num) {
  modResult = mod(num, 2)

    if (modResult === 0) {
      return true
    }
}

module.exports = isEven