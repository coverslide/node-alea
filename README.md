# Alea

A simple copy-and-paste implementation of Johannes Baagøe's Alea PRNG

Mostly packaged so I can easily include it in my projeccts. Nothing more

## Installation

	npm install alea

## Usage

	var Alea = require('alea')
	
	var prng = new Alea() // add an optional seed param

	var nextRandnum = prng() // just call the return value of Alea

## Acknowledgements

Everything in this module was made by Johannes Baagøe. I just wanted this in npm.
Read more on his [homepage](http://baagoe.org/).
