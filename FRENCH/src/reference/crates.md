<!--
# Crates You Should Know
-->

# Les crates que vous devriez connaître

<!--
This is a curated list of awesome crates you should know about for doing Rust
and WebAssembly development.
-->

Ceci est une compilation de crates très intéressantes que vous devriez
connaître pour développer en Rust et WebAssembly.

<!--
[You can also browse all the crates published to crates.io in the WebAssembly
category.][wasm-category]
-->

[Vous pouvez aussi parcourir les crates publiées sur crates.io dans la
catégorie WebAssembly.][wasm-category]

<!--
## Interacting with JavaScript and the DOM
-->

## Interagir avec le JavaScript et le D.O.M.

<!--
### `wasm-bindgen` | [crates.io](https://crates.io/crates/wasm-bindgen) | [repository](https://github.com/rustwasm/wasm-bindgen)
-->

### `wasm-bindgen` | [crates.io](https://crates.io/crates/wasm-bindgen) | [dépôt](https://github.com/rustwasm/wasm-bindgen)

<!--
`wasm-bindgen` facilitates high-level interactions between Rust and
JavaScript. It allows one to import JavaScript things into Rust and export Rust
things to JavaScript.
-->

`wasm-bindgen` facilite les interactions de haut-niveau entre Rust et
JavaScript. Il permet d'importer des choses en JavaScript dans du Rust et
exporter des choses en Rust dans du JavaScript.

<!--
### `wasm-bindgen-futures` | [crates.io](https://crates.io/crates/wasm-bindgen-futures) | [repository](https://github.com/rustwasm/wasm-bindgen/tree/master/crates/futures)
-->

### `wasm-bindgen-futures` | [crates.io](https://crates.io/crates/wasm-bindgen-futures) | [dépôt](https://github.com/rustwasm/wasm-bindgen/tree/master/crates/futures)

<!--
`wasm-bindgen-futures` is a bridge connecting JavaSript `Promise`s and Rust
`Future`s. It can convert in both directions and is useful when working with
asynchronous tasks in Rust, and allows interacting with DOM events and I/O
operations.
-->

`wasm-bindgen-futures` est un pont entre les Promises du JavaScript et les
Futures de Rust. Il peut faire la conversion dans les deux directions et s'avère
utile lorsque nous travaillons avec des tâches asynchrones en Rust, et permet
d'interagir avec les évènements du D.O.M. et aux opérations d'entrée/sortie.

<!--
### `js-sys` | [crates.io](https://crates.io/crates/js-sys) | [repository](https://github.com/rustwasm/wasm-bindgen/tree/master/crates/js-sys)
-->

### `js-sys` | [crates.io](https://crates.io/crates/js-sys) | [dépôt](https://github.com/rustwasm/wasm-bindgen/tree/master/crates/js-sys)

<!--
Raw `wasm-bindgen` imports for all the JavaScript global types and methods, such
as `Object`, `Function`, `eval`, etc. These APIs are portable across all
standard ECMAScript environments, not just the Web, such as Node.js.
-->

Ce sont des imports bruts de `wasm-bindgen` pour tous les types et méthodes
globales en JavaScript, comme `Object`, `Function`, `eval` et compagnie. Ces API
sont portables sur tous environnements ECMAScript standard, et pas uniquement
que le Web, comme par exemple Node.js.

<!--
### `web-sys` | [crates.io](https://crates.io/crates/web-sys) | [repository](https://github.com/rustwasm/wasm-bindgen/tree/master/crates/web-sys)
-->

### `web-sys` | [crates.io](https://crates.io/crates/web-sys) | [dépôt](https://github.com/rustwasm/wasm-bindgen/tree/master/crates/web-sys)

<!--
Raw `wasm-bindgen` imports for all the Web's APIs, such as DOM manipulation,
`setTimeout`, Web GL, Web Audio, etc.
-->

Ce sont des imports bruts de `wasm-bindgen` pour toutes les API web, comme la
manipulation du D.O.M., de l'utilisation de `setTimeout`, du Web GL, Web Audio,
et autres.

<!--
## Error Reporting and Logging
-->

## Communication d'erreurs et journalisation

<!--
### `console_error_panic_hook` | [crates.io](https://crates.io/crates/console_error_panic_hook) | [repository](https://github.com/rustwasm/console_error_panic_hook)
-->

### `console_error_panic_hook` | [crates.io](https://crates.io/crates/console_error_panic_hook) | [dépôt](https://github.com/rustwasm/console_error_panic_hook)

<!--
This crate lets you debug panics on `wasm32-unknown-unknown` by providing a
panic hook that forwards panic messages to `console.error`.
-->

Cette crate vous permet de déboguer les paniques en `wasm32-unknown-unknown`, en
fournissant ce déclencheur à la panique, qui renvoie les messages de panique
dans `console.error`.

<!--
### `console_log` | [crates.io](https://crates.io/crates/console_log) | [repository](https://github.com/iamcodemaker/console_log)
-->

### `console_log` | [crates.io](https://crates.io/crates/console_log) | [dépôt](https://github.com/iamcodemaker/console_log)

<!--
This crate provides a backend for [the `log`
crate](https://crates.io/crates/log) that routes logged messages to the devtools
console.
-->

Cette crate fournit une infrastructure dorsale pour [la crate
`log`](https://crates.io/crates/log) qui renvoie les journaux dans la console de
développement.

<!--
## Dynamic Allocation
-->

## Allocation dynamique

<!--
### `wee_alloc` | [crates.io](https://crates.io/crates/wee_alloc) | [repository](https://github.com/rustwasm/wee_alloc)
-->

### `wee_alloc` | [crates.io](https://crates.io/crates/wee_alloc) | [dépôt](https://github.com/rustwasm/wee_alloc)

<!--
The **W**asm-**E**nabled, **E**lfin Allocator. A small (~1K uncompressed
`.wasm`) allocator implementation for when code size is a greater concern than
allocation performance.
-->

`wwe_alloc` signifie **W**asm-**E**nabled, **E**lfin Allocator, ce qui signifie
grossièrement en français Allocateur de Elfin conçu pour le Wasm. C'est une
implémentation d'allocateur de petite taille (un `.wasm` d'environ 1Ko non
compressé) pour l'utiliser lorsque le poids du code est plus important que la
performance d'allocation.

<!--
## Parsing and Generating `.wasm` Binaries
-->

## Exploration et génération de binaires `.wasm`

<!--
### `parity-wasm` | [crates.io](https://crates.io/crates/parity-wasm) | [repository](https://github.com/paritytech/parity-wasm)
-->

### `parity-wasm` | [crates.io](https://crates.io/crates/parity-wasm) | [dépôt](https://github.com/paritytech/parity-wasm)

<!--
Low-level WebAssembly format library for serializing, deserializing, and
building `.wasm` binaries. Good support for well-known custom sections, such as
the "names" section and "reloc.WHATEVER" sections.
-->

C'est une bibliothèque de bas-niveau en WebAssembly pour sérialiser,
désérialiser, et compiler des binaires `.wasm`. Elle a un bon support des
sections personnalisées les plus connues, comme les sections "names" et
"reloc.WHATEVER".

<!--
### `wasmparser` | [crates.io](https://crates.io/crates/wasmparser) | [repository](https://github.com/yurydelendik/wasmparser.rs)
-->

### `wasmparser` | [crates.io](https://crates.io/crates/wasmparser) | [dépôt](https://github.com/yurydelendik/wasmparser.rs)

<!--
A simple, event-driven library for parsing WebAssembly binary files. Provides
the byte offsets of each parsed thing, which is necessary when interpreting
relocs, for example.
-->

Une bibliothèque simple, pilotée par les évènements pour explorer les fichiers
binaires de WebAssembly. Elle fournit les correspondances d'octets pour chaque
élément exploré, ce qui s'avère utile pour interpréter les relocs, par exemple.

<!--
## Interpreting and Compiling WebAssembly
-->

## Interpréter et compiler du WebAssembly

<!--
### `wasmi` | [crates.io](https://crates.io/crates/wasmi) | [repository](https://github.com/paritytech/wasmi)
-->

### `wasmi` | [crates.io](https://crates.io/crates/wasmi) | [dépôt](https://github.com/paritytech/wasmi)

<!--
An embeddable WebAssembly interpreter from Parity.
-->

L'interpréteur WebAssembly de Parity, qui peut être embarqué dans un projet.

<!--
### `cranelift-wasm` | [crates.io](https://crates.io/crates/cranelift-wasm) | [repository](https://github.com/CraneStation/cranelift)
-->

### `cranelift-wasm` | [crates.io](https://crates.io/crates/cranelift-wasm) | [dépôt](https://github.com/CraneStation/cranelift)

<!--
Compile WebAssembly to the native host's machine code. Part of the Cranelift (né
Cretonne) code generator project.
-->

Compile le WebAssembly dans le code machine natif de l'hôte. Elle fait partie du
projet de générateur de code Cranelift (initialement nommé Cretonne).

<!--
[wasm-category]: https://crates.io/categories/wasm
-->

[wasm-category]: https://crates.io/categories/wasm
