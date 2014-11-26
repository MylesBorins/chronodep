/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var readInstalled = require('read-installed');
var async = require('async');
var moment = require('moment');

var age = require('./age');

function getDeps(memo, root, cb) {
  var keys = Object.keys(root.dependencies);
  if (keys.length) {
    return async.each(keys, function (key, done) {
      var dep = root.dependencies[key];
      memo.push({
        name: dep.name,
        version: dep.version
      });
      getDeps(memo, dep, done);
    }, function (err) {
      if (err) { return cb(err); }
      cb(null, memo);
    });
  }
  return cb(null, memo);
}

function addDates(deps, cb) {
  async.map(deps, function (dep, done) {
    age(dep, done);
  }, function (err, depsWithDates) {
    depsWithDates.sort(function (a, b) {
      return new Date(a.time) - new Date(b.time);
    });
    return cb(err, depsWithDates);
  });
}

function humanizeDates(deps, cb) {
  async.map(deps, function (dep, done) {
    dep.time = moment(dep.time).fromNow();
    done(null, dep);
  }, cb);
}

function chronodep(dir, cb) {
  readInstalled(dir, null, function (err, data) {
    if (err) { return cb(err); }
    async.waterfall([
      getDeps.bind(null, [], data),
      addDates,
      humanizeDates
    ], cb);
  });
}

module.exports = chronodep;
