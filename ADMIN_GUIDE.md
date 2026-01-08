# Admin Panel Guide

## 🎉 Admin Panel is Ready!

A complete admin panel has been created for managing categories and products.

## 📍 Access the Admin Panel

**URL:** `http://localhost:5173/admin/login`

## 🔐 Default Admin Credentials

**Email:** `admin@powermed.com`  
**Password:** `admin123`

⚠️ **IMPORTANT:** Change the password after first login!

## 🚀 Setup Instructions

### 1. Create Admin User

Run the seed script to create the initial admin user:

```bash
cd backend
npm run seed:admin
```

This will create an admin user with:
- Email: `admin@powermed.com`
- Password: `admin123`
- Role: `admin`

### 2. Add JWT Secret to Backend .env

Add this to your backend `.env` file:

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

For production, use a strong random string (at least 32 characters).

### 3. Start Backend and Frontend

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Login to Admin Panel

1. Go to `http://localhost:5173/admin/login`
2. Enter credentials:
   - Email: `admin@powermed.com`
   - Password: `admin123`
3. Click "Sign In"

## 📋 Admin Panel Features

### Dashboard (`/admin/dashboard`)
- Overview of admin panel
- Quick links to Categories and Products

### Categories Management (`/admin/categories`)
- ✅ View all categories
- ✅ Create new category
- ✅ Edit existing category
- ✅ Delete category (soft delete)
- ✅ See category status (Active/Inactive)

### Products Management (`/admin/products`)
- ✅ View all products with images
- ✅ Create new product (with image upload)
- ✅ Edit existing product (with optional image update)
- ✅ Delete product (soft delete)
- ✅ Manage product details:
  - Name, Brand, Price
  - Category (dropdown selection)
  - Category Type
  - Description
  - Stock
  - Product Image (Cloudinary upload)

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Protected routes (only admins can access)
- ✅ Token stored in localStorage
- ✅ Automatic logout on token expiration
- ✅ Password hashing with bcrypt

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (optional)
- `GET /api/auth/me` - Get current user

### Categories (Protected - Admin Only)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products (Protected - Admin Only)
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (with image)
- `PUT /api/products/:id` - Update product (optional image)
- `DELETE /api/products/:id` - Delete product

## 📝 Notes

- All CRUD operations require admin authentication
- Images are uploaded to Cloudinary automatically
- Deleted items are soft-deleted (isActive = false)
- Token expires after 30 days
- Admin can logout from the sidebar

## 🐛 Troubleshooting

**Can't login?**
- Make sure you ran `npm run seed:admin`
- Check that backend is running
- Verify JWT_SECRET is set in backend .env

**Images not uploading?**
- Check Cloudinary credentials in backend .env
- Verify file size is under 5MB
- Check file format (jpg, png, webp)

**CORS errors?**
- Make sure FRONTEND_URL in backend .env matches your frontend URL
- Check that backend CORS is configured correctly

## 🎨 UI Features

- Modern, clean admin interface
- Responsive design (works on mobile)
- Image preview before upload
- Success/error notifications
- Confirmation dialogs for deletions
- Loading states

Enjoy managing your PowerMed store! 🚀
