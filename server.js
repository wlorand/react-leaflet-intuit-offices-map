/**
 * File: server.js
 * Desc: simple express server to serve your built react app
 */

const express = require('express');
const path = require('path');

const port = process.env.PORT || 5005;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
