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

Publish the generated `dist/` folder to a static host.

## GitHub Pages

This repository includes `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` whenever you push to `main`.

1. In the GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Commit and push the workflow to `main`.
4. Wait for **Deploy to GitHub Pages** in the **Actions** tab to finish, then open
   https://MukilSundaravadivel.github.io/.

If the workflow is already on GitHub, you can also select it in the Actions tab
and click **Run workflow**.

The default Vite base path (`/`) is correct for this user site. If you move the
site to `username.github.io/repository/`, set `base: '/repository/'` in
`vite.config.js`.

Do not publish the source `index.html` directly: it references JSX source that
must be compiled by Vite. See https://vite.dev/guide/static-deploy#github-pages.

Each browser runs independently; there is no shared game state between devices.
