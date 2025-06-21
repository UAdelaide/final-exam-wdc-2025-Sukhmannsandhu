const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ✅ Session
app.use(session({
  secret: 'dogsecretkey',
  resave: false,
  saveUninitialized: false
}));

// ✅ Routes
const userRoutes = require('./routes/users');
const walkRoutes = require('./routes/walks');

app.use('/users', userRoutes);
app.use('/api/walks', walkRoutes);

// ✅ HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/owner-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/owner-dashboard.html'));
});

app.get('/walker-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/walker-dashboard.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
