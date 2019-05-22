'use strict';

module.exports = (req, res, next) => {
  const _send = res.send;
  res.send = function(body) {
    // https://github.com/typicode/json-server/issues/541#issuecomment-307300368
    const parsedUrl = require('url').parse(req.url, true);

    if (parsedUrl.query['findById']) {
      try {
        const json = JSON.parse(body);
        const results = json.data.items.filter(item => item.id === parsedUrl.query.id);

        if (results.length > 0) {
          return _send.call(this, results[0]);
        } else {
          return _send.call(this, '{}', 404);
        }

      } catch (e) {}
    }

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJ1aWQxMjM0IiwidXNlciI6InVpZDEyMzRAZXhhbXBsZS5jb20iLCJpc0ltcGVyc29uYXRlZCI6dHJ1ZSwiZXhwIjozNTQ5OTg3MjAwLCJyb2xlcyI6WyJhZG1pbiIsImJldGEiXX0.O3nFkRkqW7f42TrAiW402FTnMHBMezTTBjdRJ-w2XwI';
    /*
      {
        "userId": "uid1234",
        "user": "uid1234@example.com",
        "isImpersonated": true,
        "exp": 3549987200,
        "roles": [
          "admin",
          "beta"
        ]
      }
    */

    console.log('\x1b[36m%s\x1b[0m', parsedUrl.pathname);

    const PROVIDERS = {
      '/sso/3rdparty': '3RDPARTY',
      '/sso': 'LOCAL_SSO'
    };

    if (PROVIDERS[parsedUrl.pathname]) {
      console.log('\x1b[32m\x1b[40m', 'Logging in with ' + PROVIDERS[parsedUrl.pathname] + ' !');

      res.cookie('token', token);
      res.redirect(302, parsedUrl.query['relay_state'] || 'http://localhost:4200/');
      return;
    }

    return _send.call(this, body);
  };

  next();
};
