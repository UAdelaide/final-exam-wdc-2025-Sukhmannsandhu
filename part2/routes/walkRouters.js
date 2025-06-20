const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/walkers/summary
router.get('/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        u.username AS walker_username,
        COUNT(wr.rating_id) AS total_ratings,
        ROUND(AVG(wr.rating), 1) AS average_rating,
        (
          SELECT COUNT(*)
          FROM WalkRequests req
          JOIN WalkApplications app ON app.request_id = req.request_id
          WHERE app.walker_id = u.user_id AND req.status = 'completed'
        ) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings wr ON wr.walker_id = u.user_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id
    `);

    res.json(rows);
  } catch (err) {
    console.error('Error fetching walker summary:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
