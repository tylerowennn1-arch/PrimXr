// stripe-delete-product — archive a Stripe product (set active=false)
// Body: { productId }
module.exports = async (req, res, { env }) => {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return res.status(400).json({ error: 'Add STRIPE_SECRET_KEY in the Secrets panel' });

  const { productId } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId is required' });

  const r = await fetch(`https://api.stripe.com/v1/products/${productId}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ active: 'false' }).toString()
  });
  const data = await r.json();
  if (data.error) return res.status(400).json(data);

  res.json({ success: true, id: data.id, active: data.active });
};
