// import { connect } from '@planetscale/database'
// import express from 'express';
// import ejs from 'ejs';
// import fs from 'fs/promises';

// // Config for PlanetScale
// const config = {
//   host: process.env.PLANETSCALE_DB_HOST,
//   username: process.env.PLANETSCALE_DB_USERNAME,
//   password: process.env.PLANETSCALE_DB_PASSWORD
// }

// const conn = connect(config)

// let html = ''; // Global variable to store the HTML contents
// let results = null; // Global variable to store the database results

// // Read the contents of the HTML file and execute database query when the server starts up
// Promise.all([fs.readFile('candles.html', 'utf8'), conn.execute('SELECT * from merkaba.candles where id="1"')])
//   .then(([file, res]) => {
//     html = file;
//     results = res;
//   })
//   .catch((err) => {
//     console.error('Error occurred while initializing server:', err);
//     process.exit(1);
//   });

// const app = express();

// app.get('/candles.html', (req, res) => {
//   if (results === null) {
//     res.status(500).send('Internal server error. Please try again later.');
//     return;
//   }

//   // Replace the corresponding text in the HTML file using ejs
//   const data = {
//     c_id: results.rows[0].id,
//     c_name: results.rows[0].name,
//     c_description: results.rows[0].description,
//     c_price: results.rows[0].price,
//     c_stock: results.rows[0].stock,
//     c_category: results.rows[0].category
//   };
//   const renderedHtml = ejs.render(html, data);
//   res.send(renderedHtml);
// });

// app.use(express.static('.'));

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// export default app;


// new logic

import { connect } from '@planetscale/database'
import express from 'express';
import ejs from 'ejs';
import fs from 'fs/promises';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// Candles
// Promise.all([fs.readFile(path.join(__dirname, 'candles.html'), 'utf8'), conn.execute('SELECT * from merkaba.candles where id="1"')])
//   .then(([file, res]) => {
//     html = file;
//     results = res;
//   })
//   .catch((err) => {
//     console.error('Error occurred while initializing server:', err);
//     process.exit(1);
//   });

// Index
Promise.all([fs.readFile(path.join(__dirname, 'index.html'), 'utf8'), conn.execute('SELECT * FROM merkaba.necklaces;')])
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

app.get('/', (req, res) => {
  if (results === null) {
    res.status(500).send('Internal server error. Please try again later.');
    return;
  }

  // Replace the corresponding text in the HTML file using ejs
  const data = {
    c_id: results.rows[0].id,
    n_name1: results.rows[0].name,
    n_name2: results.rows[0].name,
    n_name3: results.rows[0].name,
    n_description1: results.rows[0].description,
    n_description2: results.rows[1].description,
    n_description3: results.rows[2].description,
    c_price: results.rows[0].price,
    c_stock: results.rows[0].stock,
    c_category: results.rows[0].category
  };
  const renderedHtml = ejs.render(html, data);
  res.send(renderedHtml);
});
// app.use(express.static('.'));
app.use(express.static(path.join(__dirname, '/')));


// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;