module.exports = function(app) {
  app.post('/token', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.grant_type === 'password') {
      if (req.body.username === 'letme' && req.body.password === 'in') {
        res.send({ access_token: 'secret token!' });
      } else {
        res.status(400).send({ error: 'invalid_grant' });
      }
    } else {
      res.status(400).send({ error: 'unsupported_grant_type' });
    }
  });

  app.post('/revoke', function(req, res) {
    if (req.body.token_type_hint === 'access_token' || req.body.token_type_hint === 'refresh_token') {
      res.send('');
    } else {
      res.status(400).send({ error: 'unsupported_token_type' });
    }
  })
};
