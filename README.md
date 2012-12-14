# Alea

[![browser support](http://ci.testling.com/coverslide/node-alea.png)](http://ci.testling.com/coverslide/node-alea)

A simple copy-and-paste implementation of Johannes Baagøe's Alea PRNG

Mostly packaged so I can easily include it in my projeccts. Nothing more

JavaScript's Math.random() is fast, but has problems. First, it isn't seedable, second, its randomness leaves a bit to be desired. The Mersenne Twister algorithm is a popular algorithm to replace random implemenetations, and has even been ported to JavaScript. Unfortunately, it depends on bitwise operations which can be slow in JavaScript. [Johannes Baagøe](http://baagoe.org/) has done some great work in trying to find a more modern PRNG algorithm that performs well on JavaScript, and Alea seems to be the one that has come out ahead ([benchmarks](http://jsperf.com/prng-comparison)).

## Installation

	npm install alea

## Usage

	var Alea = require('alea')
	
	var prng = new Alea() // add an optional seed param

	var nextRandnum = prng() // just call the return value of Alea

## Additions

Also adds the ability to sync up two Alea PRNGs via the importState and exportState methods. While you can initialize two Alea PRNGs with the same seed, you cannot sync up a new PRNG after an old PRNG has already started running. This is useful for games where a new player joins and their local PRNG should sync up with the remote one. 

	var prng1 = new Alea(200)

	prng1()
	prng1()

	// after generating a few random numbers, we will initialize a new PRNG

	var prng2 = Alea.importState(prng1.exportState())

	// this should echo true, true, true
	console.log(prng2() == prng1())
	console.log(prng2() == prng1())
	console.log(prng2() == prng1())

## Acknowledgements

Everything in this module was made by Johannes Baagøe. I just wanted this in npm.
Read more on his [homepage](http://baagoe.org/).
