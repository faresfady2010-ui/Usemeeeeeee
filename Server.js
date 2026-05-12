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

    if (req.method === 'POST' && req.url === '/api/analyze') {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Groq API key not configured on server.' }));
            return;
        }
        try {
            const bodyStr = await readBody(req);
            const incoming = JSON.parse(bodyStr);

            const parts = incoming.contents?.[0]?.parts || [];
            const textPart = parts.find(p => p.text);
            const imagePart = parts.find(p => p.inline_data);

            if (!imagePart) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'This endpoint only accepts image requests.' }));
                return;
            }

            const messages = [{
                role: 'user',
                content: [
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:${imagePart.inline_data.mime_type};base64,${imagePart.inline_data.data}`
                        }
                    },
                    {
                        type: 'text',
                        text: textPart?.text || 'Analyze this image in detail.'
                    }
                ]
            }];

            const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                    messages,
                    max_tokens: 1500
                })
            });

            const groqData = await groqRes.json();

            if (!groqRes.ok) {
                res.writeHead(groqRes.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: groqData.error || 'Groq error' }));
                return;
            }

            const text = groqData.choices?.[0]?.message?.content || 'No response.';
            const geminiFormatResponse = {
                candidates: [{
                    content: { parts: [{ text }] }
                }]
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(geminiFormatResponse));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

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
});
