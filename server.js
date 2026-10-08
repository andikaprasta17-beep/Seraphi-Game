/**
 * SERAPHI GAME — Production Entry Point for Hypercloudhost (cPanel / Phusion Passenger)
 *
 * This server file initializes the Next.js production server, respects process.env.PORT,
 * and handles HTTP requests forwarded by Phusion Passenger / Reverse Proxy.
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// 1. Ensure production environment by default
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const dev = process.env.NODE_ENV !== 'production';

// 2. Read port dynamically from process.env.PORT (Passenger socket or TCP port, fallback 3000)
// Do NOT hardcode the port; Passenger assigns dynamic ports or Unix domain sockets.
const port = process.env.PORT ? (isNaN(process.env.PORT) ? process.env.PORT : parseInt(process.env.PORT, 10)) : 3000;

// 3. Initialize Next.js app
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(`[SERAPHI GAME] Starting server in ${process.env.NODE_ENV} mode...`);

app.prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('[SERAPHI GAME] Error handling request:', req.url, err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      }
    });

    server.once('error', (err) => {
      console.error('[SERAPHI GAME] Fatal Server Error:', err);
      process.exit(1);
    });

    server.listen(port, () => {
      console.log(`[SERAPHI GAME] Ready and listening on port ${port} (NODE_ENV=${process.env.NODE_ENV})`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('[SERAPHI GAME] SIGTERM received. Closing HTTP server gracefully...');
      server.close(() => {
        console.log('[SERAPHI GAME] HTTP server closed.');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('[SERAPHI GAME] SIGINT received. Closing HTTP server gracefully...');
      server.close(() => {
        console.log('[SERAPHI GAME] HTTP server closed.');
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error('[SERAPHI GAME] Failed to prepare Next.js app:', err);
    process.exit(1);
  });
