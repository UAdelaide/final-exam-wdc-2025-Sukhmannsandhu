// routes/dogRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

// ✅ Route to get dogs owned by current user
// ✅ Get dogs for the currently logged-in owner
router.get('/by-owner', async (req, res) => {
  const ownerId = req.session.user?.user_id;

  if (!ownerId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [rows] = await db.query('SELECT dog_id, name, breed FROM Dogs WHERE owner_id = ?', [ownerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching owner dogs:', err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});
module.exports = router;

