var assert = require('assert')

var Alea = require('./alea')

var prng1 = Alea(1)
var prng2 = Alea(3)
var prng3 = Alea(1)

var a = prng1()
var b = prng2()
var c = prng3()

assert.equal(a, c)
assert.notEqual(a, b)

console.log("All tests Passed!")
