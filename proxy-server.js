const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({
  target: 'https://chatgpt.com', // Target URL
  changeOrigin: true, // Change the origin of the host header to the target URL
  secure: true, // Verify SSL certificates
});

const server = http.createServer((req, res) => {
  console.log(`Proxying request: ${req.method} ${req.url}`);

  proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong while proxying the request.');
  });

  proxy.web(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});