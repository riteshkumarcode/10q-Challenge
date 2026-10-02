# 🚀 Plesk Deployment Guide — 10Q Challenge Platform

This guide outlines how to deploy the **10Q Challenge Platform** on a **Plesk Server** so that every time you push to GitHub, your site updates and goes live instantly.

---

## 📋 1. Prerequisites on Plesk
Ensure your Plesk control panel has the **Node.js** extension and **Git** extension enabled.
- **Node.js Version**: Select **Node.js 18.x, 20.x, or 22.x** in Plesk.

---

## 🛠️ 2. Plesk Node.js Configuration Settings

In your Plesk Domain Dashboard:
1. Click **Node.js**
2. Configure the following fields:
   - **Document Root**: `httpdocs/frontend/public` (or `httpdocs/public` if deployed directly)
   - **Application Root**: `httpdocs/frontend` (or `httpdocs`)
   - **Application Startup File**: `server.js` (or `node_modules/next/dist/bin/next` with argument `start`)
   - **Node.js Version**: `20.x` (or `18.x`+)
   - **Application Mode**: `production`
   - **Environment Variables**:
     - `PORT`: `3000` (or leave default for Plesk Passenger)
     - `NODE_ENV`: `production`

---

## 🔄 3. Setting Up Plesk Git (Automatic Pull & Deploy)

1. In Plesk, go to **Websites & Domains** → **Git**.
2. Click **Add Repository**.
3. Choose **Remote Git hosting** (GitHub):
   - **Repository URL**: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
   - **Branch**: `main`
4. In **Additional Deployment Actions**, add the following build script:

```bash
# Navigate to frontend directory and build production bundle
cd frontend
npm install
npm run build

# Notify Plesk Passenger / Node.js to restart and serve latest version
mkdir -p tmp
touch tmp/restart.txt
```

5. Click **OK** / **Deploy**.

---

## ⚡ 4. Pushing Updates to GitHub (How to update live site)

Whenever you make changes on your local machine:
```bash
git add .
git commit -m "Update feature or course data"
git push origin main
```
Then in **Plesk Git**, click **Pull Updates** (or set up a GitHub Webhook to automatically deploy on push!).

---

## 🎯 5. Quick Verification
- Public Website: `https://yourdomain.com`
- Admin Panel: `https://yourdomain.com/admin` (Harshal Jain Master Admin)
- Student Portal: `https://yourdomain.com/student/dashboard`
