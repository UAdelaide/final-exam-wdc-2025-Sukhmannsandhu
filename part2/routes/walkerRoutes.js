const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { owner_id, dog_id, requested_datetime, duration_minutes, location } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO WalkRequests (owner_id, dog_id, requested_datetime, duration_minutes, location)
       VALUES (?, ?, ?, ?, ?)`,
      [owner_id, dog_id, requested_datetime, duration_minutes, location]
    );
    res.status(201).json({ message: 'Walk request created', walkRequestId: result.insertId });
  } catch (err) {
    console.error('❌ Failed to create walk request:', err);
    res.status(500).json({ error: 'Failed to create walk request' });
  }
});

module.exports = router;
