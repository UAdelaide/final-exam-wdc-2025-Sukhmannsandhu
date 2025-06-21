// routes/walkRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../models/db');

// ✅ GET walk requests for the current owner (Q13)
router.get('/owner', async (req, res) => {
  const ownerId = req.session.user?.user_id;

  if (!ownerId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM WalkRequests WHERE owner_id = ? ORDER BY requested_datetime DESC',
      [ownerId]
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Failed to fetch walk requests:', err);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});

// ✅ POST a new walk request (Q14)
router.post('/', async (req, res) => {
  const ownerId = req.session.user?.user_id;
  const { dog_id, requested_datetime, duration_minutes, location } = req.body;

  if (!ownerId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO WalkRequests (owner_id, dog_id, requested_datetime, duration_minutes, location)
       VALUES (?, ?, ?, ?, ?)`,
      [ownerId, dog_id, requested_datetime, duration_minutes, location]
    );
    res.status(201).json({ message: 'Walk request created', walkRequestId: result.insertId });
  } catch (err) {
    console.error('❌ Failed to create walk request:', err);
    res.status(500).json({ error: 'Failed to create walk request' });
  }
});

module.exports = router;
