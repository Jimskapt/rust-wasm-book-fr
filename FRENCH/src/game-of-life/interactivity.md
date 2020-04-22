> # 🚧 Attention, peinture fraîche !
>
> Cette page a été traduite par une seule personne et n'a pas été relue et
> vérifiée par quelqu'un d'autre ! Les informations peuvent par exemple être
> erronées, être formulées maladroitement, ou contenir d'autres types de fautes.

<!--
# Adding Interactivity
-->

# Ajouter de l'interactivité

<!--
We will continue to explore the JavaScript and WebAssembly interface by adding
some interactive features to our Game of Life implementation. We will enable
users to toggle whether a cell is alive or dead by clicking on it, and
allow pausing the game, which makes drawing cell patterns a lot easier.
-->

Nous allons continuer à explorer l'interfaçage entre le JavaScript et le
WebAssembly en ajouter des fonctionnalités d'interaction avec notre
implémentation du jeu de la vie. Nous allons permettre aux utilisateurs de
changer le statut vivant ou mort d'une cellule en cliquant dessus, et aussi leur
permettre de mettre en pause le jeu, ce qui va faciliter le dessin de certains
schémas.

<!--
## Pausing and Resuming the Game
-->

## Mettre en pause et reprendre le jeu

<!--
Let's add a button to toggle whether the game is playing or paused. To
`wasm-game-of-life/www/index.html`, add the button right above the `<canvas>`:
-->

Ajoutons un bouton pour changer si le jeu est en cours de lecture ou en pause.
Dans `wasm-jeu-de-la-vie/www/index.html`, ajoutez le bouton juste au-dessus le
`<canvas>` :

<!--
```html
<button id="play-pause"></button>
```
-->

```html
<button id="lecture-pause"></button>
```

<!--
In the `wasm-game-of-life/www/index.js` JavaScript, we will make the following
changes:
-->

Dans le JavaScript `wasm-game-of-life/www/index.js`, nous allons faire les
changements suivants :

<!--
* Keep track of the identifier returned by the latest call to
  `requestAnimationFrame`, so that we can cancel the animation by calling
  `cancelAnimationFrame` with that identifier.
-->

* Conserver l'identifiant retourné par le dernier appel à
  `requestAnimationFrame`, pour que nous puissions annuler l'animation en
  faisant appel à `cancelAnimationFrame` avec cet identifiant.

<!--
* When the play/pause button is clicked, check for whether we have the
  identifier for a queued animation frame. If we do, then the game is currently
  playing, and we want to cancel the animation frame so that `renderLoop` isn't
  called again, effectively pausing the game. If we do not have an identifier
  for a queued animation frame, then we are currently paused, and we would like
  to call `requestAnimationFrame` to resume the game.
-->

* Lorsque le bouton lecture/pause sera actionné, on va regarder si nous avons un
  identifiant pour un calcul d'une génération de l'animation. Si c'est le cas,
  alors le jeu est actuellement en cours de lecture, et cela veut donc dire que
  nous souhaitons annuler le calcul pour éviter que `boucleDeRendu` soit appelé
  à nouveau, ce qui aura pour effet de mettre en pause le jeu. Si nous n'avons
  pas d'identifiant pour un calcul d'une génération de l'animation, alors cela
  veut dire que nous sommes actuellement en pause, et nous devons faire appel à
  `requestAnimationFrame` pour reprendre le jeu.

<!--
Because the JavaScript is driving the Rust and WebAssembly, this is all we need
to do, and we don't need to change the Rust sources.
-->

Comme le JavaScript pilote le Rust via le WebAssembly, c'est tout ce que nous
avons besoin de faire, et nous n'avons pas besoin de changer le code source
Rust.

<!--
We introduce the `animationId` variable to keep track of the identifier returned
by `requestAnimationFrame`. When there is no queued animation frame, we set this
variable to `null`.
-->

Nous ajoutons la variable `animationId` pour conserver l'identifiant retourné
par `requestAnimationFrame`. Lorsqu'il n'y a pas de calcul d'une génération de
l'animation, nous donnons assignons la valeur `null` à cette variable.

<!--
```js
let animationId = null;

// This function is the same as before, except the
// result of `requestAnimationFrame` is assigned to
// `animationId`.
const renderLoop = () => {
  drawGrid();
  drawCells();

  universe.tick();

  animationId = requestAnimationFrame(renderLoop);
};
```
-->

```js
let animationId = null;

// Cette fonction est la même qu'avant, sauf que le résultat de
// `requestAnimationFrame` est assigné à `animationId`.
const boucleDeRendu = () => {
  dessinerGrille();
  dessinerCellules();

  univers.tick();

  animationId = requestAnimationFrame(boucleDeRendu);
};
```

<!--
At any instant in time, we can tell whether the game is paused or not by
inspecting the value of `animationId`:
-->

A n'importe quel moment, nous pouvons savoir si le jeu est en pause ou non en
vérifiant la valeur de `animationId` :

<!--
```js
const isPaused = () => {
  return animationId === null;
};
```
-->

```js
const estEnPause = () => {
  return animationId === null;
};
```

<!--
Now, when the play/pause button is clicked, we check whether the game is
currently paused or playing, and resume the `renderLoop` animation or cancel the
next animation frame respectively. Additionally, we update the button's text
icon to reflect the action that the button will take when clicked next.
-->

Maintenant lorsque le bouton lecture/pause est cliqué, nous vérifions si le jeu
est en pause ou en lecture, et respectivement nous reprenons l'animation
`boucleDeRendu` ou nous arrêtons le calcul de la prochaine génération de
l'animation. De plus, nous allons changer le texte du bouton pour refléter
l'action que le bouton va faire lors du prochain clic.

<!--
```js
const playPauseButton = document.getElementById("play-pause");

const play = () => {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = "▶";
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener("click", event => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});
```
-->

```js
const boutonLecturePause = document.getElementById("lecture-pause");

const lecture = () => {
  boutonLecturePause.textContent = "⏸";
  boucleDeRendu();
};

const pause = () => {
  boutonLecturePause.textContent = "▶";
  cancelAnimationFrame(animationId);
  animationId = null;
};

boutonLecturePause.addEventListener("click", event => {
  if (estEnPause()) {
    lecture();
  } else {
    pause();
  }
});
```

<!--
Finally, we were previously kick-starting the game and its animation by calling
`requestAnimationFrame(renderLoop)` directly, but we want to replace that with a
call to `play` so that the button gets the correct initial text icon.
-->

Enfin, jusqu'ici nous avons démarré le jeu et son animation en faisant
directement appel à `requestAnimationFrame(boucleDeRendu)`, mais nous voulons
remplacer cela par l'appel à `lecture` pour que le bouton ait la bonne icone
initiale.

<!--
```diff
// This used to be `requestAnimationFrame(renderLoop)`.
play();
```
-->

```diff
// On utilise cela à la place de `requestAnimationFrame(boucleDeRendu)`.
lecture();
```

<!--
Refresh [http://localhost:8080/](http://localhost:8080/) and we should now be
able to pause and resume the game by clicking on the button!
-->

Rafraîchissez [http://localhost:8080/](http://localhost:8080/) et vous devriez
maintenant mettre en pause et reprendre le jeu en cliquant sur le bouton !

<!--
## Toggling a Cell's State on `"click"` Events
-->

## Changer l'état d'une cellule avec un évènement `"click"`

<!--
Now that we can pause the game, it's time to add the ability to mutate the cells
by clicking on them.
-->

Maintenant que nous pouvons mettre le jeu en pause, nous pouvons ajouter la
possibilité de muter les cellules en cliquant sur elles.

<!--
To toggle a cell is to flip its state from alive to dead or from dead to
alive. Add a `toggle` method to `Cell` in `wasm-game-of-life/src/lib.rs`:
-->

Pour basculer le statut d'une cellule de vivante à morte, ou de morte à vivante.
Ajoutez une méthode `basculer` à `Cellule` dans
`wasm-jeu-de-la-vie/src/lib.rs` :

<!--
```rust
impl Cell {
    fn toggle(&mut self) {
        *self = match *self {
            Cell::Dead => Cell::Alive,
            Cell::Alive => Cell::Dead,
        };
    }
}
```
-->

```rust
impl Cellule {
    fn basculer(&mut self) {
        *self = match *self {
            Cellule::Morte => Cellule::Vivante,
            Cellule::Vivante => Cellule::Morte,
        };
    }
}
```

<!--
To toggle the state of a cell at given row and column, we translate the row and
column pair into an index into the cells vector and call the toggle method on
the cell at that index:
-->

Pour basculer l'état d'une cellule à une ligne et colonne donnée, nous
traduisons le couple ligne et colonne en indice du vecteur de toutes les
cellules et nous faisons appel à la méthode `basculer` sur la cellule à cet
indice :

<!--
```rust
/// Public methods, exported to JavaScript.
#[wasm_bindgen]
impl Universe {
    // ...

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        self.cells[idx].toggle();
    }
}
```
-->

```rust
/// Méthodes publiques, exportées en JavaScript.
#[wasm_bindgen]
impl Univers {
    // ...

    pub fn basculer_cellule(&mut self, ligne: u32, colonne: u32) {
        let indice = self.calculer_indice(ligne, colonne);
        self.cellules[indice].basculer();
    }
}
```

<!--
This method is defined within the `impl` block that is annotated with
`#[wasm_bindgen]` so that it can be called by JavaScript.
-->

Cette méthode est définie dans le bloc `impl` qui est annoté avec
`#[wasm_bingen]` afin qu'il puisse être appelé en JavaScript.

<!--
In `wasm-game-of-life/www/index.js`, we listen to click events on the `<canvas>`
element, translate the click event's page-relative coordinates into
canvas-relative coordinates, and then into a row and column, invoke the
`toggle_cell` method, and finally redraw the scene.
-->

Dans `wasm-jeu-de-la-vie/www/index.js`, nous écoutons les évènements de clics
sur le noeud `<canvas>`, puis nous traduisons les coordonnées du clic dans le
contexte de la page en coordonnées dans le canvas, et ensuite ces coordonnées
en ligne et colonne, puis nous évoquons la méthode `basculer_cellule`, et enfin
nous redessinons la scène.

<!--
```js
canvas.addEventListener("click", event => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawGrid();
  drawCells();
});
```
-->

```js
canvas.addEventListener("click", evenement => {
  const zoneRectangulaire = canvas.getBoundingClientRect();

  const echelleX = canvas.width / zoneRectangulaire.width;
  const echelleY = canvas.height / zoneRectangulaire.height;

  const distanceGaucheDuCanvas = (evenement.clientX - zoneRectangulaire.left) * echelleX;
  const distanceHautDuCanvas = (evenement.clientY - zoneRectangulaire.top) * echelleY;

  const ligne = Math.min(Math.floor(distanceHautDuCanvas / (CELL_SIZE + 1)), hauteur - 1);
  const colonne = Math.min(Math.floor(distanceGaucheDuCanvas / (CELL_SIZE + 1)), largeur - 1);

  univers.basculer_cellule(ligne, colonne);

  dessinerGrille();
  dessinerCellules();
});
```

<!--
Rebuild with `wasm-pack build` in `wasm-game-of-life`, then refresh
[http://localhost:8080/](http://localhost:8080/) again and we can now draw our
own patterns by clicking on the cells and toggling their state.
-->

Recompilez avec `wasm-pack build` dans le dossier `wasm-jeu-de-la-vie`, ensuite
rafraîchissez à nouveau la page [http://localhost:8080/](http://localhost:8080/)
et vous devriez pouvoir dessiner vos propres schémas en cliquant sur les
cellules pour pouvoir changer leur état.

<!--
## Exercises
-->

## Exercices

<!--
* Introduce an [`<input type="range">`][input-range] widget to control how many
  ticks occur per animation frame.
-->

* Ajouter un composant [`<input type="range">`][input-range] pour pouvoir régler
  combien de ticks se produisent à chaque séquence de l'animation.

<!--
* Add a button that resets the universe to a random initial state when
  clicked. Another button that resets the universe to all dead cells.
-->

* Ajouter un bouton qui réinitialise l'univers dans un état initial aléatoire
  lorsqu'on clique dessus. Et un autre bouton qui réinitialise l'univers avec
  uniquement des cellules mortes.

<!--
* On `Ctrl + Click`, insert a
  [glider](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)) centered on
  the target cell. On `Shift + Click`, insert a pulsar.
-->

* Lors d'un `Ctrl + Clic`, insérez un
  [planeur](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)) centré sur
  la cellule cible.
  Lors d'un `Shift + Clic`, insérez un pulsar.

<!--
[input-range]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
-->

[input-range]:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
