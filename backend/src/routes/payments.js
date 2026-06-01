const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const { authMiddleware } = require('../middleware/auth');
const prisma = require('../config/database');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY
});

// Create Razorpay order
router.post('/razorpay/create', authMiddleware, async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: orderId,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/razorpay/verify', authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Verify signature
    const crypto = require('crypto');
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (expectedSignature === signature) {
      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'CONFIRMED', paymentId }
      });

      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
