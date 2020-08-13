<!--
# Tools You Should Know
-->

# Les outils que vous devriez connaître

<!--
This is a curated list of awesome tools you should know about when doing Rust
and WebAssembly development.
-->

Ceci est une compilation d'outils très intéressants que vous devriez connaître
lorsque vous développez en Rust et WebAssembly.

<!--
## Development, Build, and Workflow Orchestration
-->

## Développement, compilation, et organisation des flux de travail

<!--
### `wasm-pack` | [repository](https://github.com/rustwasm/wasm-pack)
-->

### `wasm-pack` | [dépôt](https://github.com/rustwasm/wasm-pack)

<!--
`wasm-pack` seeks to be a one-stop shop for building and working with Rust-
generated WebAssembly that you would like to interoperate with JavaScript, on
the Web or with Node.js. `wasm-pack` helps you build and publish Rust-generated
WebAssembly to the npm registry to be used alongside any other JavaScript
package in workflows that you already use.
-->

`wasm-pack` aspire à être un outil générique pour travailler et compiler le
WebAssembly avec Rust, qui interagira avec le JavaScript, sur le Web ou avec
Node.js. `wasm-pack` vous aide à compiler et publier du WebAssembly généré par
Rust dans le registre de npm pour être utilisé avec n'importe quel autre paquet
JavaScript dans les systèmes que vous utilisez déjà.

<!--
## Optimizing and Manipulating `.wasm` Binaries
-->

## Optimiser et manipuler des binaires `.wasm`

<!--
### `wasm-opt` | [repository](https://github.com/WebAssembly/binaryen)
-->

### `wasm-opt` | [dépôt](https://github.com/WebAssembly/binaryen)

<!--
The `wasm-opt` tool reads WebAssembly as input, runs transformation,
optimization, and/or instrumentation passes on it, and then emits the
transformed WebAssembly as output. Running it on the `.wasm` binaries produced
by LLVM by way of `rustc` will usually create `.wasm` binaries that are both
smaller and execute faster. This tool is a part of the `binaryen` project.
-->

L'outil `wasm-opt` lit en entrée du WebAssembly, procède à des transformations,
des optimisations, et/ou fait des passes d'outillages dessus, et retourne
ensuite le WebAssembly en sortie. L'exécution sur des binaires `.wasm` produits
par LLVM avec `rustc` devrait généralement créer des binaires `.wasm` qui sont
à la fois léger et qui devraient s'exécuter plus rapidement. Cet outil fait
partie du projet `binaryen`.

<!--
### `wasm2js` | [repository](https://github.com/WebAssembly/binaryen)
-->

### `wasm2js` | [dépôt](https://github.com/WebAssembly/binaryen)

<!--
The `wasm2js` tool compiles WebAssembly into "almost asm.js". This is great for
supporting browsers that don't have a WebAssembly implementation, such as
Internet Explorer 11. This tool is a part of the `binaryen` project.
-->

L'outil `wasm2js` compile du WebAssembly en "presque du asm.js". C'est
intéressant pour prendre en charge des navigateurs qui n'implémentent pas le
WebAssembly, comme Internet Explorer 11. Cet outil fait partie du projet
`binaryen`.

<!--
### `wasm-gc` | [repository](https://github.com/alexcrichton/wasm-gc)
-->

### `wasm-gc` | [dépôt](https://github.com/alexcrichton/wasm-gc)

<!--
A small tool to garbage collect a WebAssembly module and remove all unneeded
exports, imports, functions, etc. This is effectively a `--gc-sections` linker
flag for WebAssembly.
-->

C'est un petit outil pour exécuter un ramasse-miettes sur un module WebAssembly
et enlève les exports, imports, fonctions et autres qui ne sont pas utiles.
C'est comme le drapeau de liaison `--gc-sections` pour WebAssembly.

<!--
You don't usually need to use this tool yourself because of two reasons:
-->

Vous ne devriez pas normalement avoir besoin de cet outil pour deux raisons :

<!--
1. `rustc` now has a new enough version of `lld` that it supports the
   `--gc-sections` flag for WebAssembly. This is automatically enabled for LTO
   builds.
2. The `wasm-bindgen` CLI tool runs `wasm-gc` for you automatically.
-->

1. `rustc` a maintenant une version assez récente de `lld` qui supporte le
   drapeau `--gc-sections` pour le WebAssembly. Il est activé automatiquement
   pour les compilations LTO.
2. L'outil en ligne de commande `wasm-bindgen` exécute automatiquement `wasm-gc`
   pour vous.

<!--
### `wasm-snip` | [repository](https://github.com/rustwasm/wasm-snip)
-->

### `wasm-snip` | [dépôt](https://github.com/rustwasm/wasm-snip)

<!--
`wasm-snip` replaces a WebAssembly function's body with an `unreachable`
instruction.
-->

`wasm-snip` remplace le corps d'une fonction WebAssembly par une instruction
`unreachable`.

<!--
Maybe you know that some function will never be called at runtime, but the
compiler can't prove that at compile time? Snip it! Then run `wasm-gc` again and
all the functions it transitively called (which could also never be called at
runtime) will get removed too.
-->

Peut-être que vous connaissez des fonctions que ne seront jamais utilisées à
l'exécution, mais que le compilateur ne peut pas le détecter à la compilation ?
Découpez-les ! Ensuite exécutez à nouveau `wasm-gc` et toutes les fonctions
qu'elles seules utilisaient (qui ne devraient donc pas être appelées à
l'exécution) devraient aussi être enlevées.

<!--
This is useful for forcibly removing Rust's panicking infrastructure in
non-debug production builds.
-->

C'est utile pour enlever de force les infrastructures de panique pour les
compilations destinées à l'environnement de production sans débogage.

<!--
## Inspecting `.wasm` Binaries
-->

## Inspecter des binaires `.wasm`

<!--
### `twiggy` | [repository](https://github.com/rustwasm/twiggy)
-->

### `twiggy` | [dépôt](https://github.com/rustwasm/twiggy)

<!--
`twiggy` is a code size profiler for `.wasm` binaries. It analyzes a binary's
call graph to answer questions like:
-->

`twiggy` est un profileur de la taille de code pour les binaires `.wasm`. Il
analyse l'arbre des appels pour répondre aux questions comme celles-ci :

<!--
* Why was this function included in the binary in the first place? I.e. which
  exported functions are transitively calling it?
* What is the retained size of this function? I.e. how much space would be saved
  if I removed it and all the functions that become dead code after its removal.
-->

* Pourquoi cette fonction est présente dans le binaire ? Par exemple, pour
  comprendre quelles sont les fonctions exportées qui les appellent
  indirectement ?
* Quelle est la taille totale de cette fonction ? Par exemple, quelle taille
  pourrait être économisée si je l'enlève et quelles fonctions deviendront
  inutilisables après ce nettoyage ?

<!--
Use `twiggy` to make your binaries slim!
-->

Utilisez `twiggy` pour alléger vos binaires !

<!--
### `wasm-objdump` | [repository](https://github.com/WebAssembly/wabt)
-->

### `wasm-objdump` | [dépôt](https://github.com/WebAssembly/wabt)

<!--
Print low-level details about a `.wasm` binary and each of its sections. Also
supports disassembling into the WAT text format. It's like `objdump` but for
WebAssembly. This is a part of the WABT project.
-->

Affiche des informations de bas-niveau sur un binaire `.wasm` et sur chacune de
ses sections. Elle permet aussi de désassembler au format texte WAT. C'est
l'équivalent `objdump` mais pour le WebAssembly. Il fait partie du projet WABT.

<!--
### `wasm-nm` | [repository](https://github.com/fitzgen/wasm-nm)
-->

### `wasm-nm` | [dépôt](https://github.com/fitzgen/wasm-nm)

<!--
List the imported, exported, and private function symbols defined within a
`.wasm` binary. It's like `nm` but for WebAssembly.
-->

Liste les symboles de fonctions importées, exportées, et privées qui sont
définies dans le binaire `.wasm`. C'est comme `nm` mais pour le WebAssembly.
