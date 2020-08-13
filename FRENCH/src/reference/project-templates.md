<!--
# Project Templates
-->

# Les gabarits de projet

<!--
The Rust and WebAssembly working group curates and maintains a variety of
project templates to help you kickstart new projects and hit the ground running.
-->

Le groupe de travail de Rust et WebAssembly compile et maintient une variété de
gabarits de projets pour vous aider à démarrer des nouveaux projets afin de se
mettre rapidement au travail.

<!--
## `wasm-pack-template`
-->

## `wasm-pack-template`

<!--
[This template][wasm-pack-template] is for starting a Rust and WebAssembly
project to be used with [`wasm-pack`][wasm-pack].
-->

[Ce gabarit][wasm-pack-template] permet de démarrer un projet en Rust et
WebAssembly à utiliser avec [`wasm-pack`][wasm-pack].

<!--
Use `cargo generate` to clone this project template:
-->

Utilisez `cargo generate` pour cloner ce gabarit de projet :

<!--
```
cargo install cargo-generate
cargo generate --git https://github.com/rustwasm/wasm-pack-template.git
```
-->

```
cargo install cargo-generate
cargo generate --git https://github.com/rustwasm/wasm-pack-template.git
```

<!--
## `create-wasm-app`
-->

## `create-wasm-app`

<!--
[This template][create-wasm-app] is for JavaScript projects that consume
packages from npm that were created from Rust with [`wasm-pack`][wasm-pack].
-->

[Ce gabarit][create-wasm-app] s'utilise pour des projets en JavaScript qui
utilisent des paquets de npm qui ont été créés à partir de Rust avec
[`wasm-pack`][wasm-pack].

Ce gabarit a été traduit en français : [create-wasm-app-fr]

<!--
Use it with `npm init`:
-->

Utilisez-le avec `npm init` :

<!--
```
mkdir my-project
cd my-project/
npm init wasm-app
```
-->

```
mkdir mon-projet
cd mon-projet/
npm init wasm-app
# ou pour la version française :
npm init wasm-app-fr
```

<!--
This template is often used alongside `wasm-pack-template`, where
`wasm-pack-template` projects are installed locally with `npm link`, and pulled
in as a dependency for a `create-wasm-app` project.
-->

Ce gabarit est parfois utilisé avec `wasm-pack-template`, où les projets
`wasm-pack-template` sont installés en local avec `npm link`, et utilisés comme
dépendance dans les projets `create-wasm-app`.

<!--
## `rust-webpack-template`
-->

## `rust-webpack-template`

<!--
[This template][rust-webpack-template] comes pre-configured with all the
boilerplate for compiling Rust to WebAssembly and hooking that directly into a
Webpack build pipeline with Webpack's [`rust-loader`][rust-loader].
-->

[Ce gabarit][rust-webpack-template] est livré pré-configuré avec tout
l'outillage pour compiler Rust en WebAssembly et de l'intégrer dans un cycle de
compilation de Webpack avec le [`rust-loader`][rust-loader] de Webpack.

<!--
Use it with `npm init`:
-->

Utilisez-le avec `npm init` :

<!--
```
mkdir my-project
cd my-project/
npm init rust-webpack
```
-->

```
mkdir my-project
cd my-project/
npm init rust-webpack
```

<!--
[wasm-pack]: https://github.com/rustwasm/wasm-pack
[wasm-pack-template]: https://github.com/rustwasm/wasm-pack-template
[create-wasm-app]: https://github.com/rustwasm/create-wasm-app
[rust-webpack-template]: https://github.com/rustwasm/rust-webpack-template
[rust-loader]: https://github.com/wasm-tool/rust-loader/
-->

[wasm-pack]: https://github.com/rustwasm/wasm-pack
[wasm-pack-template]: https://github.com/rustwasm/wasm-pack-template
[create-wasm-app]: https://github.com/rustwasm/create-wasm-app
[rust-webpack-template]: https://github.com/rustwasm/rust-webpack-template
[rust-loader]: https://github.com/wasm-tool/rust-loader/

[create-wasm-app-fr]: https://github.com/Jimskapt/create-wasm-app-fr
