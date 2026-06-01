# Sabzi Waala Backend API

Node.js + Express REST API for the Sabzi Waala vegetable delivery platform.

## Setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/otp/send` - Send OTP
- `POST /api/auth/otp/verify` - Verify OTP

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status
- `POST /api/orders/:id/cancel` - Cancel order

### Payments
- `POST /api/payments/razorpay/create` - Create Razorpay order
- `POST /api/payments/razorpay/verify` - Verify payment

### Delivery
- `GET /api/orders/:id/tracking` - Get real-time tracking
- `POST /api/delivery/assign` - Assign delivery agent

## Environment Variables

See `.env.example` for all required environment variables.

## Database Schema

See `database/schema.sql` for complete database structure.
