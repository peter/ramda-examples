'use strict';

var FIELDS = ["id", "type", "name", "url"];

/////////////////////////////////
// IMPERATIVE
/////////////////////////////////

var _ = require('lodash');

var filterItems = function(widgets) {
  return _.map(widgets, function(widget) {
    if (widget.data && widget.data.items) {
      var items = _.map(widget.data.items, function(item) {
        if (item.type === 'recipe') {
          var trimmed = {};
          FIELDS.forEach(function(key) {
            trimmed[key] = item[key];
          });
          return trimmed;
        } else {
          return item;
        }
      });
      widget.data.items = items;
      return widget;
    } else {
      return widget;
    }
  });
};

/////////////////////////////////
// FUNCTIONAL
/////////////////////////////////

var R = require('ramda');

var filter = function(items) {
  return R.map(function(item) {
    if (item.type === 'recipe') {
      return R.pick(FIELDS, item);
    } else {
      return item;
    }
  }, (items || []));
};

var filterItems = function(widgets) {
  return R.map(function(widget) {
    var path = ['data', 'items'],
        items = R.path(path, widget);
    return R.assocPath(path, filter(items), widget);
  }, widgets);
};
