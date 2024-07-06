# Grand Turborepo

A turbo monorepo for all Grand web properties.

### Apps and Packages

- `grand`: The Grand web application
- `@grand/ui`: a stub React component library shared by both `web` and `docs` applications
- `@grand/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@grand/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```