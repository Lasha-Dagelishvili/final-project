import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe('sk_test_51QiiTNLBMNfIO9EfMTVhvwvKD8BHzem1IuStjAY0A5IeKGZUmV9UQPeLakEhGW2dtbkA7HxdI39N7x2CkObtAw3v00OIw2SF98');

app.use(cors());
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
