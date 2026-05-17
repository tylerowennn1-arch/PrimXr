// stripe-update-product — update a Stripe product + optionally its price
// Body: { productId, name?, description?, amount?, imageUrl?, category? }
module.exports = async (req, res, { env }) => {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return res.status(400).json({ error: 'Add STRIPE_SECRET_KEY in the Secrets panel' });

  const { productId, name, description, amount, imageUrl, category } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId is required' });

  const post = (path, body) => fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString()
  }).then(r => r.json());

  const get = (path) => fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: 'Bearer ' + key }
  }).then(r => r.json());

  // 1. Update product fields
  const productBody = {};
  if (name) productBody.name = name;
  if (description !== undefined) productBody.description = description || '';
  if (category !== undefined) productBody['metadata[category]'] = category;
  if (imageUrl !== undefined) {
    if (imageUrl) {
      imageUrl.split(',').filter(Boolean).forEach((u, i) => { productBody[`images[${i}]`] = u.trim(); });
    } else {
      productBody['images'] = '';
    }
  }

  if (Object.keys(productBody).length > 0) {
    const updated = await post(`products/${productId}`, productBody);
    if (updated.error) return res.status(400).json(updated);
  }

  // 2. Update price if amount changed
  if (amount !== undefined) {
    const newCents = Math.round(parseFloat(amount) * 100);
    const pricesList = await get(`prices?product=${productId}&active=true&limit=1`);
    const currentPrice = pricesList.data?.[0];

    if (!currentPrice || currentPrice.unit_amount !== newCents) {
      const isRecurring = !!currentPrice?.recurring;
      const priceBody = { product: productId, unit_amount: newCents, currency: 'usd' };
      if (isRecurring) priceBody['recurring[interval]'] = 'month';

      const newPrice = await post('prices', priceBody);
      if (newPrice.error) return res.status(400).json(newPrice);

      await post(`products/${productId}`, { default_price: newPrice.id });
      if (currentPrice) await post(`prices/${currentPrice.id}`, { active: 'false' });
    }
  }

  const product = await get(`products/${productId}`);
  res.json({ success: true, id: product.id, name: product.name });
};
