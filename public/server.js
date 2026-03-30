const http = require('http');
const fs = require('fs');
const path = require('path');

// Get the current directory
const currentDir = __dirname;
console.log(`Current directory: ${currentDir}`);

const server = http.createServer((req, res) => {
    // Log all requests
    console.log(`Request received: ${req.method} ${req.url}`);

    // Check if this is an API request
    if (req.url.startsWith('/api')) {
        console.log('API request detected');

        // Handle DeepSeek API requests
        if (req.url.includes('deepseek')) {
            console.log('DeepSeek API request detected');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'DeepSeek API key is valid: sk-8e236ab6e5c54ec5a4c9b5946a6ab668',
                apiKey: 'sk-8e236ab6e5c54ec5a4c9b5946a6ab668'
            }));
            return;
        }

        // Handle Gemini API requests
        if (req.url.includes('gemini')) {
            console.log('Gemini API request detected');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'Gemini API key is valid: AIzaSyBaqm3dC2SOspSEfQzNPXyDe_TKO6l-EN8',
                apiKey: 'AIzaSyBaqm3dC2SOspSEfQzNPXyDe_TKO6l-EN8'
            }));
            return;
        }

        // Handle Convex API requests
        if (req.url.includes('convex')) {
            console.log('Convex API request detected');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'Convex URL is valid: https://handsome-chickadee-122.convex.cloud',
                url: 'https://handsome-chickadee-122.convex.cloud'
            }));
            return;
        }

        // Default API response
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'API endpoint not found' }));
        return;
    }

    // Get the file path for static files
    let filePath = path.join(currentDir, req.url === '/' ? 'index.html' : req.url);
    console.log(`Requested file: ${filePath}`);

    // Get the file extension
    const extname = path.extname(filePath);

    // Set the content type based on the file extension
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                console.error(`File not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 - Page Not Found');
            } else {
                // Some server error
                console.error(`Server error: ${err.code}`);
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            console.log(`Serving: ${filePath} (${contentType})`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
    console.log(`Available pages:`);
    console.log(`- Home page: http://localhost:${PORT}`);
    console.log(`- Workspace: http://localhost:${PORT}/workspace.html`);
});
