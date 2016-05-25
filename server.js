var express = require('express');
var passport = require('passport-mfp-token-validation').Passport;
var mfpStrategy = require('passport-mfp-token-validation').Strategy;

passport.use(new mfpStrategy({
    authServerUrl: 'http://localhost:9080/mfp/api/az/v1',
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
