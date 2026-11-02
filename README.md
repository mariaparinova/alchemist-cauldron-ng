# Alchemist's Cauldron (Angular)

[Alchemist's Cauldron](https://github.com/mariaparinova/alchemist-cauldron/pull/4) game,
built as the [Creative Extension](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/creative-extension/mini-games.md)
task of the RS School Qualifying Stage.

## About the Project

The original game was written in vanilla TypeScript with Vite and direct DOM manipulation.
For the Creative Extension was chosen the **Framework migration** enhancement.

### Game Goal

Mix the available ingredients in the cauldron so that the potion matches the target ranges of
three parameters:

- **Temperature**
- **Density**
- **Magic Power**

---

## Tech Stack

- **Framework**: Angular 22 (standalone components, signals, zoneless)
- **Language**: TypeScript
- **Styling**: SCSS
- **Testing**: Vitest + jsdom
- **Linter & Formatter**: ESLint & Prettier
- **Git Hooks**: Husky + lint-staged

---

## Getting Started

```bash
npm install
npm start
```

Then open http://localhost:4200/.

## Available Scripts

- **npm start**: starts the dev server at http://localhost:4200.
- **npm run build**: production build to the `dist/` directory.
- **npm run watch**: development build in watch mode.
- **npm test**: runs unit tests with Vitest.
- **npm run lint**: runs ESLint across the codebase (`npm run lint:fix` to auto-fix).
- **npm run format:fix**: formats all files with Prettier.
