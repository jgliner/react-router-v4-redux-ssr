const morgan = require('morgan');
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3005;

app.use(morgan('dev'));
app.use('/dist', express.static('./dist'));

app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index_prod.html'));
});

app.listen(PORT, () => {
  console.log('Prod app listening on', PORT, '!');
});
