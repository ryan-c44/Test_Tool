var oracle = require("../Functions/oracle.js")
var assert = require("chai").assert;

var testValues = [{ val: "action", count: 3 }, { val: "bone", count: 3 }, { val: "characteristic", count: 3 },
{ val: "cookies", count: 3 }, { val: "hidden", count: 3 }, { val: "series", count: 3 }, { val: "shinning", count: 3 },
{ val: "trunk", count: 3 }, { val: "appearance", count: 2 }, { val: "bad", count: 2 }]

var altTestValues = [{ val: "capital", count: 5 }, { val: "therefore", count: 5 }, { val: "outside", count: 4 },
{ val: "regular", count: 4 },{ val: "strike", count: 4 }, { val: "whatever", count: 4 },{ val: "affect", count: 3 },
{ val: "blood", count: 3 },{ val: "bright", count: 3 },{ val: "divide", count: 3 }]

describe("Test oracle Function", function () {
  describe("Test with input", function () {
    it("Should return a boolean value", function () {
      let result = oracle(testValues, testValues);
      assert.typeOf(result, 'boolean');
    })
    it("Should not return null nor undefined", function () {
      let result = oracle(testValues, testValues);
      assert.exists(result, 'result is neither `null` nor `undefined`');
    })
    describe("Test with equal values", function () {
      it("Should Return True", function () {
        let result = oracle(testValues, testValues);
        assert.equal(result, true);
      })
    })
    describe("Test with different values", function () {
      it("Should Return False", function () {
        let result = oracle(testValues, altTestValues);
        assert.equal(result, false);
      })
    })
  })
  describe("Test without input", function () {
    it("Should return 0", function () {
      let result = oracle(testValues, altTestValues);
      assert.equal(result, 0);
    })
    it("Should not return null nor undefined", function () {
      let result = oracle();
      assert.exists(result, 'result is neither `null` nor `undefined`');
    })
  })
});
