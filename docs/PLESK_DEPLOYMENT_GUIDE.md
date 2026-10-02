# 🚀 Plesk Deployment & Troubleshooting Guide — 10Q Challenge Platform

This guide outlines how to configure, deploy, and troubleshoot the **10Q Challenge Platform** on a **Plesk Server** (Windows IISNode or Linux Passenger).

---

## 📋 1. Prerequisites on Plesk
Ensure your Plesk control panel has the **Node.js** extension and **Git** extension enabled.
- **Node.js Version**: Select **Node.js 20.x** (or `18.18+` / `22.x`) in Plesk.

---

## 🛠️ 2. Recommended Plesk Node.js Settings

In your Plesk Domain Dashboard:
1. Click **Node.js**
2. Configure the following fields:
   - **Application Root**: `/httpdocs` (or `/httpdocs/frontend` if pointed directly to frontend folder)
   - **Document Root**: `httpdocs` (or `httpdocs/frontend/public`)
   - **Application Startup File**: `server.js` (or `app.js`)
   - **Node.js Version**: `20.x`
   - **Application Mode**: `production`
   - **Environment Variables**:
     - `PORT`: `3000` (IISNode manages named pipes automatically)
     - `NODE_ENV`: `production`

---

## 🔄 3. Plesk Git Automatic Build Configuration

When pulling code from GitHub via Plesk Git, Next.js requires dependencies and production build files (`.next` directory):

1. Go to **Websites & Domains** → **Git**.
2. Click **Repository Settings** or **Additional Deployment Actions**.
3. Set the deployment actions script:

### For Windows Plesk Server (cmd / PowerShell / bash):
```bash
# Navigate to frontend and build production bundle
cd frontend
npm install
npm run build
```

### For Linux Plesk Server (Passenger):
```bash
cd frontend
npm install
npm run build

# Touch restart trigger for Phusion Passenger
mkdir -p tmp
touch tmp/restart.txt
```

---

## 🛑 4. Fixing "500 - Internal server error" on Live Site

If you see `500 - Internal server error. There is a problem with the resource you are looking for, and it cannot be displayed`, follow these 4 quick fixes:

### Fix 1: Build the Next.js Production Bundle
By default, `.next` is ignored by Git. If the project was pulled without building, `server.js` will show a diagnostic notice or IISNode will fail.
- Open **Plesk** → **Node.js**.
- Click **"NPM Install"**.
- Open Plesk Terminal or SSH and run:
  ```bash
  cd frontend
  npm install
  npm run build
  ```
- Click **"Restart App"** in the Node.js settings panel.

### Fix 2: Verify `web.config` is Present (Windows IIS)
On Windows Plesk, IIS needs `web.config` in the root folder to route traffic to Node.js / `server.js`.
- The repository includes a production-ready `web.config` with detailed error reporting and iisnode routing.
- Ensure `web.config` exists in your `httpdocs/` directory.

### Fix 3: Check Exact IISNode Logs
IISNode writes the exact JavaScript error stack trace to log files on your server:
- Open Plesk **File Manager**.
- Navigate to `httpdocs/iisnode/` (or `httpdocs/frontend/iisnode/`).
- Open the latest `*.txt` log file (e.g. `SERVERNAME-xxxx-stderr-*.txt`) to view the exact runtime error.

### Fix 4: Set Node.js Version to 20.x
- Next.js 16 and React 19 require modern Node.js APIs (Node >= 18.18 / 20.x).
- In Plesk **Node.js**, ensure the version is set to **Node.js 20.x** (not 14.x or 16.x).

---

## ⚡ 5. Pushing Local Updates to Live Server

Whenever you make changes on your local machine:
```bash
git add .
git commit -m "Fix configuration and deployment"
git push origin main
```
Then in **Plesk Git**, click **"Pull Updates"**.
