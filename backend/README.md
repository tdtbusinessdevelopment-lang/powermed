# PowerMed Backend API

Backend server for PowerMed e-commerce platform built with Express.js, MongoDB, and Cloudinary.

## Features

- **MongoDB** for database storage (Categories and Products)
- **Cloudinary** for image storage and management
- **RESTful API** with CRUD operations for Categories and Products
- **Environment-based configuration** using `.env` file

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/powermed
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/powermed?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. MongoDB Setup

Make sure MongoDB is running locally, or use MongoDB Atlas and update the `MONGODB_URI` in your `.env` file.

### 4. Cloudinary Setup

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your `.env` file

### 5. Seed Initial Categories

Run the seed script to populate the database with 10 initial categories:

```bash
npm run seed:categories
```

### 6. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5001` (or the port specified in your `.env` file).

## API Endpoints

### Categories

- `GET /api/categories` - Get all active categories
- `GET /api/categories/:id` - Get a single category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Soft delete a category (sets isActive to false)

### Products

- `GET /api/products` - Get all products (supports query params: `category`, `search`, `isActive`)
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (requires `image` file upload)
- `PUT /api/products/:id` - Update a product (optional `image` file upload)
- `DELETE /api/products/:id` - Soft delete a product (sets isActive to false)

## Data Models

### Category

```javascript
{
  name: String (required, unique),
  slug: String (auto-generated),
  description: String,
  image: String (Cloudinary URL),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Product

```javascript
{
  name: String (required),
  brand: String (default: "PowerMed"),
  price: Number (required),
  category: ObjectId (required, references Category),
  image: String (required, Cloudinary URL),
  categoryType: String,
  description: String,
  stock: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Example API Requests

### Create a Category

```bash
POST /api/categories
Content-Type: application/json

{
  "name": "Weight Management & Metabolic Support Peptides",
  "description": "Peptides designed to support weight management"
}
```

### Create a Product

```bash
POST /api/products
Content-Type: multipart/form-data

{
  "name": "Semaglutide",
  "price": 2775.00,
  "category": "category_id_here",
  "categoryType": "GLP-1 analog",
  "description": "Supports appetite management",
  "image": <file>
}
```

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary configuration
├── models/
│   ├── Category.js        # Category model
│   └── Product.js         # Product model
├── routes/
│   ├── categoryRoutes.js  # Category endpoints
│   └── productRoutes.js   # Product endpoints
├── scripts/
│   └── seedCategories.js  # Seed script for initial categories
├── server.js              # Main server file
└── package.json
```
