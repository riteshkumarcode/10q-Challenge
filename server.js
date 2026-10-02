// Root Plesk Startup File for 10Q Challenge
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

// Points to frontend Next.js directory
const frontendDir = path.join(__dirname, 'frontend');

const app = next({ dev, hostname, port, dir: frontendDir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> 10Q Challenge Production Server running on port ${port}`);
  });
});
