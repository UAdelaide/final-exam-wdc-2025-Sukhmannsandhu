const express = require('express');
const session = require('express-session');
const db = require('./models/db');

const userRoutes = require('./routes/userRoutes');
const walkerRoutes = require('./routes/walkerRoutes');
const walkRoutes = require('./routes/walkRoutes');
const dogRoutes = require('./routes/dogRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'mydogappsecret',
  resave: false,
  saveUninitialized: false,
}));

// Mount route files
app.use('/api/users', userRoutes);
app.use('/api/walkers', walkerRoutes);
app.use('/api/walkrequests', walkRoutes);
app.use('/api/dogs', dogRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
