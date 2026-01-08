# PowerMed Frontend

Frontend application for PowerMed e-commerce platform built with React and Vite.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables (Optional)

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001/api
```

**Important Notes:**
- In Vite, environment variables must be prefixed with `VITE_` to be accessible in client-side code
- If you don't create this file, the app will use the default: `http://localhost:5001/api`
- For production, update `VITE_API_URL` to your production API URL
- After creating/updating `.env`, restart the dev server

### 3. Start Development Server

```bash
npm run dev
```

The application will run on `http://localhost:5173` (or the next available port).

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## API Integration

The frontend uses the API utility functions located in `src/utils/api.js`:

```javascript
import { categoryAPI, productAPI } from './utils/api';

// Get all categories
const categories = await categoryAPI.getAll();

// Get all products
const products = await productAPI.getAll();

// Get products by category
const products = await productAPI.getAll({ category: 'category_id' });

// Create a product
const newProduct = await productAPI.create(productData, imageFile);
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── styles/         # CSS files
│   ├── utils/          # Utility functions (API, helpers)
│   └── assets/         # Static assets (images, fonts)
├── public/             # Public assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
