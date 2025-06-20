const express = require('express');
const path = require('path');
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

// ✅ Serve static HTML files (like index.html, CSS, JS, images)
app.use(express.static('public'));

// ✅ Homepage route — sends index.html from /public
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// ✅ API routes
app.use('/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
app.use('/api/walkers', walkerRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
