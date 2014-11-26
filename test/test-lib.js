/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

var path = require('path');

var test = require('tape');

var chronodep = require('../lib');

var root = path.join(__dirname, '..');

test('Does Myles like rent?', function (t) {
  t.plan(2);
  chronodep(root, function (err, deps) {
    t.error(err, 'the callback should be called without an error');
    console.log('Final outoutput:');
    console.log(deps);
    t.equal(deps.constructor, Array, 'the return should be an array');
  });
});
