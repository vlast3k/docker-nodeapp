const http = require('http');
const fs = require('fs');
const path = require('path');

function createFiles(baseDir = '.', fileCount = 500000, fileSize = 1024) {
    const buffer = Buffer.alloc(fileSize, 'A');  // Fills the file with character 'A'

    for (let i = 0; i < fileCount; i++) {
        const filePath = path.join(baseDir, `file_${i}.txt`);
        fs.writeFileSync(filePath, buffer);
    }

    console.log(`${fileCount} files created successfully!`);
}

// Use the function
createFiles('.');  // This will create files in a 'data' directory

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
