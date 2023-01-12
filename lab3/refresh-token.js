var request = require("request");

var options = {
    method: 'POST',
    url: 'https://kpi.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: 'pleskach.mykhailo@lll.kpi.ua',
        password: 'pass#is2w32k',
        audience: 'https://kpi.eu.auth0.com/api/v2/',
        client_id: 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0',
        client_secret: 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB',
        realm: 'Username-Password-Authentication',
        scope: 'offline_access'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    var token = JSON.parse(body).refresh_token;
    console.log('\nRefresh token ' + token + '\n')


    var options = {
        method: 'POST',
        url: 'https://kpi.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form:
        {
            grant_type: 'refresh_token',
            client_id: 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0',
            client_secret: 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB',
            refresh_token: token,
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

});