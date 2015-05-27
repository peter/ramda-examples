'use strict';

var R = require('ramda');

var CATEGORIES = [
  {category_type: 'cuisine', id: 1, name: 'French', type: 'categroy'},
  {category_type: 'diets', id: 2, name: 'Vegetarian', type: 'category'}
];

var children = {
  filter: function(type) {
    return R.filter(R.propEq('category_type', type));
  },

  map: R.map(R.pick(['id', 'name', 'type'])),

  byType: function(type) {
    return R.compose(children.map, children.filter(type));
  },

  get: function(type) {
    return children.byType(type)(CATEGORIES);
  }
};
