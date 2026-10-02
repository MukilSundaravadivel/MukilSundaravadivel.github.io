# Game tools

A small collection of browser tools for playing games with my friends. It helps
with a few simple things, like handing out secret words or picking a random
number.

The app currently includes:

- **Imposter:** Set up players and give everyone a word, with one player getting
  a different one. Players can reveal their cards individually, and the app
  picks someone to go first. Use your own words, random words, or Genshin
  character names, then reveal the imposter when the round is over.
- **Random number:** Pick a whole number between a minimum and maximum you choose.

Each browser runs its own game, so everyone playing an Imposter round should
use the same device. There are no accounts or shared rooms.

It's a little React and Vite app, made for casual use.

## Development

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Tools live in `src/tools/`, with the main screen
in `src/App.jsx` and styles in `src/App.css`.

Use `npm run lint`, `npm test`, and `npm run format:check` to check changes.
Run `npm run build` to create `dist/`, and `npm run preview` to try the build locally.

## Deployment

The GitHub Pages workflow builds and deploys on pushes to `main`. Set the
repository's Pages source to **GitHub Actions**. For other static hosts,
publish the built `dist/` folder.
