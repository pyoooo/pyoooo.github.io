const http = require('http');
const fs = require('fs');
const path = require('path');
const concurrently = require('concurrently');

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.ico': 'image/x-icon'
};

// Simple static file server
function createServer() {
    const server = http.createServer((req, res) => {
        console.log(`${req.method} ${req.url}`);
        
        // Parse URL
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './dist/index.html';
        } else if (!filePath.startsWith('./dist/')) {
            filePath = './dist' + req.url;
        }
        
        // Get file extension
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeType = mimeTypes[extname] || 'application/octet-stream';
        
        // Read and serve file
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    // File not found
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                } else {
                    // Server error
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code} ..\n`);
                }
            } else {
                // Success
                res.writeHead(200, { 'Content-Type': mimeType });
                res.end(content, 'utf-8');
            }
        });
    });
    
    const port = 3000;
    server.listen(port, () => {
        console.log(`\n🚀 Wave Dating Website - Simple Dev Server`);
        console.log(`📱 Local: http://localhost:${port}`);
        console.log(`📁 Serving: ./dist/`);
        console.log(`\n💡 Tip: The server doesn't auto-reload. Refresh manually after changes.\n`);
    });
}

// Run file watcher and simple server concurrently
concurrently([
    { command: 'node scripts/sb-watch.js', name: 'WATCH', prefixColor: 'bgBlue.bold' }
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
}).then(() => {
    createServer();
}, (error) => {
    console.error('Failed to start watcher:', error);
    createServer(); // Start server anyway
}); 