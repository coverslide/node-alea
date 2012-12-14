var test = require('tape')
var Alea = require('./alea')

test("make sure two seeded values are the same", function(t){

  var prng1 = Alea(1)
  var prng2 = Alea(3)
  var prng3 = Alea(1)

  var a = prng1()
  var b = prng2()
  var c = prng3()

  t.equal(a, c, 'return values of the same seed')
  t.notEqual(a, b, 'return values of different seed')

  // test return values directly
  t.equal(prng1(), prng3(), 'same seed called again')

  t.notEqual(prng1(), prng2(), 'different seed again')
  t.notEqual(prng1(), prng3(), 'prng1 called more times than prng3')
  t.notEqual(prng2(), prng3(), 'prng3 called again')

  t.equal(prng1(), prng3(), 'call counts equal again')
  
  //not sure why explicit end() is needed here
  t.end()
})

test("Import with Alea.import()", function(t){

  var prng1 = Alea(200)

  // generate a few numbers
  prng1()
  prng1()
  prng1()

  var e = prng1['export']()

  var prng4 = Alea['import'](e)

  t.equal(prng1(), prng4(), 'synced prngs, call 1')
  t.equal(prng1(), prng4(), 'synced prngs, call 2')
  t.equal(prng1(), prng4(), 'synced prngs, call 3')
})

test("Resync two differring prngs with prng.import()", function(t){
  var prng1 = Alea(200000)
  var prng2 = Alea(9000)

  // generate a few numbers

  t.notEqual(prng1(), prng2(), 'just generating randomness, call 1')
  t.notEqual(prng1(), prng2(), 'just generating randomness, call 2')
  t.notEqual(prng1(), prng2(), 'just generating randomness, call 3')

  // sync prng2 to prng1
  prng2['import'](prng1['export']())

  t.equal(prng1(), prng2(), 'imported prng, call 1')
  t.equal(prng1(), prng2(), 'imported prng, call 2')
  t.equal(prng1(), prng2(), 'imported prng, call 3')

  // let's test they still sync up if called non-sequentially

  prng1()
  prng1()

  var a1 = prng1()
  var b1 = prng1()
  var c1 = prng1()

  prng2()
  prng2()

  var a2 = prng2()
  var b2 = prng2()
  var c2 = prng2()

  t.equal(a1, a2, 'return values should sync based on number of calls, call 1')
  t.equal(b1, b2, 'return values should sync based on number of calls, call 2')
  t.equal(c1, c2, 'return values should sync based on number of calls, call 3')
})
