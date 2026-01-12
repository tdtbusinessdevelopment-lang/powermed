# Render Deployment Guide for PowerMed Backend

## 🚀 Quick Start: Deploy Backend to Render

### Prerequisites
- ✅ GitHub repository with your code
- ✅ MongoDB Atlas account (free tier works)
- ✅ Cloudinary account (free tier works)
- ✅ Vercel account (for frontend)

---

## Step-by-Step Guide

### Step 1: Prepare Your Backend

Your backend is already configured! Just make sure:
- ✅ `package.json` has `"start": "node server.js"`
- ✅ `server.js` exports the Express app
- ✅ Environment variables are used (not hardcoded)

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Verify your email

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Authorize Render to access your repo

### Step 4: Configure Service

Fill in the form:

```
Name: powermed-backend
Region: Choose closest to your users (e.g., Oregon, US)
Branch: main (or your default branch)
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free (or Paid for always-on)
```

### Step 5: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/powermed?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_random_string
FRONTEND_URL=https://your-frontend.vercel.app
```

**Important Notes:**
- `PORT` is auto-set by Render (don't add it manually)
- Replace all placeholder values with your actual credentials
- `FRONTEND_URL` should be your Vercel frontend URL

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes first time)
3. Watch the logs for any errors

### Step 7: Get Your Backend URL

Once deployed, Render provides:
- **URL:** `https://powermed-backend.onrender.com`
- **API Base:** `https://powermed-backend.onrender.com/api`

### Step 8: Update Frontend

1. Go to Vercel dashboard
2. Your project → Settings → Environment Variables
3. Update `VITE_API_URL` to: `https://powermed-backend.onrender.com/api`
4. Redeploy frontend

### Step 9: Update Backend CORS

1. Go to Render dashboard
2. Your service → Environment
3. Update `FRONTEND_URL` with your Vercel URL
4. Save changes (auto-redeploys)

---

## 🔧 Render Configuration Details

### Build & Start Commands

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

Render will:
1. Run `npm install` (build command)
2. Run `npm start` (start command)
3. Your app should listen on the port Render provides (via `process.env.PORT`)

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `CLOUDINARY_CLOUD_NAME` | Yes | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Your Cloudinary API secret |
| `JWT_SECRET` | Yes | Random string (32+ characters) |
| `FRONTEND_URL` | Yes | Your Vercel frontend URL |
| `PORT` | No | Auto-set by Render |

---

## ⚠️ Render Free Tier Limitations

### Spinning Down
- **Spins down after 15 minutes of inactivity**
- **First request after spin-down:** Takes 30-60 seconds to wake up
- **Solution:** Upgrade to paid ($7/month) or use cron job to ping every 10 minutes

### Resource Limits
- **512MB RAM** - Usually sufficient
- **0.1 CPU** - Basic processing power
- **Unlimited bandwidth** - Good for most apps

### Upgrade Options
- **Starter Plan:** $7/month - Always on, 512MB RAM
- **Standard Plan:** $25/month - Always on, 2GB RAM

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Check:**
- Build logs in Render dashboard
- Ensure `package.json` has correct scripts
- Verify all dependencies are in `package.json`

**Common Fixes:**
```bash
# Test locally first
cd backend
npm install
npm start
```

### Issue: Service Won't Start

**Check:**
- Start command is correct: `npm start`
- `server.js` exports the app correctly
- Port is not hardcoded (use `process.env.PORT`)

**Verify:**
```javascript
// In server.js - should be:
const PORT = process.env.PORT || 5001;
app.listen(PORT, ...);
```

### Issue: Database Connection Fails

**Solutions:**
1. Use MongoDB Atlas (not local MongoDB)
2. Whitelist IP: In Atlas → Network Access → Add `0.0.0.0/0` (allows all IPs)
3. Check connection string format
4. Verify username/password are correct

### Issue: CORS Errors

**Solution:**
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Include protocol: `https://your-app.vercel.app`
- No trailing slash

### Issue: Slow First Request

**Cause:** Free tier spin-down
**Solution:** 
- Wait 30-60 seconds for first request
- Or upgrade to paid plan
- Or use cron job to keep alive

---

## 📊 Monitoring & Logs

### View Logs
1. Go to Render dashboard
2. Click your service
3. Click **"Logs"** tab
4. View real-time logs

### Health Checks
- Render automatically checks your `/` endpoint
- If it returns 200 OK, service is healthy
- Your backend already has: `app.get("/", ...)` ✅

---

## 🔄 Auto-Deploy

Render auto-deploys when you push to your connected branch:
1. Push to GitHub: `git push origin main`
2. Render detects changes
3. Automatically rebuilds and redeploys
4. Check logs for deployment status

---

## 🎯 Post-Deployment Checklist

- [ ] Backend URL is accessible
- [ ] Test API endpoint: `https://your-backend.onrender.com/api/categories`
- [ ] Frontend `VITE_API_URL` updated
- [ ] CORS configured correctly
- [ ] Database connection works
- [ ] Admin login works
- [ ] Image uploads work (Cloudinary)

---

## 💡 Pro Tips

1. **Keep Free Tier Alive:** Use [cron-job.org](https://cron-job.org) to ping your backend every 10 minutes
2. **Monitor Logs:** Check Render logs regularly for errors
3. **Environment Variables:** Use Render's environment variable management (not `.env` files)
4. **Custom Domain:** Add custom domain in Render settings (optional)
5. **Backup:** Keep your MongoDB Atlas backups enabled

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/node-version)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

---

**Your backend is now live on Render! 🎉**
