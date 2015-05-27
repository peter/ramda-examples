'use strict';

// Originally posted here:
// https://gist.github.com/peter/496e99b118e7688e2cab

var R = require('ramda');

var blank = function(value) {
  return value == null || (typeof value === 'string' && value.trim().length === 0);
};

var present = function(value) {
  return !blank(value);
}

var nullify = function(value) {
  return blank(value) ? null : value;
};

var trim = function(value) {
  return value && value.trim();
};

/////////////////////////////////
// IMPERATIVE
/////////////////////////////////

var normalizeAttributes = function(attributes) {
  Object.keys(attributes).forEach(function(key) {
    var value = attributes[key];
    if (present(value)) {
      attributes[key] = trim(value);
    } else {
      attributes[key] = null;
    }
  });
  return attributes;
};

/////////////////////////////////
// FUNCTIONAL
/////////////////////////////////

var normalizeValue = R.compose(trim, nullify);
var normalizeAttributes = R.mapObj(normalizeValue);
