// stripe-webhook — handle Stripe events (checkout, subscriptions, payments)
// POST https://api.abjayou.com/fn/{projectId}/invoke/stripe-webhook
// Paste this URL in Stripe Dashboard → Webhooks
const crypto = require('crypto');

module.exports = async (req, res, { env, db }) => {
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];

  // If no webhook secret, accept all (dev mode — add STRIPE_WEBHOOK_SECRET for production)
  let event;
  if (webhookSecret && sig) {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const parts = Object.fromEntries(sig.split(',').map(p => p.split('=')));
    if (!parts.t || !parts.v1) return res.status(400).send('Invalid signature header');
    if (Math.abs(Date.now() / 1000 - parseInt(parts.t)) > 300) return res.status(400).send('Timestamp too old');
    const expected = crypto.createHmac('sha256', webhookSecret).update(`${parts.t}.${rawBody}`).digest('hex');
    const match = crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(parts.v1.padEnd(expected.length, '0').slice(0, expected.length), 'hex'));
    if (!match) return res.status(400).send('Signature mismatch');
    event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } else {
    event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const obj = event.data?.object || {};
  console.log(`[stripe-webhook] ${event.type}`);

  try {
    // checkout.session.completed — save order to DB
    if (event.type === 'checkout.session.completed') {
      const email = obj.customer_details?.email;
      const amount = obj.amount_total;
      const currency = obj.currency;
      const sessionId = obj.id;
      await db.query(
        `CREATE TABLE IF NOT EXISTS orders (
          id text PRIMARY KEY,
          customer_email text,
          amount integer,
          currency text,
          status text DEFAULT 'paid',
          created_at timestamptz DEFAULT now()
        )`
      );
      await db.query(
        `INSERT INTO orders (id, customer_email, amount, currency) VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING`,
        [sessionId, email, amount, currency]
      );
    }

    // customer.subscription.created / updated
    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      console.log(`[stripe-webhook] Subscription ${obj.id} status: ${obj.status}`);
    }

    // customer.subscription.deleted
    if (event.type === 'customer.subscription.deleted') {
      console.log(`[stripe-webhook] Subscription ${obj.id} cancelled`);
    }

    res.json({ received: true, type: event.type });
  } catch (e) {
    console.error('[stripe-webhook] Error:', e.message);
    res.status(500).json({ error: e.message });
  }
};
