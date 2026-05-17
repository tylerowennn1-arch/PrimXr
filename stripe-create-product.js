// stripe-create-product — create a Stripe product + price
// Body: { name, description?, amount, imageUrl?, type?, category?, stockQuantity?, variations? }
module.exports = async (req, res, { env }) => {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return res.status(400).json({ error: 'Add STRIPE_SECRET_KEY in the Secrets panel' });

  const { name, description, amount, imageUrl, type = 'one_time', category, stockQuantity, variations } = req.body || {};
  if (!name || !amount) return res.status(400).json({ error: 'name and amount are required' });

  const stripe = (path, body) => fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString()
  }).then(r => r.json());

  // 1. Create product
  const productBody = { name };
  if (description) productBody.description = description;
  if (category) productBody['metadata[category]'] = category;
  if (imageUrl) imageUrl.split(',').filter(Boolean).forEach((u, i) => { productBody[`images[${i}]`] = u.trim(); });

  const product = await stripe('products', productBody);
  if (product.error) return res.status(400).json(product);

  // 2. Create price
  const priceBody = {
    product: product.id,
    unit_amount: Math.round(parseFloat(amount) * 100),
    currency: 'usd',
  };
  if (type === 'recurring') { priceBody['recurring[interval]'] = 'month'; }

  const price = await stripe('prices', priceBody);
  if (price.error) return res.status(400).json(price);

  // 3. Set default price
  await fetch(`https://api.stripe.com/v1/products/${product.id}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ default_price: price.id }).toString()
  });

  res.json({ id: product.id, name: product.name, price_id: price.id, unit_amount: price.unit_amount, currency: 'usd', type });
};
