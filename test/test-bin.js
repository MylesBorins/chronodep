/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';
var path = require('path');

var test = require('tape');
var spawn = require('child_process').spawn;

test('bin:', function (t) {
  t.plan(2);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 0, 'it should exit with error code 1');
    // t.equal(stderr, '', 'it should have no output on stderr');
    t.ok(stdout, 'there should be output on stdout');
  });
});

test('bin: help', function (t) {
  t.plan(3);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath, ['-h']);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 0, 'it should exit with code 0');
    t.equal(stderr, '', 'there should be no output on stderr');
    t.equal(stdout, 'Usage: chronodep [root of module (optional)]\n\nStandard Options:\n\n\t-h Show this message\n');
  });
});
