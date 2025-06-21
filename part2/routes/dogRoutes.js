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
