// routes/dogRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

// ✅ Route to get dogs owned by current user
router.get('/owner/dogs', async (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== 'owner') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  try {
    const [rows] = await db.query(
      'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
      [user.user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
