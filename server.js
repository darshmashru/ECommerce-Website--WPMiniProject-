import { connect } from '@planetscale/database'
import express from 'express';
import ejs from 'ejs';
import fs from 'fs/promises';

// Config for PlanetScale
const config = {
  host: process.env.PLANETSCALE_DB_HOST,
  username: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD
}

const conn = connect(config)

let html = ''; // Global variable to store the HTML contents
let results = null; // Global variable to store the database results

// Read the contents of the HTML file and execute database query when the server starts up
Promise.all([fs.readFile('./candles.html', 'utf8'), conn.execute('SELECT * from merkaba.candles where id="1"')])
  .then(([file, res]) => {
    html = file;
    results = res;
  })
  .catch((err) => {
    console.error('Error occurred while initializing server:', err);
    process.exit(1);
  });

const app = express();

app.get('/candles.html', (req, res) => {
  if (results === null) {
    res.status(500).send('Internal server error. Please try again later.');
    return;
  }

  // Replace the corresponding text in the HTML file using ejs
  const data = {
    c_id: results.rows[0].id,
    c_name: results.rows[0].name,
    c_description: results.rows[0].description,
    c_price: results.rows[0].price,
    c_stock: results.rows[0].stock,
    c_category: results.rows[0].category
  };
  const renderedHtml = ejs.render(html, data);
  res.send(renderedHtml);
});

app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
