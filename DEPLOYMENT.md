# Deployment Recommendations for PowerMed

## Frontend: Vercel ✅

**Why Vercel:**
- Perfect for React/Vite apps
- Automatic deployments from GitHub
- Global CDN
- Free tier with generous limits
- Zero configuration needed

**Setup:**
1. Connect your GitHub repo to Vercel
2. Root directory: `frontend`
3. Framework: Vite (auto-detected)
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy!

The `vercel.json` file is already configured for you.

## Backend: Recommendations

### Option 1: Railway (Recommended)
- Easy Node.js deployment
- Simple environment variable management
- $5/month after free trial
- Just connect GitHub, set root to `backend`, add env vars

### Option 2: Render
- Free tier available
- Good for Node.js apps
- Similar setup to Railway

### Option 3: Heroku
- Classic choice, reliable
- Free tier discontinued, paid plans available

## Environment Variables Needed

### Backend (.env)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel Environment Variables)
```
VITE_API_URL=https://your-backend-url.com/api
```

## Quick Steps

1. **Deploy Frontend to Vercel:**
   - Import repo → Set root: `frontend` → Add `VITE_API_URL` → Deploy

2. **Deploy Backend (Railway/Render):**
   - Import repo → Set root: `backend` → Add all env vars → Deploy

3. **Update CORS:**
   - Add your Vercel URL to backend's `FRONTEND_URL`
   - Redeploy backend

4. **Seed Categories:**
   - Run `npm run seed:categories` locally pointing to production DB, or SSH into your backend server

Done! 🎉
