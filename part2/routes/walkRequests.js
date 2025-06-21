fetch('/api/walkrequests', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    owner_id,
    dog_id,
    requested_datetime,
    duration_minutes,
    location
  })
});