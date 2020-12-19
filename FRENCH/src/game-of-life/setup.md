<!--
# Setup
-->

# Réglages

<!--
This section describes how to set up the toolchain for compiling Rust programs
to WebAssembly and integrate them into JavaScript.
-->

Cette section décrit comment régler la toolchain pour compiler les programmes
Rust en WebAssembly et les intégrer dans JavaScript.

<!--
## The Rust Toolchain
-->

## La toolchain Rust

<!--
You will need the standard Rust toolchain, including `rustup`, `rustc`, and
`cargo`.
-->

Vous allez avoir besoin de la toolchain Rust standard, y compris `rustup`,
`rustc`, et `cargo`.

<!--
[Follow these instructions to install the Rust toolchain.][rust-install]
-->

[Cliquez ici pour suivre les instructions pour installer la toolchain
Rust.][rust-install]

<!--
The Rust and WebAssembly experience is riding the Rust release trains to stable!
That means we don't require any experimental feature flags. However, we do
require Rust 1.30 or newer.
-->

L'expérience entre Rust et WebAssembly suit les trains de publications de Rust
stable ! Cela signifie que nous n'avons pas besoin de drapeaux de
fonctionnalitées expérimentales. Cependant, nous avons besoin de Rust 1.30 ou
plus récent.

<!--
## `wasm-pack`
-->

## `wasm-pack`

<!--
`wasm-pack` is your one-stop shop for building, testing, and publishing
Rust-generated WebAssembly.
-->

`wasm-pack` sera votre interlocuteur unique pour compiler, tester, et publier du
WebAssembly généré par Rust.

<!--
[Get `wasm-pack` here!][wasm-pack-install]
-->

[Obtenez `wasm-pack` ici !][wasm-pack-install]

<!--
## `cargo-generate`
-->

## `cargo-generate`

<!--
[`cargo-generate` helps you get up and running quickly with a new Rust project
by leveraging a pre-existing git repository as a template.][cargo-generate]
-->

[`cargo-generate` va vous aider à vous mettre sur pied rapidement avec un
nouveau projet Rust en utilisant comme modèle un dépôt git déjà
existant.][cargo-generate]

<!--
Install `cargo-generate` with this command:
-->

Vous pouvez installer `cargo-generate` avec cette commande :

```
cargo install cargo-generate
```

<!--
## `npm`
-->

## `npm`

<!--
`npm` is a package manager for JavaScript. We will use it to install and run a
JavaScript bundler and development server. At the end of the tutorial, we will
publish our compiled `.wasm` to the `npm` registry.
-->

`npm` est un gestionnaire de paquets pour JavaScript. Nous allons l'utiliser
pour installer et exécuter un bundler JavaScript et un serveur de développement.
A la fin de ce tutoriel, nous allons publier notre `.wasm` dans le registre
`npm`.

<!--
[Follow these instructions to install `npm`.][npm-install]
-->

[Cliquez ici pour suivre les instructions pour installer `npm`.][npm-install]

<!--
If you already have `npm` installed, make sure it is up to date with this
command:
-->

Si vous avez déjà `npm` d'installé, assurez-vous qu'il est à jour avec cette
commande :

```
npm install npm@latest -g
```

[rust-install]: https://www.rust-lang.org/tools/install
[npm-install]: https://www.npmjs.com/get-npm
[wasm-pack]: https://github.com/rustwasm/wasm-pack
[cargo-generate]: https://github.com/ashleygwilliams/cargo-generate
[wasm-pack-install]: https://rustwasm.github.io/wasm-pack/installer/
