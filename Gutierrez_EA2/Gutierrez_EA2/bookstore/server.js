const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'bookstore';

let db;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

MongoClient.connect(MONGO_URL)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

app.get('/api/books', async (req, res) => {
  try {
    const books = await db.collection('books').find().toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
