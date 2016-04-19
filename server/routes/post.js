
module.exports = function(app) {
  app.get('/api/posts', function(req, res) {
    if (req.headers.authorization == 'Bearer secret admin token!') {
      res.status(200).send({
        data: [
          {
            type: "posts",
            id: 1,
            attributes: {
              content: 'That is my post content.'
            }
          }
        ]
      });
    } else {
      res.status(401).send({
        errors: [
          {
            detail: 'Access denied',
            status: '401'
          }
        ]
      });
    }
  });
};
