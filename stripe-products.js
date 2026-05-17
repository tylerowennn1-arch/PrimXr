// stripe-products — fetch all active products from your Stripe account
// Invoke: GET https://api.abjayou.com/fn/{projectId}/invoke/stripe-products
module.exports = async (req, res, { env }) => {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return res.status(400).json({ error: 'Add STRIPE_SECRET_KEY in the Secrets panel to get started.' });

  const r = await fetch('https://api.stripe.com/v1/products?active=true&limit=100&expand[]=data.default_price', {
    headers: { Authorization: 'Bearer ' + key },
  });
  const data = await r.json();
  if (data.error) return res.status(400).json({ error: data.error.message });

  const products = (data.data || [])
    .filter(p => p.default_price)
    .map(p => ({
      id: p.id,
      name: p.name,
      description: p.description || '',
      image: p.images?.[0] || null,
      price: {
        id: p.default_price.id,
        amount: p.default_price.unit_amount,
        currency: p.default_price.currency || 'usd',
        type: p.default_price.type,
        interval: p.default_price.recurring?.interval || null,
      },
    }));

  res.json({ products });
};
