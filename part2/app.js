const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 8080;

// ✅ Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
const walkRoutes = require('./routes/walkRequests');
const walkerRoutes = require('./routes/walkerRoutes');

// ✅ Serve index.html from /public
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// ✅ API routes
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
app.use('/api/walkers', walkerRoutes);

// ✅ NEW: Get current logged-in user info (for debugging)
app.get('/api/me', (req, res) => {
  res.json(req.session.user || { error: 'Not logged in' });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
