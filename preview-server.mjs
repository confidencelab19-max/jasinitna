import {createReadStream, existsSync, statSync} from 'node:fs';
import {createServer} from 'node:http';
import {extname, join, normalize} from 'node:path';

const root = join(process.cwd(), 'build');
const port = Number(process.env.PORT || 3000);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const safePath = normalize(cleanPath).replace(/^(\.\.[/\\])+/, '');
  const direct = join(root, safePath);

  if (existsSync(direct) && statSync(direct).isFile()) return direct;

  const indexPath = join(root, safePath, 'index.html');
  if (existsSync(indexPath) && statSync(indexPath).isFile()) return indexPath;

  return join(root, 'index.html');
}

createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');
  res.setHeader('Content-Type', types[extname(filePath)] || 'application/octet-stream');
  createReadStream(filePath)
    .on('error', () => {
      res.statusCode = 404;
      res.end('Not found');
    })
    .pipe(res);
}).listen(port, '127.0.0.1', () => {
  console.log(`Preview server running at http://127.0.0.1:${port}/`);
});
