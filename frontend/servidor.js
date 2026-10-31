const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
};

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:5173");
  const arquivo = path.resolve(__dirname, "." + url.pathname);
  const destino = url.pathname === "/"
    ? path.join(__dirname, "index.html")
    : arquivo;

  if (!destino.startsWith(__dirname + path.sep)) {
    res.writeHead(403).end("Acesso negado");
    return;
  }

  fs.readFile(destino, (erro, dados) => {
    if (erro) {
      res.writeHead(404).end("Arquivo não encontrado");
      return;
    }

    res.writeHead(200, {
      "Content-Type": tipos[path.extname(destino)] || "application/octet-stream",
    });
    res.end(dados);
  });
}).listen(5173, "127.0.0.1", () => {
  console.log("CineTrack disponível em http://localhost:5173");
});
