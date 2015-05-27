'use strict';

// Originally posted here:
// https://gist.github.com/peter/75aa6cf67f370b5bae4e

// BEFORE REFACTORING (IMPERATIVE)
var filteredLinks = [];
var weekdayCounts = {};
// Limit to 4 links per weekday.
// Loop through all links and keep track of
// how many are in each weekday.
widget.links.forEach(function(link) {
  var weekday = link.group;
  if (weekdayCounts[weekday] === undefined) {
    weekdayCounts[weekday] = 0;
  }
  if (weekdayCounts[weekday] < LIMIT_PER_DAY) {
    filteredLinks.push(link);
    weekdayCounts[weekday]++;
  }
});
widget.links = filteredLinks;

// AFTER REFACTORING (FUNCTIONAL)
var byGroup = R.values(R.groupBy(R.prop('group'), widget.links));
widget.links = R.chain(R.take(LIMIT_PER_DAY), byGroup);

// NOTE: R.chain is equivalent to R.compose(R.flatten, R.map)
