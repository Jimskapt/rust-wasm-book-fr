<!--
# Shrinking `.wasm` Size
-->

# Réduire la taille des `.wasm`

<!--
For `.wasm` binaries that we ship to clients over the network, such as our Game
of Life Web application, we want to keep an eye on code size. The smaller our
`.wasm` is, the faster our page loads get, and the happier our users are.
-->

Pour les binaires `.wasm` que nous distribuons aux clients à travers le réseau,
comme notre application du Jeu de la vie, nous voulons veiller à la taille du
code. Plus notre `.wasm` sera petit, plus vite notre page se chargera
rapidement, et plus nos utilisateurs seront satisfaits.

<!--
## How small can we get our Game of Life `.wasm` binary via build configuration?
-->

## A quel point nous pouvons diminuer la taille des binaires `.wasm` avec la configuration de la compilation ?

<!--
[Take a moment to review the build configuration options we can tweak to get
smaller `.wasm` code
sizes.](../reference/code-size.html#optimizing-builds-for-code-size)
-->

[Prenez un moment pour consulter les options de configuration de compilation que
nous pouvons activer pour obtenir du code `.wasm` plus
petit](../reference/code-size.html)

<!--
With the default release build configuration (without debug symbols), our
WebAssembly binary is 29,410 bytes:
-->

Avec la configuration de compilation par défaut pour la publication (sans les
symboles de débogage), notre binaire de WebAssembly fait 29 410 octets :

<!--
```
$ wc -c pkg/wasm_game_of_life_bg.wasm
29410 pkg/wasm_game_of_life_bg.wasm
```
-->

```
$ wc -c pkg/wasm_jeu_de_la_vie_bg.wasm
29410 pkg/wasm_jeu_de_la_vie_bg.wasm
```

<!--
After enabling LTO, setting `opt-level = "z"`, and running `wasm-opt -Oz`, the
resulting `.wasm` binary shrinks to only 17,317 bytes:
-->

Après avoir activé le LTO, avoir réglé `opt-level = "z"`, et lancé
`wasm-opt -Oz`, le binaire `.wasm` qui en résulte est réduit à seulement 17 317
octets :

<!--
```
$ wc -c pkg/wasm_game_of_life_bg.wasm
17317 pkg/wasm_game_of_life_bg.wasm
```
-->

```
$ wc -c pkg/wasm_jeu_de_la_vie_bg.wasm
17317 pkg/wasm_jeu_de_la_vie_bg.wasm
```

<!--
And if we compress it with `gzip` (which nearly every HTTP server does) we get
down to a measly 9,045 bytes!
-->

Si nous le compressons avec `gzip` (ce que fait presque tout serveur HTTP), nous
arrivons à une taille minuscule de 9 045 octets !

<!--
```
$ gzip -9 < pkg/wasm_game_of_life_bg.wasm | wc -c
9045
```
-->

```
$ gzip -9 < pkg/wasm_jeu_de_la_vie_bg.wasm | wc -c
9045
```

<!--
## Exercises
-->

## Exercices

<!--
* Use [the `wasm-snip` tool](../reference/code-size.html#use-the-wasm-snip-tool)
  to remove the panicking infrastructure functions from our Game of Life's
  `.wasm` binary. How many bytes does it save?
* Build our Game of Life crate with and without [`wee_alloc` as its global
  allocator](https://github.com/rustwasm/wee_alloc). The
  `rustwasm/wasm-pack-template` template that we cloned to start this project
  has a "wee_alloc" cargo feature that you can enable by adding it to the
  `default` key in the `[features]` section of `wasm-game-of-life/Cargo.toml`:
  
  ```toml
  [features]
  default = ["wee_alloc"]
  ```
  
  How much size does using `wee_alloc` shave off of the `.wasm`
  binary?
* We only ever instantiate a single `Universe`, so rather than providing a
  constructor, we can export operations that manipulate a single `static mut`
  global instance. If this global instance also uses the double buffering
  technique discussed in earlier chapters, we can make those buffers also be
  `static mut` globals. This removes all dynamic allocation from our Game of
  Life implementation, and we can make it a `#![no_std]` crate that doesn't
  include an allocator. How much size was removed from the `.wasm` by completely
  removing the allocator dependency?
-->

* Utilisez [l'outil `wasm-snip`](../reference/code-size.html) pour enlever les
  fonctions de l'infrastructure de panique sur le binaire `.wasm` de notre jeu
  de la vie. Combien d'octets cela économise ?
* Compilez notre crate du Jeu de la vie avec et sans [l'allocateur global
  `wee_alloc`](https://github.com/rustwasm/wee_alloc). Le gabarit
  `rustwasm/wasm-pack-template`, que nous avons cloné pour démarrer ce projet,
  avait une fonctionnalité "wee_alloc" que vous pouvez activer en l'ajoutant
  à la clé `default` dans la section `[features]` de
  `wasm-jeu-de-la-vie/Cargo.toml` :

  ```toml
  [features]
  default = ["wee_alloc"]
  ```

  Quelle taille `we_alloc` économise sur le binaire `.wasm` ?
* Nous n'avons instancié qu'un seul `Univers`, donc au lieu de fournir un
  constructeur, nous pouvons exporter des opérations qui travaillent sur une
  instance globale `static mut`. Si cette instance globale utilise aussi la
  technique de *double buffering* que nous avions évoqué dans les chapitres
  précédent, nous pouvons aussi rendre globaux ces tampons avec `static mut`.
  Cela enleve toute la partie d'allocation dynamique de notre implémentation du
  Jeu de la vie, et nous pouvons la transformer en crate `#![no_std]` qui ne
  contient pas d'allocateur. Quelle taille a été économisé sur le `.wasm` en
  enlevant complètement cette dépendance à l'allocateur ?
