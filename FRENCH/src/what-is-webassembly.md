<!--
# What is WebAssembly?
-->

# Qu'est-ce que le WebAssembly ?

<!--
WebAssembly (wasm) is a simple machine model and executable format with an
[extensive specification]. It is designed to be portable, compact, and execute
at or near native speeds.
-->

Le WebAssembly (wasm) est un modèle de système simple et un format d'exécutable
qui est décrit par des [spécifications détaillées][extensive specification]. Il
est conçu pour être portable, compacte, et s'exécuter presque aussi vite que si
c'était un programme natif.

<!--
As a programming language, WebAssembly is comprised of two formats that
represent the same structures, albeit in different ways:
-->

En tant que langage de programmation, WebAssembly est constitué de deux formats
qui représentent les mêmes structures, bien qu'étant dans des formats
différents :

<!--
1. The `.wat` text format (called `wat` for "**W**eb**A**ssembly **T**ext") uses
   [S-expressions], and bears some resemblance to the Lisp family of languages
   like Scheme and Clojure.
-->

1. Le format textuel `.wat` (qui sont les initiales de "**W**eb**A**ssembly
   **T**ext") qui utilise les [expressions symboliques][S-expressions], et
   ressemble aux langages de la famille Lisp comme Scheme et Clojure.

<!--
2. The `.wasm` binary format is lower-level and intended for consumption
   directly by wasm virtual machines. It is conceptually similar to ELF and
   Mach-O.
-->

2. Le format binaire `.wasm` qui est plus bas-niveau et est destiné à être
   utilisé par des machines virtuelles pour le wasm. Il est techniquement
   similaire à l'ELF et au Mach-O.

<!--
For reference, here is a factorial function in `wat`:
-->

Pour illustrer ceci, voici une fonction factorielle au format `wat` :

```
(module
  (func $fac (param f64) (result f64)
    get_local 0
    f64.const 1
    f64.lt
    if (result f64)
      f64.const 1
    else
      get_local 0
      get_local 0
      f64.const 1
      f64.sub
      call $fac
      f64.mul
    end)
  (export "fac" (func $fac)))
```

<!--
If you're curious about what a `wasm` file looks like you can use the [wat2wasm
demo] with the above code.
-->

Si vous vous demandez à quoi ressemble un fichier `wasm`, vous pouvez utiliser
la [démonstation wat2wasm][wat2wasm demo] avec le code ci-dessus.

<!--
## Linear Memory
-->

## La mémoire linéaire

<!--
WebAssembly has a very simple [memory model]. A wasm module has access to a
single "linear memory", which is essentially a flat array of bytes. This
[memory can be grown] by a multiple of the page size (64K). It cannot be shrunk.
-->

WebAssembly suit un [modèle de mémoire][memory model] très simple. Un module
wasm n'a accès qu'à une seule "mémoire linéaire", qui est principalement un
tableau uniforme d'octets. Cette [mémoire peut être
agrandie][memory can be grown] d'une taille correspondant à un multiple d'une
taille de page (64K). Elle ne peut pas être réduite.

<!--
## Is WebAssembly Just for the Web?
-->

## Est-ce que le WebAssembly est conçu uniquement pour le web ?

<!--
Although it has currently gathered attention in the JavaScript and Web
communities in general, wasm makes no assumptions about its host
environment. Thus, it makes sense to speculate that wasm will become a "portable
executable" format that is used in a variety of contexts in the future. As of
*today*, however, wasm is mostly related to JavaScript (JS), which comes in many
flavors (including both on the Web and [Node.js]).
-->

Bien qu'il ait actuellement attiré l'attention des communautés JavaScript et du
web en général, wasm ne sait rien sur son environnement d'accueil. Ainsi, il est
raisonnable de penser que wasm puisse devenir un format "d'exécutable portable"
qui puisse être utilisé à l'avenir dans des contextes variés. Cependant,
*à l'heure de l'écriture de ces lignes*, wasm est majoritairement associé au
JavaScript (JS), qui se décline sous plusieurs formats (y compris ceux sur le
Web et dans [Node.js]).

[memory model]: https://webassembly.github.io/spec/core/syntax/modules.html#syntax-mem
[memory can be grown]: https://webassembly.github.io/spec/core/syntax/instructions.html#syntax-instr-memory
[extensive specification]: https://webassembly.github.io/spec/
[value types]: https://webassembly.github.io/spec/core/syntax/types.html#value-types
[Node.js]: https://nodejs.org
[S-expressions]: https://en.wikipedia.org/wiki/S-expression
[wat2wasm demo]: https://webassembly.github.io/wabt/demo/wat2wasm/
