module.exports = function(app) {
  app.post('/token', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.grant_type === 'password') {
      if (req.body.username === 'letme' && req.body.password === 'in') {
        res.send(200, { access_token: "secret token!" });
      } else {
        res.send(400, { error: "invalid_grant" });
      }
    } else {
      res.send(400, { error: "unsupported_grant_type" });
    }
  });
};
