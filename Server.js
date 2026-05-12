const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {

    // Gemini proxy endpoint
    if (req.method === 'POST' && req.url === '/api/analyze') {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('[analyze] GEMINI_API_KEY is not set');
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Gemini API key not configured on server.' }));
            return;
        }
        try {
            const bodyStr = await readBody(req);
            console.log('[analyze] Received request, body length:', bodyStr.length);

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const geminiRes = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: bodyStr
            });

            const responseText = await geminiRes.text();
            console.log('[analyze] Gemini status:', geminiRes.status);

            res.writeHead(geminiRes.status, { 'Content-Type': 'application/json' });
            res.end(responseText);
        } catch (e) {
            console.error('[analyze] Error:', e.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

    // Static file serving
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';
    if (urlPath.endsWith('/')) urlPath += 'index.html';

    const filePath = path.join(__dirname, urlPath);
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(content);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Usemee running on port ${PORT}`);
    const apiKey = "AIzaSyBnF4Qb9Lzhh7os9o0km-EulITN_uS5Tr4";
});
