# Alea

[![browser support](http://ci.testling.com/coverslide/node-alea.png)](http://ci.testling.com/coverslide/node-alea)

A simple copy-and-paste implementation of Johannes Baagøe's Alea PRNG

Mostly packaged so I can easily include it in my projeccts. Nothing more

JavaScript's Math.random() is fast, but has problems. First, it isn't seedable, second, its randomness leaves a bit to be desired. [Johannes Baagøe](http://baagoe.org/) has done some great work in trying to find a more modern PRNG algorithm that performs well on JavaScript, and Alea seems to be the one that has come out ahead ([benchmarks](http://jsperf.com/prng-comparison)).

## Installation

	npm install alea

## Usage

	var Alea = require('alea')
	
	var prng = new Alea() // add an optional seed param

	var nextRandnum = prng() // just call the return value of Alea

## Additions

Also adds the ability to sync up two Alea PRNGs via the importState and exportState methods.

	var prng1 = new Alea(200)

	prng1()
	prng1()

	// after generating a few random numbers, we will initialize a new PRNG

	var prng2 = Alea.importState(prng1.exportState())

	// this should echo true, true, true
	console.log(prng2() == prng1())
	console.log(prng2() == prng1())
	console.log(prng2() == prng1())

The theory behind this is that while a server is running a simulation (for example, a game) and clients connect to the server, each client will run its own simulation without having to depend 100% on the server for every update of the simulation state. By importing the current generator state from the server, a client can join in at any time and have an accurate simulation fully in sync with the server.

## Acknowledgements

Everything in this module was made by Johannes Baagøe. I just wanted this in npm.
Read more on his [homepage](http://baagoe.org/).
