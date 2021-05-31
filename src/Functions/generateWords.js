
module.exports = function(numWords) {
  // Using a react library 'react-words' to generate words
  var randomWords = require('random-words');

  // Join the words by space and return words
  var words = randomWords({exactly: numWords, join:' '});
  return words
} 

