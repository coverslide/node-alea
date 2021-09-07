'use strict';

// From http://baagoe.com/en/RandomMusings/javascript/

class Alea {
  constructor(args) {
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (!args) {
      args = [+new Date];
    } else if (typeof args != 'object') {
      args = [args];
    }
    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    this.c = c;
    this.s0 = s0;
    this.s1 = s1;
    this.s2 = s2;
    this.version = 'Alea 1.0';
  }
  next() {
    var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
    this.s0 = this.s1;
    this.s1 = this.s2;
    return this.s2 = t - (this.c = t | 0);
  }
  uint32() {
    return this.next() * 0x100000000; // 2^32
  }
  fract53() {
    return this.next() + 
      (this.next() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  }

  // my own additions to sync state between two generators
  exportState(){
    return [this.s0, this.s1, this.s2, this.c];
  }

  importState(i){
    this.s0 = +i[0] || 0;
    this.s1 = +i[1] || 0;
    this.s2 = +i[2] || 0;
    this.c = +i[3] || 0;
  }
}

// importState to sync generator states
Alea.importState = function(i){
  var random = new Alea();
  random.importState(i);
  return random;
};

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

module.exports = Alea;
module.exports.Mash = Mash;
