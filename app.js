const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  console.log('Waiting for 5 minutes...');
  
  setTimeout(() => {
    console.log('5 minutes elapsed. Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  }, 5 * 60 * 1000); // 5 minutes
});
