# Sabzi Waala - Complete Setup Guide

A modern, scalable, AI-powered vegetable delivery ecosystem for India.

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Redis** (Optional, for caching) ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/))
- **VS Code** or any code editor

## 🚀 Project Structure

```
sabzi-waala/
├── backend/                    # Node.js Express API
├── frontend/
│   ├── website/               # React.js Web App
│   └── mobile/                # React Native Mobile App
├── admin/                     # Admin Dashboard
├── vendor/                    # Vendor Panel
├── delivery-app/              # Delivery Agent App
├── ai-engine/                 # AI & ML Services
└── docs/                      # Documentation
```

## 🛠 Installation & Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/MohammedAyyanBagban/sabzi-waala.git
cd sabzi-waala
```

### Step 2: Setup PostgreSQL Database

**Create Database:**
```bash
# Windows (Command Prompt as Admin)
psql -U postgres
CREATE DATABASE sabzi_waala;
CREATE USER sabzi_user WITH PASSWORD 'sabzi_password';
ALTER ROLE sabzi_user SET client_encoding TO 'utf8';
ALTER ROLE sabzi_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE sabzi_user SET default_transaction_deferrable TO on;
ALTER ROLE sabzi_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE sabzi_waala TO sabzi_user;
\q
```

**Verify Connection:**
```bash
psql -U sabzi_user -d sabzi_waala -h localhost
```

---

## 📦 Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Environment Configuration

```bash
# Copy example env file
cp .env.example .env
```

**Edit `backend/.env`:**
```env
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://sabzi_user:sabzi_password@localhost:5432/sabzi_waala"

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Razorpay (Get from razorpay.com)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key

# Firebase (Get from firebase.google.com)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id

# WhatsApp (Get from twilio.com)
WHATSAPP_API_URL=https://api.whatsapp.com
WHATSAPP_BEARER_TOKEN=your_whatsapp_token

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
SMTP_FROM=noreply@sabziwaala.com

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=sabzi-waala-images

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Admin Email
ADMIN_EMAIL=admin@sabziwaala.com

# Delivery Settings
DEFAULT_DELIVERY_TIME=30
DEFAULT_DELIVERY_FEE=30
FREE_DELIVERY_THRESHOLD=500
```

### Setup Database Schema

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

### Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

**Backend runs on:** `http://localhost:5000`

---

## 🌐 Frontend Website Setup

### Install Dependencies

```bash
cd frontend/website
npm install
```

### Environment Configuration

```bash
# Create .env file in frontend/website
echo "VITE_API_URL=http://localhost:5000" > .env
```

### Start Development Server

```bash
npm run dev
```

**Website runs on:** `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📱 Mobile App Setup

### React Native Setup

**Prerequisites:**
- Android Studio (for Android emulator)
- Xcode (for iOS simulator on macOS)

### Install Dependencies

```bash
cd frontend/mobile
npm install
```

### Environment Configuration

```bash
# Create .env file
echo "REACT_APP_API_URL=http://10.0.2.2:5000" > .env
```

**Note:** Use `10.0.2.2` instead of `localhost` for Android emulator

### Start Mobile App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Development Server:**
```bash
npm start
```

---

## 🔐 Admin Dashboard Setup

### Install Dependencies

```bash
cd admin
npm install
```

### Environment Configuration

```bash
# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env
```

### Start Admin Dashboard

```bash
npm run dev
```

**Admin runs on:** `http://localhost:3001`

### Default Admin Credentials

```
Email: admin@sabziwaala.com
Password: Admin@123
```

**⚠️ Change these immediately in production!**

---

## 🏪 Vendor Panel Setup

### Install Dependencies

```bash
cd vendor
npm install
```

### Start Vendor Panel

```bash
npm run dev
```

**Vendor Panel runs on:** `http://localhost:3002`

---

## 🚗 Delivery App Setup

### Install Dependencies

```bash
cd delivery-app
npm install
```

### Start Delivery App

```bash
npm run dev
```

**Delivery App runs on:** `http://localhost:3003`

---

## 🤖 AI Engine Setup (Optional)

### Python Environment Setup

```bash
cd ai-engine

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Start AI Services

```bash
python app.py
```

**AI Engine runs on:** `http://localhost:5001`

---

## 🚀 Running All Services Together

### Recommended Approach: Use Multiple Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Website:**
```bash
cd frontend/website
npm run dev
```

**Terminal 3 - Admin:**
```bash
cd admin
npm run dev
```

**Terminal 4 - Mobile (Optional):**
```bash
cd frontend/mobile
npm start
```

### Using concurrently (Optional)

Install globally:
```bash
npm install -g concurrently
```

Create `start-all.js` in root:
```javascript
const { spawn } = require('child_process');

const services = [
  { name: 'Backend', cmd: 'npm', args: ['run', 'dev'], cwd: 'backend' },
  { name: 'Website', cmd: 'npm', args: ['run', 'dev'], cwd: 'frontend/website' },
  { name: 'Admin', cmd: 'npm', args: ['run', 'dev'], cwd: 'admin' }
];

services.forEach(service => {
  const proc = spawn(service.cmd, service.args, {
    cwd: service.cwd,
    stdio: 'inherit'
  });
  
  proc.on('error', (err) => {
    console.error(`${service.name} failed:`, err);
  });
});
```

Run:
```bash
node start-all.js
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/otp/send          - Send OTP
POST   /api/auth/otp/verify        - Verify OTP
```

### Products
```
GET    /api/products               - Get all products
GET    /api/products/:id           - Get product details
POST   /api/products               - Create product (Admin)
PUT    /api/products/:id           - Update product (Admin)
DELETE /api/products/:id           - Delete product (Admin)
```

### Orders
```
POST   /api/orders                 - Create order
GET    /api/orders                 - Get user orders
GET    /api/orders/:id             - Get order details
PUT    /api/orders/:id/status      - Update order status
POST   /api/orders/:id/cancel      - Cancel order
GET    /api/orders/:id/tracking    - Get real-time tracking
```

### Payments
```
POST   /api/payments/razorpay/create   - Create payment order
POST   /api/payments/razorpay/verify   - Verify payment
```

### Users
```
GET    /api/users/profile          - Get user profile
PUT    /api/users/profile          - Update profile
```

### Admin
```
GET    /api/admin/stats            - Get dashboard stats
GET    /api/admin/orders           - Get all orders
GET    /api/admin/users            - Get all users
```

---

## 🔧 Configuration Files

### Backend Configuration Files

**`backend/.env`** - Environment variables (create from .env.example)

**`backend/prisma/schema.prisma`** - Database schema

**`backend/src/config/database.js`** - Database connection

### Frontend Configuration Files

**`frontend/website/.env`** - Website environment

**`frontend/website/src/redux/store.js`** - Redux store setup

### Admin Configuration Files

**`admin/.env`** - Admin environment

---

## 📊 Database Schema

### Users
```sql
- id (UUID)
- name (String)
- phone (String, unique)
- email (String, unique)
- password (String, hashed)
- avatar (String, optional)
- role (Enum: CUSTOMER, VENDOR, DELIVERY_AGENT, ADMIN)
- createdAt, updatedAt
```

### Products
```sql
- id (UUID)
- name (String)
- description (String)
- image (String)
- categoryId (UUID)
- vendorId (UUID)
- basePrice (Float)
- stock (Integer)
- unit (String: kg, gram, piece, bunch)
- isActive (Boolean)
- isSeasonal (Boolean)
```

### Orders
```sql
- id (UUID)
- userId (UUID)
- status (Enum: PENDING, CONFIRMED, PACKED, ASSIGNED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED)
- totalPrice (Float)
- deliveryFee (Float)
- discount (Float)
- paymentMethod (String: RAZORPAY, UPI, COD)
- deliveryAddress (String)
- deliveryAgentId (UUID, optional)
```

---

## 🔐 Security Setup

### JWT Configuration

Update `JWT_SECRET` in `.env`:
```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### CORS Configuration

Edit `backend/src/index.js`:
```javascript
const cors = require('cors')({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
});
```

### Password Hashing

Already implemented with `bcryptjs` in authentication routes.

### Rate Limiting

Already configured in `backend/src/index.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend/website
npm test
```

---

## 📦 Building for Production

### Build Backend
```bash
cd backend
npm run build
```

### Build Website
```bash
cd frontend/website
npm run build
```

### Build Admin
```bash
cd admin
npm run build
```

---

## 🌍 Deployment

### Deployment Checklist
- [ ] Update `NODE_ENV=production` in `.env`
- [ ] Generate secure `JWT_SECRET`
- [ ] Setup production PostgreSQL database
- [ ] Configure Razorpay production keys
- [ ] Configure Firebase production project
- [ ] Update CORS origins for production domain
- [ ] Setup SSL certificate
- [ ] Configure domain name
- [ ] Setup email SMTP server
- [ ] Configure environment variables on server

### Deploy to Hostinger (Recommended)

1. Upload files via FTP/Git
2. Run `npm install --production`
3. Setup environment variables
4. Run database migrations: `npx prisma migrate deploy`
5. Start backend: `npm start`
6. Setup reverse proxy with Nginx/Apache

### Deploy to AWS/Azure/Google Cloud

Follow platform-specific deployment guides.

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
# Test connection:
psql -U sabzi_user -d sabzi_waala -h localhost
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Migration Error
```bash
# Reset database (caution: deletes data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name fix_migration
```

---

## 📚 Useful Commands

```bash
# Backend
npm run dev              # Start development server
npm start               # Start production server
npx prisma studio      # Open Prisma Studio (database UI)
npx prisma migrate dev # Run migrations
npx prisma db seed     # Seed database

# Frontend
npm run dev            # Start dev server
npm run build          # Build for production
npm run preview        # Preview production build

# General
npm install            # Install dependencies
npm update             # Update packages
npm audit              # Check security vulnerabilities
npm run lint           # Run linter
```

---

## 📞 Support & Documentation

- **GitHub:** https://github.com/MohammedAyyanBagban/sabzi-waala
- **Issues:** Report bugs on GitHub Issues
- **Discussion:** Use GitHub Discussions for questions

---

## 📄 License

Proprietary - Sabzi Waala © 2026

---

**Built with ❤️ for fresh, fast, and affordable vegetables in India**
