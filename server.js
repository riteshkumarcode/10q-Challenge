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

const path = require('path');
const fs = require('fs');
const { createServer } = require('http');
const { parse } = require('url');

// Ensure module resolution looks in both root and frontend/node_modules
const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');
if (fs.existsSync(frontendNodeModules) && !module.paths.includes(frontendNodeModules)) {
  module.paths.push(frontendNodeModules);
}

// In IISNode, process.env.PORT is a named pipe string (e.g. \\.\pipe\iisnode-xxx) or a TCP port.
// Do NOT parseInt() because named pipes become NaN.
const port = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, 'frontend');

// Robust build detection: if .next production build is not yet generated,
// automatically fall back to dev mode so the server boots up immediately without crashing.
const hasProductionBuild = fs.existsSync(path.join(frontendDir, '.next', 'BUILD_ID')) || 
                           fs.existsSync(path.join(frontendDir, '.next', 'server'));
const isDev = process.env.NODE_ENV === 'development' || !hasProductionBuild;

console.log(`[10Q Server] Initializing on port/pipe: ${port}, isDev: ${isDev}, hasBuild: ${hasProductionBuild}`);

let next;
try {
  next = require('next');
} catch (e) {
  try {
    next = require(path.join(frontendDir, 'node_modules', 'next'));
  } catch (err2) {
    console.error('Failed to require next from both locations:', e, err2);
  }
}

if (!next) {
  const fallback = createServer((req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:50px auto;padding:24px;border:1px solid #fecaca;background:#fff1f2;border-radius:12px;">
        <h2 style="color:#b91c1c;margin-top:0">10Q Challenge Server - Dependencies Required</h2>
        <p>The <strong>Next.js</strong> package is not installed yet.</p>
        <p>In Plesk, click <strong>"NPM Install"</strong> in the Node.js settings panel, then click <strong>"Restart App"</strong>.</p>
      </div>
    `);
  });
  fallback.listen(port, () => {
    console.log(`Fallback server running on ${port}`);
  });
} else {
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
          console.error('Error handling request:', req.url, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        }
      })
      .once('error', (err) => {
        console.error('Server error:', err);
      })
      .listen(port, () => {
        console.log(`> 10Q Challenge Server ready on ${port}`);
      });
    })
    .catch((err) => {
      console.error('Next.js app prepare error:', err);
      const fallbackServer = createServer((req, res) => {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:50px auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <h2 style="color:#e11d48;margin-top:0">10Q Server Startup Status</h2>
            <p>Next.js prepare encountered an issue:</p>
            <pre style="background:#f1f5f9;padding:12px;border-radius:6px;overflow:auto;font-size:13px">${err.stack || err.message || err}</pre>
            <p style="color:#64748b;font-size:13px">Please ensure dependencies are installed via Plesk <strong>NPM Install</strong> and try restarting.</p>
          </div>
        `);
      });
      fallbackServer.listen(port, () => {
        console.log(`> Diagnostic fallback server listening on ${port}`);
      });
    });
}
