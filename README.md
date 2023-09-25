# WME Structured Contents Endpoint Demo

This is an example on how you would fill in the "knowledge panel" using Wikimedia Enterprise APIs.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deploying the app

1. Checkout github pages branch:

```sh
git checkout --orphan gh-pages
```

2. Build the application:

```sh
npm run build
```

3. Add result of the build to the work tree:

```sh
git --work-tree dist add --all
```

4. Create a deployment commit:

```sh
git --work-tree dist commit -m 'Deploy'
```

5. Push the changes to remote branch `gh-pages`:

```sh
git push origin HEAD:gh-pages --force
```

6. Clean up the `dist` folder:

```sh
rm -r dist
```

7. Return to the `main` branch:

```sh
git checkout -f main
```

8. Remove local version of `gh-pages` brach:

```sh
git branch -D gh-pages
```
