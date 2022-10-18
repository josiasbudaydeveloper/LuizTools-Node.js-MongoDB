function isPalindrome(text) {
  var text = text.trim()
  text = text.toLowerCase()

  // breaking in separeted characters
  var textReverse = text.split('')
  textReverse = textReverse.reverse()
  textReverse = textReverse.join('')

  if (text === textReverse) {
    return true
  }

  return false
}

module.exports = isPalindrome;