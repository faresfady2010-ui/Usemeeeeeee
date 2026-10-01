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
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && (req.url === '/api/chat' || req.url === '/api/translate')) {
        try {
            const incoming = JSON.parse(await readBody(req));
            let messages;
            let maxTokens = 1200;

            if (req.url === '/api/chat') {
                const message = typeof incoming.message === 'string' ? incoming.message.trim() : '';
                if (!message || message.length > 4000) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Provide a message no longer than 4000 characters.' }));
                    return;
                }

                const history = Array.isArray(incoming.history) ? incoming.history
                    .filter(item => ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
                    .slice(-10)
                    .map(item => ({ role: item.role, content: item.content.slice(0, 4000) })) : [];
                messages = [
                    {
                        role: 'system',
                        content: 'You are Usemee, a practical business advisor for founders and small businesses. Answer the question directly, explain unfamiliar terms, and give actionable steps or a short example when useful. Support questions across business sectors (such as technology, retail, food, healthcare, education, finance, manufacturing, agriculture, and professional services) and business types (such as sole proprietorships, partnerships, LLCs, corporations, franchises, ecommerce, subscriptions, marketplaces, and service businesses). Tailor advice to the sector, business model, stage, customer, and country when known. Ask one focused clarifying question if important details are missing, but give useful general guidance first. Do not invent laws, market statistics, or guarantees; say when rules vary by location and recommend checking an official source or qualified professional for legal, tax, or investment decisions. Keep answers clear and appropriately concise.'
                    },
                    ...history,
                    { role: 'user', content: message }
                ];
            } else {
                const languageNames = { es: 'Spanish', fr: 'French', de: 'German', ar: 'Arabic' };
                const text = typeof incoming.text === 'string' ? incoming.text : '';
                const language = languageNames[incoming.targetLang];
                if (!text || !language) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Provide text and a supported target language.' }));
                    return;
                }
                messages = [{
                    role: 'user',
                    content: `Translate this text into ${language}. Preserve its tone and formatting. Return only the translation.\n\n${text.slice(0, 12000)}`
                }];
                maxTokens = 2000;
            }

            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'AI service is not configured. Set GROQ_API_KEY on the server.' }));
                return;
            }

            const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                    messages,
                    max_tokens: maxTokens
                })
            });
            const groqData = await groqRes.json();
            if (!groqRes.ok) {
                res.writeHead(groqRes.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: groqData.error?.message || 'AI request failed.' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ response: groqData.choices?.[0]?.message?.content?.trim() || '' }));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

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
