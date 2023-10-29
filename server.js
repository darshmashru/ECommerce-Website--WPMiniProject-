import express from 'express';
import ejs from 'ejs';
import fs from 'fs/promises';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config for MongoDB
const uri = process.env.MONGODB_URI;
// const uri = process.dotenv.MONGODB_URI;
// console.log(uri)

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let html = ''; // Global variable to store the HTML contents
let results = null; // Global variable to store the database results

// Connect to the MongoDB client
client.connect(err => {
  if (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    process.exit(1);
  }
  console.log("Database Connected")

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
app.use(express.json());

app.get('/candles.html', async (req, res) => {
  try {
    const database = client.db("Merkaba");
    const products = database.collection("candles");

    // Get all documents in the collection.
    const documents = await products.find().toArray();

    if (!documents || documents.length === 0) {
      console.log('No documents found');
      res.status(404).send('No products found');
      return;
    }

    // Create a single data object for rendering.
    const data = {};
    documents.forEach((document, index) => {
      data[`n_id${index + 1}`] = document._id;
      data[`n_name${index + 1}`] = document.name;
      data[`n_desc${index + 1}`] = document.description;
      data[`n_price${index + 1}`] = document.price;
    });

    // Ensure that the html variable contains the correct HTML content
    const html = await fs.readFile(path.join(__dirname, 'candles.html'), 'utf8');

    // Render the HTML with the data object.
    const renderedHtml = ejs.render(html, data);
    res.send(renderedHtml);
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
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

    // Create a single data object for rendering.
    const data = {};
    documents.forEach((document, index) => {
      data[`n_id${index + 1}`] = document._id;
      data[`n_name${index + 1}`] = document.name;
      data[`n_price${index + 1}`] = document.price;
    });

    // Ensure that the html variable contains the correct HTML content
    const html = await fs.readFile(path.join(__dirname, 'index.html'), 'utf8');

    // Render the HTML with the data object.
    const renderedHtml = ejs.render(html, data);
    res.send(renderedHtml);
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
});

app.get('/necklaces.html', async (req, res) => {
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

    // Create a single data object for rendering.
    const data = {};
    documents.forEach((document, index) => {
      data[`n_id${index + 1}`] = document._id;
      data[`n_name${index + 1}`] = document.name;
      data[`n_price${index + 1}`] = document.price;
    });

    // Ensure that the html variable contains the correct HTML content
    const html = await fs.readFile(path.join(__dirname, 'necklaces.html'), 'utf8');

    // Render the HTML with the data object.
    const renderedHtml = ejs.render(html, data);
    res.send(renderedHtml);
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
});

app.get('/bracelets.html', async (req, res) => {
  try {
    const database = client.db("Merkaba");
    const products = database.collection("bracelets");

    // Get all documents in the collection.
    const documents = await products.find().toArray();

    if (!documents || documents.length === 0) {
      console.log('No documents found');
      res.status(404).send('No products found');
      return;
    }

    // Create a single data object for rendering.
    const data = {};
    documents.forEach((document, index) => {
      data[`n_id${index + 1}`] = document._id;
      data[`n_name${index + 1}`] = document.name;
      data[`n_price${index + 1}`] = document.price;
    });

    // Ensure that the html variable contains the correct HTML content
    const html = await fs.readFile(path.join(__dirname, 'bracelets.html'), 'utf8');

    // Render the HTML with the data object.
    const renderedHtml = ejs.render(html, data);
    res.send(renderedHtml);
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
});

app.get('/rings.html', async (req, res) => {
  try {
    const database = client.db("Merkaba");
    const products = database.collection("rings");

    // Get all documents in the collection.
    const documents = await products.find().toArray();

    if (!documents || documents.length === 0) {
      console.log('No documents found');
      res.status(404).send('No products found');
      return;
    }

    // Create a single data object for rendering.
    const data = {};
    documents.forEach((document, index) => {
      data[`n_id${index + 1}`] = document._id;
      data[`n_name${index + 1}`] = document.name;
      data[`n_price${index + 1}`] = document.price;
    });

    // Ensure that the html variable contains the correct HTML content
    const html = await fs.readFile(path.join(__dirname, 'rings.html'), 'utf8');

    // Render the HTML with the data object.
    const renderedHtml = ejs.render(html, data);
    res.send(renderedHtml);
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
});

app.post('/update-cart', async (req, res) => {
  try {
    // Assuming that the request body contains the product details to add to the cart
    const productData = req.body;

    // Load the existing cart data from the JSON file (if it exists)
    let cartData = [];

    // Check if the cart JSON file exists and load its content
    try {
      const cartFileContents = await fs.readFile('cart.json', 'utf8');
      cartData = JSON.parse(cartFileContents);
    } catch (err) {
      // Handle file read errors, e.g., if the file doesn't exist
    }
    cartData.push(productData);
    await fs.writeFile('cart.json', JSON.stringify(cartData, null, 2), 'utf8');

    res.json({ success: true, message: 'Product added to cart successfully' });
  } catch (err) {
    console.error('Error occurred while adding to cart:', err);
    res.status(500).send('Internal server error. Please try again later.');
  }
});

app.post('/save-details', (req, res) => {
  const formData = req.body;
  const db = client.db('Merkaba');
  const collection = db.collection('contact');

  collection.insertOne(formData, (err, result) => {
    if (err) {
      console.error('Error inserting into MongoDB:', err);
      res.status(500).send('Error inserting data into the database.');
    } else {
        res.status(200).send('Form data submitted successfully!');
    }
    client.close();
    });
  });

app.post('/cart-data', async (req, res) => {
  try {
    const requestData = req.body;
    const results = [];
    for (const item of requestData) {
      const { DB, ID } = item;

      // Define the collection name based on the 'DB' parameter
      const collectionName = DB;
      const db = client.db("Merkaba");

      // Use the MongoDB driver to access the specified collection and query by ObjectID
      const collection = db.collection(collectionName);
      const data = await collection.findOne({ _id: new ObjectId(ID) });
      if (data) {
        results.push(data);
      } else {
        results.push({ message: `Data not found for DB: ${DB} and ID: ${ID}` });
      }
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from the database' });
  }
});


app.use(express.static(path.join(__dirname, './')));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;