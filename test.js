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

prng1()
prng1()
prng1()

var e = prng1.export()

var prng4 = Alea.import(e)

assert.equal(prng1(), prng4())
assert.equal(prng1(), prng4())
assert.equal(prng1(), prng4())

prng2.import(prng1.export())

assert.equal(prng1(), prng2())
assert.equal(prng1(), prng2())
assert.equal(prng1(), prng2())

console.log("All tests Passed!")
