const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'walkies-secret',
  resave: false,
  saveUninitialized: true
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
app.use('/api/walkrequests', walkRoutes);

// HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/owner-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/owner-dashboard.html'));
});

app.get('/walker-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/walker-dashboard.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
