const express = require('express');
const pool = require('./models/db');

// Route files
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
const walkRoutes = require('./routes/walkRoutes');
const walkerRoutes = require('./routes/walkerRoutes');

const app = express();
const port = 8080;

// Middleware
app.use(express.json());

// Serve static HTML files from public/
app.use(express.static('public'));

// API routes
app.use('/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
app.use('/api/walkers', walkerRoutes);

// Root test route (for JSON response)
app.get('/', (req, res) => {
  res.sendFile(__dirname
