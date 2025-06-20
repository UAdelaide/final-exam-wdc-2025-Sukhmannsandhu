
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Custom API routes
app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkRoutes);
// app.use('/api/walkers', walkerRoutes); ← You'll add this for Q8

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
})
