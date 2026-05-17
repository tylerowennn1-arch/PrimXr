// realtime — SSE stream for a table. Client receives pushed updates when data changes.
// Usage: GET https://api.abjayou.com/fn/PROJECT_ID/invoke/realtime?table=messages&order=created_at.desc&limit=50
// Client:
//   const es = new EventSource('https://api.abjayou.com/fn/PROJECT_ID/invoke/realtime?table=messages')
//   es.onmessage = e => setRows(JSON.parse(e.data))
module.exports = async (req, res, { db }) => {
  const table = req.query.table;
  if (!table || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table))
    return res.status(400).json({ error: 'table query param required' });

  const select = req.query.select || '*';
  const order  = req.query.order  || 'id DESC';
  const limit  = Math.min(parseInt(req.query.limit) || 100, 500);
  const ms     = Math.max(parseInt(req.query.interval) || 1000, 500);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Sanitize order param
  const safeOrder = order.replace(/[^a-zA-Z0-9_, .]/g, '');

  let lastHash = null;
  const poll = async () => {
    try {
      const { rows } = await db.query(
        `SELECT ${select === '*' ? '*' : select.split(',').map(c => `"${c.trim()}"`).join(',')} FROM "${table}" ORDER BY ${safeOrder} LIMIT $1`,
        [limit]
      );
      const hash = JSON.stringify(rows);
      if (hash !== lastHash) { lastHash = hash; res.write(`data: ${hash}\n\n`); }
    } catch (e) { res.write(`event: error\ndata: ${JSON.stringify({ error: e.message })}\n\n`); }
  };

  await poll();
  const timer = setInterval(poll, ms);
  req.on('close', () => clearInterval(timer));
};
