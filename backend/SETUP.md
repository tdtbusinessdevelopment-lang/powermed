# Quick Setup Guide

## Step 1: Create Backend .env File

Create a `.env` file in the `backend` directory with the following content:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/powermed
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## Step 2: Get Cloudinary Credentials

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account
3. Go to Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret
5. Paste them into your `.env` file

## Step 3: Setup MongoDB

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/powermed`

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your actual password
5. Use: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/powermed?retryWrites=true&w=majority`

## Step 4: Install Dependencies & Run

```bash
cd backend
npm install
npm run seed:categories
npm run dev
```

Your backend should now be running on http://localhost:5001

## Step 5: Setup Frontend .env File (Optional but Recommended)

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001/api
```

**Note:** 
- In Vite, environment variables must be prefixed with `VITE_` to be exposed to client-side code
- If you don't create this file, the frontend will use the default: `http://localhost:5001/api`
- For production, update this to your production API URL

## Step 6: Test the API

You can test the endpoints using:
- Postman
- curl
- Your frontend application

Example:
```bash
# Get all categories
curl http://localhost:5001/api/categories

# Get all products
curl http://localhost:5001/api/products
```
