import express from 'express';
import ejs from 'ejs';
import fs from 'fs/promises';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config for MongoDB
const uri = process.env.MONGODB_URI;
console.log(uri)

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let html = ''; // Global variable to store the HTML contents
let results = null; // Global variable to store the database results

// Connect to the MongoDB client
client.connect(err => {
  if (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    process.exit(1);
  }

  const collection = client.db("Merkaba").collection("necklaces");

  // Read the contents of the HTML file and execute database query when the server starts up
  Promise.all([fs.readFile(path.join(__dirname, 'index.html'), 'utf8'), collection.find({}).toArray()])
    .then(([file, res]) => {
      html = file;
      results = res;
    })
    .catch((err) => {
      console.error('Error occurred while initializing server:', err);
      process.exit(1);
    });
});

const app = express();

app.get('/', (req, res) => {
  if (results === null) {
    res.status(500).send('Internal server error. Please try again later.');
    return;
  }

  // Replace the corresponding text in the HTML file using ejs
  const data = {
    c_id: results[0]._id,
    n_name1: results[0].name,
    n_name2: results[1].name,
    n_name3: results[2].name,
    n_description1: results[0].description,
    n_description2: results[1].description,
    n_description3: results[2].description,
    c_price: results[0].price,
    c_stock: results[0].stock,
    c_category: results[0].category
  };
  const renderedHtml = ejs.render(html, data);
  res.send(renderedHtml);
});

app.get('/index.html', async (req, res) => {
  try {
    const database = client.db("Merkaba");
    const products = database.collection("necklaces");

    // Get all documents in the collection.
    const documents = await products.find().toArray();

    if (!documents || documents.length === 0) {
      console.log('No documents found');
      res.status(404).send('No products found');
      return;
    }
    console.log('Documents:', documents);

    // Create a single data object for rendering.
    const data = {};
    documents.forEach((document, index) => {
      data[`n_id${index + 1}`] = document._id;
      data[`n_name${index + 1}`] = document.name;
      data[`n_description${index + 1}`] = document.price;
    });
    console.log('Data:', data);

    // Ensure that the html variable contains the correct HTML content
    const html = await fs.readFile(path.join(__dirname, 'index.html'), 'utf8');
    console.log('HTML:', html);

    // Render the HTML with the data object.
    const renderedHtml = ejs.render(html, data);
    console.log('Rendered HTML:', renderedHtml);
    res.send(renderedHtml);
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
});

app.use(express.static(path.join(__dirname, './')));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;