const express = require('express');
const router = express.Router();
const prisma = require('../config/database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          category ? { categoryId: category } : {},
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } }
            ]
          } : {}
        ]
      },
      include: { category: true, variants: true },
      skip,
      take: limit
    });

    const total = await prisma.product.count();

    res.json({ products, total, page, limit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true, variants: true }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (Admin only)
router.post('/', authMiddleware, roleMiddleware(['ADMIN', 'VENDOR']), async (req, res) => {
  try {
    const { name, description, image, categoryId, basePrice, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        image,
        categoryId,
        basePrice: parseFloat(basePrice),
        stock: parseInt(stock),
        vendorId: req.user.id
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
