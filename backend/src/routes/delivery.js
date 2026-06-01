const express = require('express');
const router = express.Router();
const prisma = require('../config/database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get tracking info
router.get('/:orderId/tracking', authMiddleware, async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId },
      include: {
        deliveryAgent: true,
        tracking: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign delivery agent
router.post('/assign', authMiddleware, roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const { orderId, agentId } = req.body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        deliveryAgentId: agentId,
        status: 'ASSIGNED'
      }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
