# Game tools

A small React + Vite site using JavaScript and plain CSS, with no backend.

## Develop

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Edit `src/tools/GameSetup.jsx` for the first tool,
`src/App.jsx` for the main screen, and `src/App.css` for styling.
Add future tools as components in `src/tools/`.

## Check and build

```bash
npm run lint
npm run build
npm run preview
```

Publish the generated `dist/` folder to a static host. For GitHub Pages under
a repository path, set `base: '/YOUR-REPOSITORY/'` in `vite.config.js` and follow
https://vite.dev/guide/static-deploy#github-pages.

Each browser runs independently; there is no shared game state between devices.
# MukilSundaravadivel.github.io
