const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
const walkRoutes = require('./routes/walkerRoutes'); // For Q13 and Q14 only

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Register API routes
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);

// HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/owner-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/owner-dashboard.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
