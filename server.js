/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var express = require('express');
var passport = require('passport-mfp-token-validation').Passport;
var mfpStrategy = require('passport-mfp-token-validation').Strategy;

passport.use(new mfpStrategy({
    authServerUrl: 'http://localhost:9080/mfp/api',
    confClientID: 'testclient',
    confClientPass: 'testclient',
    analytics: {
        onpremise: {
            url: 'http://localhost:9080/analytics-service/rest/v3',
            username: 'admin',
            password: 'admin'
        }
    }
}));

var app = express();
app.use(passport.initialize());

app.get('/getBalance', passport.authenticate('mobilefirst-strategy', {
        session: false,
        scope: 'accessRestricted'
    }),
    function(req, res) {
        res.send('17364');
    });

var server = app.listen(3000, function() {
    var port = server.address().port
    console.log("Sample app listening at http://localhost:%s", port)
});
