/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var test = require('tape');

var chronodep = require('../lib');

test('Does Myles like rent?', function (t) {
  t.plan(1);
  t.equal(chronodep, 'I really love the play rent\nI can recite the first couple minutes of it', 'of course he does!');
});
