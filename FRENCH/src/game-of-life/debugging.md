<!--
# Debugging
-->

# Débogage

<!--
Before we write much more code, we will want to have some debugging tools in our
belt for when things go wrong. Take a moment to review the [reference page
listing tools and approaches available for debugging Rust-generated
WebAssembly][reference-debugging].
-->

Avant d'écrire plus de code, nous devons nous équiper d'outils de débogage pour
les moments où cela se passe mal. Prenez donc une minute pour consulter la [page
de référence qui liste les outils et les approches pour déboguer le WebAssembly
généré par Rust][reference-debugging].

<!--
[reference-debugging]: ../reference/debugging.html
-->

[reference-debugging]: reference/debugging.html

<!--
## Enable Logging for Panics
-->

## Activer les journaux pour les paniques

<!--
[If our code panics, we want informative error messages to appear in the
developer console.](../reference/debugging.html#logging-panics)
-->

[Si notre code panique, nous souhaitons avoir un message d'erreur qui nous en
informe dans la console de
développement](reference/debugging.html#journaliser-les-paniques).

<!--
Our `wasm-pack-template` comes with an optional, enabled-by-default dependency
on [the `console_error_panic_hook` crate][panic-hook] that is configured in
`wasm-game-of-life/src/utils.rs`. All we need to do is install the hook in an
initialization function or common code path. We can call it inside the
`Universe::new` constructor in `wasm-game-of-life/src/lib.rs`:
-->

Notre `wasm-pack-template-fr` applique une dépendance optionnelle et activée par
défaut envers [la crate `console_error_panic_hook`][panic-hook] qui est
configurée dans `wasm-jeu-de-la-vie/src/utils.rs`. Tout ce que nous avons besoin
de faire est d'installer le système dans une fonction d'initialisation ou dans
un code standard qui s'exécutera. Nous pouvons faire appel à cela dans le
constructeur `Univers::new` dans `wasm-jeu-de-la-vie/src/lib.rs` :

<!--
```rust
pub fn new() -> Universe {
    utils::set_panic_hook();

    // ...
}
```
-->

```rust
pub fn new() -> Univers {
    utils::set_panic_hook();

    // ...
}
```

<!--
[panic-hook]: https://github.com/rustwasm/console_error_panic_hook
-->

[panic-hook]: https://github.com/rustwasm/console_error_panic_hook

<!--
## Add Logging to our Game of Life
-->

## Ajouter des journaux dans notre jeu de la vie

<!--
Let's [use the `console.log` function via the `web-sys` crate to add some
logging][logging] about each cell in our `Universe::tick` function.
-->

[Utilisons la fonction `console.log` via la crate `web-sys` pour ajouter
quelques journaux][logging] sur le traitement de chaque cellule dans notre
fonction `Univers::tick`.

<!--
First, add `web-sys` as a dependency and enable its `"console"` feature in
`wasm-game-of-life/Cargo.toml`:
-->

Pour commencer, ajoutez `web-sys` comme dépendance et ajoutez sa fonctionnalité
`"console"` dans `wasm-jeu-de-la-vie/Cargo.toml` :

<!--
```toml
[dependencies.web-sys]
version = "0.3"
features = [
  "console",
]
```
-->

```toml
[dependencies.web-sys]
version = "0.3"
features = [
  "console",
]
```

<!--
For ergonomics, we'll wrap the `console.log` function up in a `println!`-style
macro:
-->

Pour que ce soit plus pratique, nous allons intégrer la fonction `console.log`
dans une macro du même style que `println!` :

<!--
[logging]: ../reference/debugging.html#logging-with-the-console-apis
-->

[logging]: reference/debugging.html#journaliser-avec-les-api-de-console

<!--
```rust
extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}
```
-->

```rust
extern crate web_sys;

// Une macro dans le même style que `println!(..)` pour la journalisation avec
// `console.log`.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}
```

<!--
Now, we can start logging messages to the console by inserting calls to `log` in
Rust code. For example, to log each cell's state, live neighbors count, and next
state, we could modify `wasm-game-of-life/src/lib.rs` like this:
-->

Maintenant nous pouvons commencer à ajouter des journaux dans la console en
insérant des appels à `log` dans le code Rust. Par exemple, pour afficher l'état
de chaque cellule, le compteur de ses voisines vivantes, et le prochain état,
nous pouvons modifier `wasm-jeu-de-la-vie/src/lib.rs` comme ceci :

<!--
```diff
diff --git a/src/lib.rs b/src/lib.rs
index f757641..a30e107 100755
--- a/src/lib.rs
+++ b/src/lib.rs
@@ -123,6 +122,14 @@ impl Universe {
                 let cell = self.cells[idx];
                 let live_neighbors = self.live_neighbor_count(row, col);

+                log!(
+                    "cell[{}, {}] is initially {:?} and has {} live neighbors",
+                    row,
+                    col,
+                    cell,
+                    live_neighbors
+                );
+
                 let next_cell = match (cell, live_neighbors) {
                     // Rule 1: Any live cell with fewer than two live neighbours
                     // dies, as if caused by underpopulation.
@@ -140,6 +147,8 @@ impl Universe {
                     (otherwise, _) => otherwise,
                 };

+                log!("    it becomes {:?}", next_cell);
+
                 next[idx] = next_cell;
             }
         }
```
-->

```diff
diff --git a/src/lib.rs b/src/lib.rs
index f757641..a30e107 100755
--- a/src/lib.rs
+++ b/src/lib.rs
@@ -123,6 +122,14 @@ impl Univers {
                 let cellule = self.cellules[indice];
                 let voisines_vivantes = self.compter_voisines_vivantes(ligne, colonne);

+                log!(
+                    "La cellule [{}, {}] est initialement {:?} et a {} voisines vivantes",
+                    ligne,
+                    colonne,
+                    cellule,
+                    voisines_vivantes
+                );
+
                 let prochain_etat = match (cellule, voisines_vivantes) {
                     // Règle 1 : toute cellule vivante avec moins de deux
                     // voisines vivantes meurt, comme si cela était un effet de
                     // sous-population.
@@ -140,6 +147,8 @@ impl Universe {
                     (statut, _) => statut,
                 };

+                log!("    et elle devient {:?}", prochain_etat);
+
                 generation_suivante[idx] = prochain_etat;
             }
         }
```

<!--
## Using a Debugger to Pause Between Each Tick
-->

## Utiliser un débogueur pour faire une pause entre chaque tick

<!--
[Browser's stepping debuggers are useful for inspecting the JavaScript that our
Rust-generated WebAssembly interacts
with.](../reference/debugging.html#using-a-debugger)
-->

[Les débogueurs par étape des navigateurs sont utiles pour inspecter le
JavaScript avec lequel interagit notre WebAssembly généré par
Rust](reference/debugging.html#utiliser-un-débogueur).

<!--
For example, we can use the debugger to pause on each iteration of our
`renderLoop` function by placing [a JavaScript `debugger;` statement][dbg-stmt]
above our call to `universe.tick()`.
-->

Par exemple, nous pouvons utiliser le débogueur pour faire une pause sur chaque
itération de notre fonction `boucleDeRendu` en plaçant [une instruction
JavaScript `debugger;`][dbg-stmt] juste avant l'appel à `univers.tick()`.

<!--
```js
const renderLoop = () => {
  debugger;
  universe.tick();

  drawGrid();
  drawCells();

  requestAnimationFrame(renderLoop);
};
```
-->

```js
const boucleDeRendu = () => {
  debugger;
  univers.tick();

  dessinerGrille();
  dessinerCellules();

  requestAnimationFrame(boucleDeRendu);
};
```

<!--
This provides us with a convenient checkpoint for inspecting logged messages,
and comparing the currently rendered frame to the previous one.
-->

Cela nous fournit un point de passage efficace pour inspecter les journaux, et
pour comparer le rendu actuel avec le précédent.

<!--
[dbg-stmt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
-->

[dbg-stmt]:
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/debugger

<!--
[![Screenshot of debugging the Game of Life](../images/game-of-life/debugging.png)](../images/game-of-life/debugging.png)
-->

[![Capture d'écran du débogage du jeu de la
vie](images/game-of-life/debugging.png)](images/game-of-life/debugging.png)

<!--
## Exercises
-->

## Exercices

<!--
* Add logging to the `tick` function that records the row and column of each
  cell that transitioned states from live to dead or vice versa.
-->

* Ajoutez des journaux à la fonction `tick` qui affiche la ligne et la colonne
  de chaque cellule qui chaque d'état, de vivante à morte et vice-versa.

<!--
* Introduce a `panic!()` in the `Universe::new` method. Inspect the panic's
  backtrace in your Web browser's JavaScript debugger. Disable debug symbols,
  rebuild without the `console_error_panic_hook` optional dependency, and
  inspect the stack trace again. Not as useful is it?
-->

* Ajoutez un `panic!()` dans la méthode `Univers::new`. Inspectez alors la trace
  de pile dans le débogueur JavaScript de votre navigateur Web. Puis, désactivez
  les symboles de débogage, recompilez sans la dépendance optionnelle à
  `console_error_panic_hook`, et inspectez à nouveau la trace de pile. Pratique,
  n'est-ce pas ?
