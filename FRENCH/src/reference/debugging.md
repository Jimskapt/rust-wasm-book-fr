<!--
# Debugging Rust-Generated WebAssembly
-->

# Débogage du WebAssembly généré par Rust

<!--
This section contains tips for debugging Rust-generated WebAssembly.
-->

Cette section présente des conseils pour le débogage du WebAssembly généré par
Rust.

<!--
## Building with Debug Symbols
-->

## Compiler avec des symboles de débogage

<!--
> ⚡ When debugging, always make sure you are building with debug symbols!
-->

> ⚡ Lorsque déboguez, assurez-vous que vous compilez avec les symboles de
  débogage !

<!--
If you don't have debug symbols enabled, then the `"name"` custom section won't
be present in the compiled `.wasm` binary, and stack traces will have function
names like `wasm-function[42]` rather than the Rust name of the function, like
`wasm_game_of_life::Universe::live_neighbor_count`.
-->

Si n'activez pas les symboles de débogage, la section personnalisée `"name"` ne
sera pas présente dans le binaire compilé en `.wasm`, et les traces de pile
auront des noms de fonctions comme `wasm-function[42]` plutôt que le nom de la
fonction en Rust, comme
`wasm_jeu_de_la_vie::Univers::compter_voisines_vivantes`.

<!--
When using a "debug" build (aka `wasm-pack build --debug` or `cargo build`)
debug symbols are enabled by default.
-->

Les symboles de débogage sont activés par défaut lorsqu'un utilise une
compilation en mode "debug" (comme `wasm-pack build --debug` ou `cargo build`).

<!--
With a "release" build, debug symbols are not enabled by default. To enable
debug symbols, ensure that you `debug = true` in the `[profile.release]` section
of your `Cargo.toml`:
-->

Avec une compilation en mode "release", les symboles de débogage ne sont pas
activés par défaut. Pour activer les symboles de débogage, assurez-vous que
`debug = true` soit bien présent dans la section `[profile.release]` de votre
`Cargo.toml` :

<!--
```toml
[profile.release]
debug = true
```
-->

```toml
[profile.release]
debug = true
```

<!--
## Logging with the `console` APIs
-->

## Journaliser avec les API de `console`

<!--
Logging is one of the most effective tools we have for proving and disproving
hypotheses about why our programs are buggy. On the Web, [the `console.log`
function](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) is the
way to log messages to the browser's developer tools console.
-->

La journalisation est un des outils les plus efficients que nous avons à notre
disposition pour prouver et réfuter des hypothèses sur le comportement
déficient de nos programmes. Sur le Web, [la fonction
`console.log`](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) est
une manière de journaliser les messages dans la console d'outils de
développement du navigateur.

<!--
We can use [the `web-sys` crate][web-sys] to get access to the `console` logging
functions:
-->

Nous pouvons utiliser [la crate `web-sys`][web-sys] pour accéder aux fonctions
de journalisation de `console` :

<!--
```rust
extern crate web_sys;

web_sys::console::log_1(&"Hello, world!".into());
```
-->

```rust
extern crate web_sys; // (faculatif en Rust 2018)

web_sys::console::log_1(&"Hello, world!".into());
```

<!--
Alternatively, [the `console.error`
function](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) has
the same signature as `console.log`, but developer tools tend to also capture
and display a stack trace alongside the logged message when `console.error` is
used.
-->

Sachez aussi que [la fonction
`console.error`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
a la même signature que `console.log`, mais les outils de développement ont
tendance à aussi récupérer et afficher les traces de pile à côté du message de
journal lorsqu'on utilise `console.error`.

<!--
### References
-->

### Documentations sur `console`

<!--
* Using `console.log` with the `web-sys` crate:
  * [`web_sys::console::log` takes an array of values to log](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log.html)
  * [`web_sys::console::log_1` logs a single value](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_1.html)
  * [`web_sys::console::log_2` logs two values](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_2.html)
  * Etc...
* Using `console.error` with the `web-sys` crate:
  * [`web_sys::console::error` takes an array of values to log](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error.html)
  * [`web_sys::console::error_1` logs a single value](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_1.html)
  * [`web_sys::console::error_2` logs two values](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_2.html)
  * Etc...
* [The `console` object on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console)
* [Firefox Developer Tools — Web Console](https://developer.mozilla.org/en-US/docs/Tools/Web_Console)
* [Microsoft Edge Developer Tools — Console](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)
* [Get Started with the Chrome DevTools Console](https://developers.google.com/web/tools/chrome-devtools/console/get-started)
-->

* Utiliser `console.log` avec la crate `web-sys` :
  * [`web_sys::console::log` prend en argument un tableau de valeurs à
    journaliser](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log.html)
  * [`web_sys::console::log_1` journalise une seule
    valeur](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_1.html)
  * [`web_sys::console::log_2` journalise deux
    valeurs](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_2.html)
  * Etc ...
* Utiliser `console.error` avec la crate `web-sys` :
  * [`web_sys::console::error` prend en argument un tableau de valeurs à
    journaliser](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error.html)
  * [`web_sys::console::error_1` journalise une seule
    valeur](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_1.html)
  * [`web_sys::console::error_2` journalise deux
    valeurs](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_2.html)
  * Etc ...
* [L'objet `console` sur
  MDN](https://developer.mozilla.org/fr/docs/Web/API/Console)
* [Outils de Développement Firefox — Console
  Web](https://developer.mozilla.org/fr/docs/Outils/Console_Web)
* [Outils de Développement de Microsoft Edge —
  Console](https://docs.microsoft.com/fr-fr/microsoft-edge/devtools-guide/console)
* [Débuter avec la Console de Chrome
  DevTools](https://developers.google.com/web/tools/chrome-devtools/console)

<!--
## Logging Panics
-->

## Journaliser les paniques

<!--
[The `console_error_panic_hook` crate logs unexpected panics to the developer
console via `console.error`.][panic-hook] Rather than getting cryptic,
difficult-to-debug `RuntimeError: unreachable executed` error messages, this
gives you Rust's formatted panic message.
-->

[La crate `console_error_panic_hook` journalise les paniques involontaires dans
la console avec `console.error`][panic-hook]. Plutôt que d'avoir des messages
d'erreur abstraits, difficiles à déboguer comme le
`RuntimeError: unreachable executed`, il vous fournit à la place un message de
panique formaté par Rust.

<!--
All you need to do is install the hook by calling
`console_error_panic_hook::set_once()` in an initialization function or common
code path:
-->

Tout ce que vous avez besoin de faire est d'installer ce système en faisant
appel à `console_error_panic_hook::set_once()` dans une fonction
d'initialisation ou dans un code standard qui s'exécutera :

<!--
```rust
#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}
```
-->

```rust
#[wasm_bindgen]
pub fn installer_systeme_journalisation_panique() {
    console_error_panic_hook::set_once();
}
```

<!--
[panic-hook]: https://github.com/rustwasm/console_error_panic_hook
-->

[panic-hook]: https://github.com/rustwasm/console_error_panic_hook

<!--
## Using a Debugger
-->

## Utiliser un débogueur

<!--
Unfortunately, the debugging story for WebAssembly is still immature. On most
Unix systems, [DWARF][dwarf] is used to encode the information that a debugger
needs to provide source-level inspection of a running program. There is an
alternative format that encodes similar information on Windows. Currently, there
is no equivalent for WebAssembly. Therefore, debuggers currently provide limited
utility, and we end up stepping through raw WebAssembly instructions emitted by
the compiler, rather than the Rust source text we authored.
-->

Malheureusement, le débogage pour le WebAssembly reste embryonnaire. Dans la
plupart des systèmes Unix, [DWARF][dwarf] est utilisé pour encoder les
informations qu'un débogueur a besoin d'avoir pour procéder à l'inspection de la
source d'un programme en cours d'exécution. Il existe aussi un format alternatif
qui encode des informations similaires sous Windows. Pour l'instant, il n'y a
pas d'équivalent pour WebAssembly. C'est pourquoi les débogueurs sont des outils
limités pour le moment, et nous finissons par passer par des instructions
WebAssembly brutes émises par le compilateur, plutôt que par le code source Rust
que nous avons rédigé.

<!--
> There is a [sub-charter of the W3C WebAssembly group for
> debugging][debugging-subcharter], so expect this story to improve in the
> future!
-->

> Il existe
> [une sous-commission du groupe W3C dédiée au débogage][debugging-subcharter],
> donc attendez-vous à ce que les choses s'améliorent à l'avenir !

<!--
[debugging-subcharter]: https://github.com/WebAssembly/debugging
[dwarf]: http://dwarfstd.org/
-->

[debugging-subcharter]: https://github.com/WebAssembly/debugging
[dwarf]: http://dwarfstd.org/

<!--
Nonetheless, debuggers are still useful for inspecting the JavaScript that
interacts with our WebAssembly, and inspecting raw wasm state.
-->

Toutefois, les débogueurs restent utiles pour inspecter le JavaScript qui
interagit avec notre WebAssembly, et inspecter l'état brut du wasm.

<!--
### References
-->

### Documentations sur le débogueur

<!--
* [Firefox Developer Tools — Debugger](https://developer.mozilla.org/en-US/docs/Tools/Debugger)
* [Microsoft Edge Developer Tools — Debugger](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/debugger)
* [Get Started with Debugging JavaScript in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/)
-->

* [Outils de Développement de Firefox —
  Débogueur](https://developer.mozilla.org/fr/docs/Outils/D%C3%A9bogueur)
* [Outils de Développement de Microsoft Edge —
  Débogueur](https://docs.microsoft.com/fr-fr/microsoft-edge/devtools-guide/debugger)
* [Débuter dans le Débogage du JavaScript dans Chrome
  DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/)

<!--
## Avoid the Need to Debug WebAssembly in the First Place
-->

## Eviter d'avoir besoin de déboguer le WebAssembly dans un premier temps

<!--
If the bug is specific to interactions with JavaScript or Web APIs, then [write
tests with `wasm-bindgen-test`.][wbg-test]
-->

Si le bogue concerne des interactions avec le JavaScript ou des API Web, alors
[écrivez des tests avec `wasm-bindgen-test`][wbg-test].

<!--
If a bug does *not* involve interaction with JavaScript or Web APIs, then try to
reproduce it as a normal Rust `#[test]` function, where you can leverage your
OS's mature native tooling when debugging. Use testing crates like
[`quickcheck`][quickcheck] and its test case shrinkers to mechanically reduce
test cases. Ultimately, you will have an easier time finding and fixing bugs if
you can isolate them in a smaller test cases that don't require interacting with
JavaScript.
-->

Si le bogue *n'implique pas* d'interactions avec JavaScript ou des API Web,
alors essayez de le reproduire dans une fonction `#[test]` Rust traditionnelle,
dans laquelle vous pouvez profiter des outils natifs de votre système
d'exploitation lorsque vous déboguez. Utilisez des crates pour les tests comme
[`quickcheck`][quickcheck] et ses cas de test qui réduisent automatiquement les
cas à tester. Finalement, il vous sera plus facile de trouver et de corriger des
bogues si vous pouvez les isoler dans des cas de test plus petits et qui ne
nécessitent pas d'interaction avec le JavaScript.

<!--
Note that in order to run native `#[test]`s without compiler and linker errors,
you will need to ensure that `"rlib"` is included in the `[lib.crate-type]`
array in your `Cargo.toml` file.
-->

Notez toutefois que pour pouvoir exécuter des `#[test]` natifs sans erreurs de
compilateur et de liaison, vous aurez besoin de vous assurer que `"rlib"` soit
bien présent dans le tableau `[lib.crate-type]` dans votre fichier `Cargo.toml`.

<!--
```toml
[lib]
crate-type ["cdylib", "rlib"]
```
-->

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

<!--
[quickcheck]: https://crates.io/crates/quickcheck
[web-sys]: https://rustwasm.github.io/wasm-bindgen/web-sys/index.html
[wbg-test]: https://rustwasm.github.io/wasm-bindgen/wasm-bindgen-test/index.html
-->

[quickcheck]: https://crates.io/crates/quickcheck
[web-sys]: https://rustwasm.github.io/wasm-bindgen/web-sys/index.html
[wbg-test]: https://rustwasm.github.io/wasm-bindgen/wasm-bindgen-test/index.html
