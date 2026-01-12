# Vercel Deployment Guide for PowerMed

## 📋 Deployment Assessment

### ✅ Frontend - READY FOR VERCEL
- ✅ Vite configuration is correct
- ✅ `vercel.json` is properly configured
- ✅ Build script exists (`npm run build`)
- ✅ Environment variables properly prefixed with `VITE_`
- ✅ React Router configured correctly

### ⚠️ Backend - DEPLOY TO RENDER (Recommended)

**Recommended Options:**
1. **Render** (Recommended - Free tier available, easy setup) ✅
2. **Railway** ($5/month after free trial, easier setup)
3. **Vercel Serverless Functions** (Free, but requires refactoring)
4. **Fly.io** (Free tier available)

## 🚀 Deployment Steps

### Option A: Frontend on Vercel + Backend on Railway (Recommended)

#### Step 1: Deploy Frontend to Vercel

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository

3. **Configure Frontend Project**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install`

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
   ⚠️ **Note:** You'll update this after deploying the backend

5. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Note your frontend URL (e.g., `https://powermed.vercel.app`)

#### Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign in with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend Project**
   - **Name:** `powermed-backend` (or your preferred name)
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if you need more resources)

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters
   FRONTEND_URL=https://powermed.vercel.app
   ```
   ⚠️ **Note:** Render auto-sets `PORT`, so you don't need to set it manually

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Wait for deployment to complete (first deploy takes ~5-10 minutes)

5. **Get Backend URL**
   - Once deployed, Render provides a URL like: `https://powermed-backend.onrender.com`
   - Note this URL (it's your backend API base URL)

6. **Update Frontend Environment Variable**
   - Go back to Vercel
   - Settings → Environment Variables
   - Update `VITE_API_URL` to: `https://powermed-backend.onrender.com/api`
   - Redeploy frontend

#### Step 3: Update CORS in Backend
- The backend already reads `FRONTEND_URL` from environment variables
- Make sure it includes your Vercel URL
- Render will automatically redeploy when env vars change
- Go to Render → Your Service → Environment → Update `FRONTEND_URL` → Save Changes

---

### Option B: Both on Vercel (Serverless Functions)

This requires converting Express routes to Vercel serverless functions. More complex but free.

**Would you like me to help set this up?**

---

## 📝 Environment Variables Checklist

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Your backend API URL

### Backend (Render)
- [ ] `NODE_ENV=production`
- [ ] `PORT` - Usually auto-set by platform
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `JWT_SECRET` - Strong random string (32+ characters)
- [ ] `FRONTEND_URL` - Your Vercel frontend URL

---

## 🔍 Pre-Deployment Checklist

### Frontend
- ✅ Build script works: `cd frontend && npm run build`
- ✅ No hardcoded localhost URLs
- ✅ Environment variables use `VITE_` prefix
- ✅ `vercel.json` configured

### Backend
- ✅ Server starts: `cd backend && npm start`
- ✅ MongoDB connection works (use MongoDB Atlas for production)
- ✅ Cloudinary credentials are valid
- ✅ CORS allows production frontend URL
- ✅ JWT_SECRET is set (not using default)

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Make sure `FRONTEND_URL` in backend includes your Vercel URL

### Issue 2: API Not Found (404)
**Solution:** Check that `VITE_API_URL` in frontend points to correct backend URL with `/api` suffix

### Issue 3: Database Connection Fails
**Solution:** 
- Use MongoDB Atlas (cloud) not local MongoDB
- Whitelist Render's IP or use `0.0.0.0/0` in Atlas Network Access
- Render's free tier spins down after 15 minutes of inactivity - first request may take longer

### Issue 4: Images Not Loading
**Solution:** Verify Cloudinary credentials are correct

---

## 🎯 Quick Start Commands

### Test Build Locally First

```bash
# Frontend
cd frontend
npm run build
npm run preview  # Test production build

# Backend
cd backend
npm start  # Test production mode
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Render Free Tier Limitations](https://render.com/docs/free#spinning-down)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

---

## ✅ Post-Deployment Steps

1. **Seed Database**
   - Run `npm run seed:categories` locally pointing to production DB
   - Or create a script endpoint to seed (admin only)

2. **Create Admin User**
   - Run `npm run seed:admin` locally pointing to production DB
   - Or use MongoDB Atlas UI to create admin manually

3. **Test Everything**
   - Test frontend loads
   - Test API calls work
   - Test admin login
   - Test image uploads

4. **Update DNS (Optional)**
   - Add custom domain in Vercel
   - Update `FRONTEND_URL` in backend

---

**Ready to deploy? Start with Option A (Vercel + Render) - it's free and easy! 🚀**

---

## 📝 Render-Specific Notes

### Free Tier Limitations
- **Spins down after 15 minutes of inactivity** - First request after spin-down takes ~30-60 seconds
- **512MB RAM** - Sufficient for most apps
- **Upgrade to paid plan** ($7/month) to avoid spin-downs

### Render Deployment Tips
1. **First Deploy:** Takes 5-10 minutes (building dependencies)
2. **Subsequent Deploys:** Faster (~2-3 minutes)
3. **Auto-Deploy:** Enabled by default on git push to main branch
4. **Health Checks:** Render automatically checks `/` endpoint
5. **Logs:** View real-time logs in Render dashboard

### Keeping Free Tier Alive (Optional)
- Use a cron service like [cron-job.org](https://cron-job.org) to ping your backend every 10 minutes
- Or upgrade to paid plan for always-on service
