/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var readInstalled = require('read-installed');
var async = require('async');

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

function chronodep(dir, cb) {
  readInstalled(dir, null, function (err, data) {
    if (err) { return cb(err); }
    getDeps([], data, cb);
  });
}

module.exports = chronodep;
