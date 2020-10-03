const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:3000'] }));

app.use(express.static('public'));

module.exports = app.listen(PORT, () => {
  console.log('Aql hears you loud and clear on port 3000');
});
