// Create web server
// Load express
const express = require('express');
// Load body-parser
const bodyParser = require('body-parser');
// Load comments module
const comments = require('./comments');

// Create web server
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  comments.all((err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.send(data);
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.create(comment, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.send(data);
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
