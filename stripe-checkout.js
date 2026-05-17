// stripe-checkout — create a Stripe Checkout session
// POST https://api.abjayou.com/fn/{projectId}/invoke/stripe-checkout
// Body: { priceId, successUrl, cancelUrl, customerEmail? }
module.exports = async (req, res, { env }) => {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return res.status(400).json({ error: 'STRIPE_SECRET_KEY not configured.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { priceId, successUrl, cancelUrl, customerEmail } = body || {};
  if (!priceId || !successUrl || !cancelUrl)
    return res.status(400).json({ error: 'priceId, successUrl, and cancelUrl are required.' });

  // Auto-detect one-time vs subscription
  const priceRes = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
    headers: { Authorization: 'Bearer ' + key },
  });
  const price = await priceRes.json();
  if (price.error) return res.status(400).json({ error: price.error.message });
  const mode = price.type === 'recurring' ? 'subscription' : 'payment';

  // Build form-encoded session params
  const params = new URLSearchParams({
    'payment_method_types[]': 'card',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  if (customerEmail) params.set('customer_email', customerEmail);
  if (mode === 'payment') params.set('shipping_address_collection[allowed_countries][]', 'US');

  const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const session = await sessionRes.json();
  if (session.error) return res.status(400).json({ error: session.error.message });

  res.json({ url: session.url, sessionId: session.id });
};
