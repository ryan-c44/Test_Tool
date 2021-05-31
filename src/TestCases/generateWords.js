var generateWords = require("../Functions/generateWords.js")
var assert = require ("chai").assert;

describe ("Test generateWords Function", function() {
  describe ("Test with input", function () {
    it("Should return a String", function () {
      let result = generateWords(5);
      assert.typeOf(result, 'string');
    })
    it("Is not null nor undefined", function () {
      let result = generateWords(5);
      assert.exists(result, 'result is neither `null` nor `undefined`');
    })
    it("Should return correct amount of words separated by spaces", function () {
      let result = generateWords(5).split(" ");
      assert.lengthOf(result, 5)
    })
  })
  describe ("Test without input", function () {
    it("Should return a String", function () {
      let result = generateWords();
      assert.typeOf(result, 'string');
    })
    it("Is not null nor undefined", function () {
      let result = generateWords();
      assert.exists(result, 'result is neither `null` nor `undefined`');
    })
  })
});
