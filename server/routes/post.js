module.exports = function(app) {
  app.get('/api/posts', function(req, res) {
    if (req.headers.authorization) {
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
      res.status(403).send({
        errors: [
          {
            detail: 'Access denied',
            status: '403'
          }
        ]
      });
    }
  });
};
