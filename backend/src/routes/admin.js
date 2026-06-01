const express = require('express');
const router = express.Router();
const prisma = require('../config/database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get dashboard stats
router.get('/stats', authMiddleware, roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { totalPrice: true }
    });

    const stats = {
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalPrice || 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
