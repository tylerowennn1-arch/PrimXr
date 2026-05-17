// stripe-session — verify a completed checkout session
// GET https://api.abjayou.com/fn/{projectId}/invoke/stripe-session?id=cs_xxx
module.exports = async (req, res, { env }) => {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return res.status(400).json({ error: 'STRIPE_SECRET_KEY not configured.' });

  const sessionId = req.query.id;
  if (!sessionId) return res.status(400).json({ error: 'id query param required.' });

  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: 'Bearer ' + key },
  });
  const session = await r.json();
  if (session.error) return res.status(400).json({ error: session.error.message });

  res.json({
    paid: session.payment_status === 'paid',
    status: session.payment_status,
    customerEmail: session.customer_details?.email || null,
    customerName: session.customer_details?.name || null,
    amountTotal: session.amount_total,
    currency: session.currency,
    mode: session.mode,
  });
};
