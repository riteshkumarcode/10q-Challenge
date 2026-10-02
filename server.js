// ES2023 Polyfills for Node.js 18.x and iisnode compatibility
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(compareFn) {
    return [...this].sort(compareFn);
  };
}
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() {
    return [...this].reverse();
  };
}
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function(start, deleteCount, ...items) {
    const copy = [...this];
    copy.splice(start, deleteCount, ...items);
    return copy;
  };
}
if (!Array.prototype.with) {
  Array.prototype.with = function(index, value) {
    const copy = [...this];
    copy[index] = value;
    return copy;
  };
}

// Global safety crash handlers to prevent silent iisnode 500 error
process.on('uncaughtException', (err) => {
  console.error('[10Q Server] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[10Q Server] Unhandled Rejection at:', promise, 'reason:', reason);
});

const path = require('path');
const fs = require('fs');
const { createServer } = require('http');
const { parse } = require('url');

// Determine correct frontend app directory
let frontendDir = __dirname;
if (fs.existsSync(path.join(__dirname, 'frontend', 'app')) || fs.existsSync(path.join(__dirname, 'frontend', 'package.json'))) {
  frontendDir = path.join(__dirname, 'frontend');
}

// Ensure module resolution searches all potential node_modules paths
const possibleNodeModules = [
  path.join(__dirname, 'node_modules'),
  path.join(frontendDir, 'node_modules')
];
possibleNodeModules.forEach(dir => {
  if (fs.existsSync(dir) && !module.paths.includes(dir)) {
    module.paths.push(dir);
  }
});

// In IISNode, process.env.PORT is a named pipe string (e.g. \\.\pipe\iisnode-xxx) or a TCP port.
// Do NOT parseInt() because named pipes become NaN.
const port = process.env.PORT || 3000;

// Production build detection
const hasProductionBuild = 
  fs.existsSync(path.join(frontendDir, '.next', 'BUILD_ID')) || 
  fs.existsSync(path.join(frontendDir, '.next', 'server')) ||
  fs.existsSync(path.join(__dirname, '.next', 'BUILD_ID')) ||
  fs.existsSync(path.join(__dirname, '.next', 'server'));

console.log(`[10Q Server] Initializing on port/pipe: ${port}, dir: ${frontendDir}, hasBuild: ${hasProductionBuild}, NODE_ENV: ${process.env.NODE_ENV}`);

// Try to require Next.js
let next;
try {
  next = require('next');
} catch (e) {
  try {
    next = require(path.join(frontendDir, 'node_modules', 'next'));
  } catch (err2) {
    try {
      next = require(path.join(__dirname, 'node_modules', 'next'));
    } catch (err3) {
      console.error('[10Q Server] Failed to resolve next package:', e.message, err2.message, err3.message);
    }
  }
}

if (!next) {
  const fallback = createServer((req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>10Q Challenge - Dependencies Required</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
          .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; max-width: 600px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
          h2 { color: #f59e0b; margin-top: 0; font-size: 24px; }
          p { color: #cbd5e1; line-height: 1.6; }
          .code { background: #0f172a; padding: 12px 16px; border-radius: 8px; font-family: monospace; font-size: 14px; color: #38bdf8; border: 1px solid #334155; margin: 16px 0; }
          .btn { display: inline-block; background: #0284c7; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 12px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>⚠️ 10Q Challenge Server — Setup Required</h2>
          <p>The <strong>Next.js</strong> framework package has not been installed on the server yet.</p>
          <p><strong>To resolve this in Plesk:</strong></p>
          <div class="code">1. Go to Plesk &rarr; <strong>Node.js</strong><br>2. Click <strong>"NPM Install"</strong><br>3. Click <strong>"Restart App"</strong></div>
          <p>Or in Plesk Git Deployment Actions / Terminal run:</p>
          <div class="code">cd frontend && npm install && npm run build</div>
        </div>
      </body>
      </html>
    `);
  });
  fallback.listen(port, () => {
    console.log(`[10Q Server] Fallback server listening on ${port}`);
  });
} else if (!hasProductionBuild && process.env.NODE_ENV === 'production') {
  // Production environment but .next folder was not generated/uploaded
  const fallback = createServer((req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>10Q Challenge - Build Required</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
          .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; max-width: 600px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
          h2 { color: #38bdf8; margin-top: 0; font-size: 24px; }
          p { color: #cbd5e1; line-height: 1.6; }
          .code { background: #0f172a; padding: 12px 16px; border-radius: 8px; font-family: monospace; font-size: 14px; color: #4ade80; border: 1px solid #334155; margin: 16px 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>🚀 10Q Challenge Server — Build Required</h2>
          <p>The Next.js production build files (<code>.next</code> folder) were not found on the live server.</p>
          <p><strong>To generate the production build:</strong></p>
          <p>In Plesk, open <strong>Git</strong> &rarr; <strong>Additional Deployment Actions</strong> or open Terminal and run:</p>
          <div class="code">cd frontend<br>npm install<br>npm run build</div>
          <p>Then restart the Node.js application in Plesk.</p>
        </div>
      </body>
      </html>
    `);
  });
  fallback.listen(port, () => {
    console.log(`[10Q Server] Build-check fallback server listening on ${port}`);
  });
} else {
  const isDev = process.env.NODE_ENV === 'development';
  const app = next({
    dev: isDev,
    dir: frontendDir
  });
  const handle = app.getRequestHandler();

  app.prepare()
    .then(() => {
      createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error('[10Q Server] Error handling request:', req.url, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        }
      })
      .once('error', (err) => {
        console.error('[10Q Server] Server error:', err);
      })
      .listen(port, () => {
        console.log(`> [10Q Server] Ready on ${port}`);
      });
    })
    .catch((err) => {
      console.error('[10Q Server] Next.js app prepare error:', err);
      const fallbackServer = createServer((req, res) => {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>10Q Server Startup Status</title>
            <style>
              body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px 20px; }
              .card { max-width: 650px; margin: 0 auto; background: #1e293b; border: 1px solid #e11d48; border-radius: 12px; padding: 24px; }
              h2 { color: #f43f5e; margin-top: 0; }
              pre { background: #0f172a; color: #fca5a5; padding: 14px; border-radius: 8px; overflow: auto; font-size: 13px; line-height: 1.5; border: 1px solid #334155; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>10Q Challenge — Server Startup Diagnostics</h2>
              <p>Next.js prepare encountered an issue during startup:</p>
              <pre>${err.stack || err.message || err}</pre>
              <p style="color:#94a3b8;font-size:14px">Please run <code>cd frontend && npm install && npm run build</code> and restart the application.</p>
            </div>
          </body>
          </html>
        `);
      });
      fallbackServer.listen(port, () => {
        console.log(`> [10Q Server] Diagnostic fallback server listening on ${port}`);
      });
    });
}
