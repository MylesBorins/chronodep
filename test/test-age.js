/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

// var path = require('path');

var test = require('tape');

var age = require('../lib/age');

var dep = {
  name: 'npm',
  version: '2.1.9'
};

var expected = {
  name: 'npm',
  version: '2.1.9',
  time: '2014-11-14T05:44:53.549Z'
};

test('age:', function (t) {
  t.plan(2);
  age(dep.name, dep.version, function (err, depWithAge) {
    t.error(err, 'there should be no error');
    t.deepEqual(depWithAge, expected, 'it should return the data including the time npm 2.1.9 was released');
  });
});
