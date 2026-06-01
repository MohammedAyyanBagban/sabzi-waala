# Sabzi Waala 🥬

**Fresh • Fast • Affordable • Smart**

A modern, scalable, AI-powered vegetable delivery ecosystem for India.

## 🎯 Project Overview

Sabzi Waala is a quick-commerce vegetable delivery platform focused initially on Kalaburagi, Karnataka, with future expansion capability across multiple cities. The platform delivers fresh vegetables in 30 minutes with an intelligent, franchise-ready architecture.

### Key Features
- ⚡ 30-minute express delivery
- 🤖 AI-powered recommendations & demand prediction
- 💳 Multiple payment options (UPI, Razorpay, CoD)
- 🎁 Rewards & loyalty system
- 📱 Native mobile apps + responsive website
- 🌍 Multi-language support (English, Kannada)
- 🚀 Scalable to 10,000+ concurrent users

## 📁 Project Structure

```
sabzi-waala/
├── backend/                          # Node.js + Express APIs
├── frontend/
│   ├── website/                      # React.js Website
│   └── mobile/                       # React Native App
├── admin/                            # Admin Dashboard
├── vendor/                           # Vendor Panel
├── delivery-app/                     # Delivery Agent App
├── ai-engine/                        # AI & ML Services
├── docker/                           # Docker configurations
├── .github/                          # GitHub workflows
├── docs/                             # Documentation
└── package.json
```

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js, Express.js, PostgreSQL, Prisma |
| **Website** | React.js, Tailwind CSS |
| **Mobile** | React Native, Expo |
| **Admin/Vendor** | React.js, Material-UI |
| **Real-time** | Socket.io, Redis |
| **Payment** | Razorpay |
| **Notifications** | Firebase, WhatsApp API |
| **AI/ML** | TensorFlow, Collaborative Filtering |
| **Infrastructure** | Docker, GitHub Actions, Hostinger |

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/MohammedAyyanBagban/sabzi-waala.git
cd sabzi-waala

# Setup Backend
cd backend && npm install && npm run dev

# Setup Website
cd ../frontend/website && npm install && npm start

# Setup Mobile
cd ../mobile && npm install && npm start

# Setup Admin
cd ../../admin && npm install && npm start
```

## 📊 Key Modules

- **User Management** - Authentication, profiles, loyalty
- **Product Catalog** - Vegetables, pricing, inventory
- **Order Management** - Cart, checkout, tracking
- **Payment Processing** - Razorpay integration
- **Delivery System** - GPS tracking, route optimization
- **Analytics** - Sales, user behavior, demand prediction
- **Admin Controls** - Inventory, campaigns, support
- **AI Engine** - Recommendations, demand forecasting

## 📚 Documentation

See `/docs` directory for:
- API Documentation
- Database Schema
- Setup Guides
- Architecture Overview
- Deployment Instructions

## 🔐 Security

- JWT authentication
- Role-based access control
- Encrypted payments
- GDPR compliance
- Rate limiting

---

**Built with ❤️ for fresh, fast, and affordable vegetables**
