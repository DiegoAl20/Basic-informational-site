const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = 8080;

const server = http.createServer((req, res) => {
    const page404 = fs.readFileSync('./404.html', 'utf8', (err, data) => {
        if (err)
            throw err;
        return data;
    });

    const urlPath = req.url;
    let pathDirectory = './';

    if (urlPath == '/') {
        pathDirectory += 'index.html';
    } else if (urlPath == '/about') {
        pathDirectory += 'about.html';
    } else if (urlPath == '/contact-me') {
        pathDirectory += 'contact-me.html';
    }

    fs.readFile(pathDirectory, (err, data) => {
        if (err) {
            res.setHeader('Content-Type', 'text/html');
            res.write(page404);
            return res.end();
        }
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        return res.end();
    })
});

server.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});