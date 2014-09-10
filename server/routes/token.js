module.exports = function(app) {
  app.post('/token', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.grant_type === 'password') {
      if (req.body.username === 'letme' && req.body.password === 'in') {
        res.send({ access_token: "secret token!" });
      } else {
        res.status(400).send({ error: "invalid_grant" });
      }
    } else {
      res.stauts(400).send({ error: "unsupported_grant_type" });
    }
  });
};
