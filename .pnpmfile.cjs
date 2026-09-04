/**
 * Runs TypeScript 6 alongside TypeScript 7, for typescript-eslint only.
 *
 * TypeScript 7 is the native (Go) compiler. It ships `bin/tsc` but drops the
 * JS compiler API — there is no `lib/typescript.js`. typescript-eslint loads
 * that API at import time, reads `ts.versionMajorMinor`, and hard-throws on
 * major >= 7. Its peer range says so outright: `>=4.8.4 <6.1.0`. There is no
 * warning and no opt-out, so `pnpm lint` dies with the version bump.
 *
 * Upstream support is tracked for TS >= 7.1
 * (https://github.com/typescript-eslint/typescript-eslint/issues/10940);
 * there is none for 7.0. Microsoft's documented remedy in the meantime is the
 * side-by-side `@typescript/typescript6` package.
 *
 * `pnpm.overrides` cannot express this. `typescript` is a *peer* of every
 * typescript-eslint package, and peers resolve from the root importer — which
 * has to stay on 7.x so `tsc`, Next and editors get the native compiler.
 * Overrides only rewrite real dependencies, so the subtree keeps resolving 7.
 *
 * Rewriting the peer into a nested real dependency does work: each package
 * gets its own TS 6 copy inside its own subtree while the app root stays on 7.
 *
 * Delete this file when typescript-eslint supports TypeScript 7.
 */

const TS6 = "npm:@typescript/typescript6@^6.0.2";

/** Every typescript-eslint package that declares `typescript` as a peer. */
const NEEDS_TS6 = new Set([
  "typescript-eslint",
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "@typescript-eslint/project-service",
  "@typescript-eslint/tsconfig-utils",
  "@typescript-eslint/type-utils",
  "@typescript-eslint/typescript-estree",
  "@typescript-eslint/utils",
]);

function readPackage(pkg) {
  if (!NEEDS_TS6.has(pkg.name)) return pkg;

  // Drop the peer so pnpm stops resolving it from the root (TS 7)...
  if (pkg.peerDependencies?.typescript) {
    delete pkg.peerDependencies.typescript;
  }
  if (pkg.peerDependenciesMeta?.typescript) {
    delete pkg.peerDependenciesMeta.typescript;
  }
  // ...and pin a real one inside this package's own subtree instead.
  pkg.dependencies = { ...pkg.dependencies, typescript: TS6 };

  return pkg;
}

module.exports = { hooks: { readPackage } };
