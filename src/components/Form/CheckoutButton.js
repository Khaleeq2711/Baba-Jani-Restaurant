// CheckoutButton.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51POgeEP95vCoaGtreAgENxVWU5l8vToFjDeyVuO8M8VMibKcHij69xuzyxVUIUtR0hX0wtSl5c62Q18IQbTK11de00qkL0jHJW');

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'prctbl_1PcVbSP95vCoaGtrnbkcVaE9', // Replace with the Price ID from Stripe Dashboard
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: 'http://localhost:3000//success',
      cancelUrl: 'http://localhost:3000//cancel',
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <button role="link" onClick={handleCheckout}>
      Stripe Checkout
    </button>
  );
};

export default CheckoutButton;
