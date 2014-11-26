/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var RegClient = require('npm-registry-client');

var client = new RegClient({
});
var params = {timeout: 1000};

function age(name, version, cb) {
  var uri = 'https://registry.npmjs.org/' + name + '/';
  client.get(uri, params, function (err, data) {
    if (err) { return cb(err); }
    cb(null, {
      name: name,
      version: version,
      time: data.time[version]
    });
  });
}

module.exports = age;
