# Pirate Battle

Jogo de batalha naval 2D em HTML5 Canvas e JavaScript puro (sem bibliotecas).

## Como rodar

O jogo carrega imagens e sons por arquivo, então precisa de um servidor local
(abrir o `index.html` com duplo clique não carrega os sons).

**VS Code:** instale a extensão *Live Server*, clique com o botão direito em `index.html`
e escolha *Open with Live Server*.

**Terminal:** na pasta do projeto, rode `python3 -m http.server 8000` e abra http://localhost:8000

## Controles

| Tecla | Ação |
|---|---|
| Setas | Mover o barco |
| 1 | Tiro padrão (20 de dano) |
| 2 | Tiro triplo (3 balas em leque, 12 de dano cada) |
| 3 | Tiro pesado (40 de dano, atravessa os inimigos) |
| P ou Esc | Pausar |
| M | Ligar/desligar o som |

## Estrutura

```
index.html          página e HUD
css/style.css       estilos dos menus e do HUD (recortes da folha de interface)
js/game.js          toda a lógica: mapa, inimigos, tiros, fases, áudio
assets/images/      folhas de sprites e texturas
assets/audio/       efeitos sonoros e som do mar
```

## Publicar no GitHub

```
git init
git add .
git commit -m "Pirate Battle"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Para deixar jogável online: no GitHub, *Settings > Pages > Deploy from a branch > main / (root)*.

## Atenção aos assets

As imagens e sons em `assets/` são os arquivos enviados pelo autor do projeto.
Antes de tornar o repositório público, confira a licença deles.
A música de fundo é gerada por código, não é um arquivo.
