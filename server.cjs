const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const distDirectory = path.resolve(__dirname, "dist");
const indexFile = path.join(distDirectory, "index.html");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(response, filePath, statusCode = 200) {
  const extension = path.extname(filePath).toLowerCase();
  const assetsDirectory = path.join(distDirectory, "assets");
  const isBundledAsset = filePath.startsWith(`${assetsDirectory}${path.sep}`);
  response.writeHead(statusCode, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": extension === ".html"
      ? "no-cache"
      : isBundledAsset
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  let pathname;

  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  if (pathname === "/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end('{"status":"ok"}');
    return;
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const requestedFile = path.resolve(distDirectory, relativePath);
  const isInsideDist = requestedFile === distDirectory
    || requestedFile.startsWith(`${distDirectory}${path.sep}`);

  if (!isInsideDist) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  if (relativePath && fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()) {
    sendFile(response, requestedFile);
    return;
  }

  const extension = path.extname(pathname);

  if (!extension || extension === ".html") {
    sendFile(response, indexFile);
    return;
  }

  response.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end("Not found");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`PricePilot frontend listening on port ${port}`);
});
