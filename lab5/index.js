const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const checkJwt = auth({
    audience: 'https://kpi.eu.auth0.com/api/v2/',
    issuerBaseURL: `https://kpi.eu.auth0.com/`,
});

app.post('/getname', checkJwt, (req, res) => {
    console.log(req.body);
    if (req.body.id_token) {
        res.json({
            message: JSON.parse(Buffer.from(req.body.id_token.split('.')[1], 'base64').toString()).name
        })
    } else {
        console.log('============================================')
        res.sendStatus(401).send();
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', checkJwt, (req, res) => {
    res.redirect('/');
});

app.post('/api/login', (req, res) => {
    var options = {
        method: 'POST',
        url: 'https://kpi.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form:
        {
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
            username: req.body.login,
            password: req.body.password,
            audience: 'https://kpi.eu.auth0.com/api/v2/',
            client_id: 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0',
            client_secret: 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB',
            realm: 'Username-Password-Authentication',
            scope: 'openid'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.json(body);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})