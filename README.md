# JustCheck

Checklist diário em estilo quadro branco. Sem login, sem backend: os dados ficam no navegador (localStorage) e, opcionalmente, num arquivo `.json` local — o "cartão de memória".

## Deploy no GitHub Pages

Suba **todo o conteúdo desta pasta** na raiz do repositório:

```
index.html
support.js
manifest.webmanifest
sw.js
icon-192.png
icon-512.png
```

Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.

Todos os caminhos são relativos, então funciona em `usuario.github.io/JustCheck/`.

## Nova versão
Troque `justcheck-v1` por `justcheck-v2` no topo de `sw.js`, senão quem instalou o PWA fica na versão antiga.
