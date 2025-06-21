router.get('/by-owner/:ownerId', async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    const [dogs] = await db.query(
      'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
      [ownerId]
    );
    res.json(dogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dogs for owner' });
  }
});
// routes/dogRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

// ✅ GET dogs owned by the logged-in user
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
