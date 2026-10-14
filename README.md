# Star Wars Wiki

Angular 21 application with film and character pages, a canvas starfield, and hyperspace interactions.

## Development

Use Node 24 (`nvm use`), then run `npm ci` and `npm start`.

## Validation

- `npm test` runs the component and service suite with Angular's Vitest runner and jsdom.
- `npm audit` checks production and development dependencies.
- `npm run build -- --base-href /starwars-wiki/` generates the GitHub Pages artifact in `dist/starwars-wiki`.

CI runs these checks for pull requests and pushes to main. Dependabot checks npm and GitHub Actions updates weekly and groups Angular packages together.

## Dependency maintenance

The application uses `@angular/build` with the application builder. Components explicitly retain NgModule declarations, and zone-based change detection remains enabled. The legacy Webpack and Karma toolchains are removed. No security advisories are suppressed and no cross-major dependency overrides are used.

The Pages base URL, hash routes, and flat artifact output directory are preserved. Publishing the artifact remains a separate step.
