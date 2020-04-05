> # 🚧 Attention, peinture fraîche !
>
> Cette page a été traduite par une seule personne et n'a pas été relue et
> vérifiée par quelqu'un d'autre ! Les informations peuvent par exemple être
> erronées, être formulées maladroitement, ou contenir d'autres types de fautes.

<!--
# Why Rust and WebAssembly?
-->

# Pourquoi Rust et le WebAssembly ?

<!--
## Low-Level Control with High-Level Ergonomics
-->

## Ils offrent un contrôle de bas-niveau, mais avec une ergonomie de haut-niveau

<!--
JavaScript Web applications struggle to attain and retain reliable performance.
JavaScript's dynamic type system and garbage collection pauses don't help.
Seemingly small code changes can result in drastic performance regressions if
you accidentally wander off the JIT's happy path.
-->

Les applications web en Javascript ont du mal à atteindre et conserver des
performances satisfaisantes. Le système de type dynamique du Javascript et les
interruptions pour le ramasse-miette n'aident pas non plus. Des petits
changements en apparance mineurs peuvent impliquer de grosses régressions de
performances si vous écartez de la trajectoire prédit par le système
Just-In-Time.

<!--
Rust gives programmers low-level control and reliable performance. It is free
from the non-deterministic garbage collection pauses that plague JavaScript.
Programmers have control over indirection, monomorphization, and memory layout.
-->

Rust offre aux développeurs un contrôle du bas-niveau et des performances
efficaces. Il n'est pas soumis aux interruptions du ramasse-miettes qui accable
le Javascript. Les développeurs ont le contrôle sur l'indirection, la
monomorphisation, et l'utilisation de la mémoire.

<!--
## Small `.wasm` Sizes
-->

## Ils produisent des `.wasm` légers

<!--
Code size is incredibly important since the `.wasm` must be downloaded over the
network. Rust lacks a runtime, enabling small `.wasm` sizes because there is no
extra bloat included like a garbage collector. You only pay (in code size) for
the functions you actually use.
-->

La taille du code est très importante car le `.wasm` doit être téléchargé à
partir du réseau. Rust n'a pas d'environnement d'exécution, ce qui permet
d'obtenir des `.wasm` légers car il n'a pas de charge supplémentaire comme par
exemple un ramasse-miettes. Vous ne payez (en terme de taille de code) que pour
les fonctions que vous utilisez vraiment.

<!--
## Do *Not* Rewrite Everything
-->

## Il n'est *pas* nécessaire de tout ré-écrire

<!--
Existing code bases don't need to be thrown away. You can start by porting your
most performance-sensitive JavaScript functions to Rust to gain immediate
benefits. And you can even stop there if you want to.
-->

La base de code existante n'a pas besoin d'être jetée. Vous pouvez commencer par
porter en Rust vos fonctions Javascript les plus critiques pour les performances
pour obtenir immédiatement des gains de performances. Et vous pouvez vous y
arrêter là si vous le souhaitez.

<!--
## Plays Well With Others
-->

## Ils s'accommodent bien avec les autres

<!--
Rust and WebAssembly integrates with existing JavaScript tooling. It supports
ECMAScript modules and you can continue using the tooling you already love, like
npm, Webpack, and Greenkeeper.
-->

Rust et WebAssembly s'intègrent dans les outils existants en Javascript. Ils
supportent les modules ECMAScript et vous pouvez continuer à utiliser vos outils
préférés, comme par exemple npm ou Webpack.

<!--
## The Amenities You Expect
-->

## Ils offrent des commodités dont vous avez besoin

<!--
Rust has the modern amenities that developers have come to expect, such as:
-->

Rust offre des services que les développeurs attendent implicitement, comme :

<!--
* strong package management with `cargo`,
-->

* une gestion de packets efficiente avec `cargo`,

<!--
* expressive (and zero-cost) abstractions,
-->

* des abstractions explicites (et sans coût),

<!--
* and a welcoming community! 😊
-->

* et une communauté chaleureuse ! 😊
