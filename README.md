# Diceymio - Board Game Ecommerce Platform

A lightweight ecommerce platform for selling board games, built with Express.js backend and Next.js frontend.

## Features

- **User Authentication**: Secure signup/login with JWT
- **Product Catalog**: Browse board games
- **Shopping Cart**: Add/remove items from cart
- **Checkout & Payments**: Secure payment processing
- **Order Management**: View order history
- **Admin Dashboard**:
  - Upload/manage products
  - View and manage orders
  - Update order status

## Tech Stack

- **Backend**: Express.js + TypeScript + Prisma ORM
- **Frontend**: Next.js + React + TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Payment**: Stripe/SSLCommerz
- **File Storage**: AWS S3 (for product images)

## Project Structure

```
diceymio/
├── apps/
│   ├── api/          # Express backend
│   └── web/          # Next.js frontend
├── packages/
│   └── tsconfig/     # Shared TypeScript config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Redis (optional, for queues)

### Setup

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Configure environment**

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

3. **Setup database**

   ```bash
   yarn prisma:migrate
   yarn prisma:seed
   ```

4. **Run development**
   ```bash
   yarn dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove item from cart

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/admin/orders/:id` - Update order status (admin)

## License

MIT
