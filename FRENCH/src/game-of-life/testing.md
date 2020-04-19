<!--
# Testing Conway's Game of Life
-->

# Tester le jeu de la vie de Conway

<!--
Now that we have our Rust implementation of the Game of Life rendering in the 
browser with JavaScript, let's talk about testing our Rust-generated 
WebAssembly functions.
-->

Maintenant que nous avons notre implémentation en Rust du jeu de la vie qui
s'exécute dans le navigateur web avec JavaScript, nous pouvons voir comment
tester nos fonctions WebAssembly générées par Rust.

<!--
We are going to test our `tick` function to make sure that it gives us the 
output that we expect.
-->

Nous allons tester notre fonction `tick` pour s'assurer qu'elle nous donne bien
le résultat que nous souhaitons.

<!--
Next, we'll want to create some setter and getter 
functions inside our existing `impl Universe` block in the
`wasm_game_of_life/src/lib.rs` file. We are going to create a `set_width`
and a `set_height` function so we can create `Universe`s of different sizes.
-->

Ensuite, nous allons créer des mutateurs et des accesseurs dans notre bloc
`impl Univers` dans le ficher `wasm-jeu-de-la-vie/src/lib.rs`. Nous allons créer
une fonction `set_largeur` et `set_hauteur` pour que nous puissions créer des
`Univers` de différentes tailles.

<!--
```rust
#[wasm_bindgen]
impl Universe { 
    // ...

    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_i| Cell::Dead).collect();
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..self.width * height).map(|_i| Cell::Dead).collect();
    }

}
```
-->

```rust
#[wasm_bindgen]
impl Univers {
    // ...

    /// Définit la largeur de l'univers.
    ///
    /// Cela va tuer toutes les cellules.
    pub fn set_largeur(&mut self, largeur: u32) {
        self.largeur = largeur;
        self.cellules = (0..largeur * self.hauteur).map(|_i| Cellule::Morte).collect();
    }

    /// Définit la hauteur de l'univers.
    ///
    /// Cela va tuer toutes les cellules.
    pub fn set_hauteur(&mut self, hauteur: u32) {
        self.hauteur = hauteur;
        self.cellules = (0..self.largeur * hauteur).map(|_i| Cellule::Morte).collect();
    }

}
```

<!--
We are going to create another `impl Universe` block inside our
`wasm_game_of_life/src/lib.rs` file without the `#[wasm_bindgen]` attribute.
There are a few functions we need for testing that we don't want to expose to
our JavaScript. Rust-generated WebAssembly functions cannot return
borrowed references. Try compiling the Rust-generated WebAssembly with the
attribute and take a look at the errors you get.
-->

Nous allons créer un autre bloc `impl Univers` dans notre fichier
`wasm-jeu-de-la-vie` sans l'attribut `#[wasm_bindgen]`. Il y a quelques
fonctions que nous avons besoin pour tester que nous ne souhaitons pas exposer
au JavaScript. Les fonctions WebAssembly générées par Rust ne peut pas retourner
des références empruntées. Essayez de compiler le WebAssembly généré par Rust
avec l'attribut et constatez les erreurs que vous obtenez.

<!--
We are going to write the implementation of `get_cells` to get the contents of
the `cells` of a `Universe`. We'll also write a `set_cells` function so we can
set `cells` in a specific row and column of a `Universe` to be `Alive.`
-->

Nous allons écrire l'implémentation de `get_cellules` pour obtenir le contenu de
`cellules` d'un `Univers`. Nous allons aussi écrire une fonction `set_cellules`
pour que nous puissions donner vie à des `cellules` d'un `Univers`.

<!--
```rust
impl Universe {
    /// Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells[idx] = Cell::Alive;
        }
    }

}
```
-->

```rust
impl Univers {
    /// Donne toutes les cellules mortes et vivantes de l'univers.
    pub fn get_cellules(&self) -> &[Cellule] {
        &self.cellules
    }

    /// Définit les cellules vivantes de l'univers en lui fournissant la ligne
    /// et la colonne de chacune des cellules dans un tableau.
    pub fn set_cellules(&mut self, cellules: &[(u32, u32)]) {
        for (ligne, colonne) in cellules.iter().cloned() {
            let indice = self.get_index(ligne, colonne);
            self.cellules[indice] = Cellule::Vivante;
        }
    }

}
```

<!--
Now we're going to create our test in the `wasm_game_of_life/tests/web.rs` file.
-->

Maintenant nous pouvons créer notre test dans le fichier
`wasm-jeu-de-la-vie/tests/web.rs`.

<!--
Before we do that, there is already one working test in the file. You can
confirm that the Rust-generated WebAssembly test is working by running
`wasm-pack test --chrome --headless` in the `wasm-game-of-life` directory.
You can also use the `--firefox`, `--safari`, and `--node` options to
test your code in those browsers.
-->

Avant de nous lancer, nous constatons qu'il existe déjà un test qui fonctionne
dans ce fichier. Vous pouvez confirmer que le test du WebAssembly généré par
Rust fonctionne en exécutant `wasm-pack test --chrome --headless` dans le
dossier `wasm-jeu-de-la-vie`. Vous pouvez utiliser les options `--firefox`,
`--safari`, et `--node` pour tester votre code dans ces navigateurs.

<!--
In the `wasm_game_of_life/tests/web.rs` file, we need to export our
`wasm_game_of_life` crate and the `Universe` type.
-->

Dans le fichier `wasm-jeu-de-la-vie/tests/web.rs`, nous devons importer notre
crate `wasm_jeu_de_la_vie` et le type `Univers`.

<!--
```rust
extern crate wasm_game_of_life;
use wasm_game_of_life::Universe;
```
-->

```rust
extern crate wasm_jeu_de_la_vie; // (facultatif en Rust 2018)
use wasm_jeu_de_la_vie::Univers;
```

<!--
In the `wasm_game_of_life/tests/web.rs` file we'll want to create some
spaceship builder functions.
-->

Dans le fichier `wasm-jeu-de-la-vie/tests/web.rs`, nous allons ajouter quelques
fonctions qui créent des créateurs de vaisseaux spatiaux.

<!--
We'll want one for our input spaceship that we'll call the `tick` function on
and we'll want the expected spaceship we will get after one tick. We picked the
cells that we want to initialize as `Alive` to create our spaceship in the
`input_spaceship` function. The position of the spaceship in the
`expected_spaceship` function after the tick of the `input_spaceship` was
calculated manually. You can confirm for yourself that the cells of the input
spaceship after one tick is the same as the expected spaceship.
-->

Nous allons en ajouter une pour créer notre vaisseau spatial initial lorsque
nous appellerons la fonction `tick` et nous voulons qu'il soit toujours là après
une `tick`. Nous avons choisi les cellules que nous voulons donner vie pour
créer notre vaisseau spatial dans la fonction `vaisseau_spatial_initial`. La
position du vaisseau spatial dans la fonction `vaisseau_spatial_attendu` dans
la `tick` suivant `vaisseau_spatial_initial` a été calculée manuellement. Vous
pouvez vérifier par vous-même que les cellules du vaisseau spatial initial sont
les mêmes que celles attendues après une `tick`.

<!--
```rust
#[cfg(test)]
pub fn input_spaceship() -> Universe {
    let mut universe = Universe::new();
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(1,2), (2,3), (3,1), (3,2), (3,3)]);
    universe
}

#[cfg(test)]
pub fn expected_spaceship() -> Universe {
    let mut universe = Universe::new();
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(2,1), (2,3), (3,2), (3,3), (4,2)]);
    universe
}
```
-->

```rust
#[cfg(test)]
pub fn vaisseau_spatial_initial() -> Univers {
    let mut univers = Univers::new();
    univers.set_largeur(6);
    univers.set_hauteur(6);
    univers.set_cellules(&[(1,2), (2,3), (3,1), (3,2), (3,3)]);
    univers
}

#[cfg(test)]
pub fn vaisseau_spatial_attendu() -> Univers {
    let mut univers = Univers::new();
    univers.set_largeur(6);
    univers.set_hauteur(6);
    univers.set_cellules(&[(2,1), (2,3), (3,2), (3,3), (4,2)]);
    univers
}
```

<!--
Now we will write the implementation for our `test_tick` function. First, we
create an instance of our `input_spaceship()` and our `expected_spaceship()`.
Then, we call `tick` on the `input_universe`. Finally, we use the `assert_eq!`
macro to call `get_cells()` to ensure that `input_universe` and
`expected_universe` have the same `Cell` array values. We add the
`#[wasm_bindgen_test]` attribute to our code block so we can test our
Rust-generated WebAssembly code and use `wasm-pack test` to test the
WebAssembly code.
-->

Maintenant nous allons écrire l'implémentation de notre fonction `test_tick`.
Pour commencer, nous allons créer une instance de notre
`vaisseau_spatial_initial()` et de notre `vaisseau_spatial_attendu()`. Ensuite,
nous appellerons `tick` sur `univers_initial`. Enfin, nous utiliserons la macro
`assert_eq!` pour faire appel à `get_cellules()` pour s'assurer que
`univers_initial` et `univers_attendu` ont la même valeur pour leur tableau de
`Cellules`. Nous avons ajouté l'attribut `#[wasm_bindgen_test]` à notre bloc de
code pour que nous puissions tester notre code WebAssembly généré par Rust et
utiliser `wasm-pack test` pour tester le code WebAssembly.

<!--
```rust
#[wasm_bindgen_test]
pub fn test_tick() {
    // Let's create a smaller Universe with a small spaceship to test!
    let mut input_universe = input_spaceship();

    // This is what our spaceship should look like
    // after one tick in our universe.
    let expected_universe = expected_spaceship();

    // Call `tick` and then see if the cells in the `Universe`s are the same.
    input_universe.tick();
    assert_eq!(&input_universe.get_cells(), &expected_universe.get_cells());
}
```
-->

```rust
#[wasm_bindgen_test]
pub fn test_tick() {
    // On crée un petit univers avec un petit vaisseau spatial, pour tester !
    let mut univers_initial = vaisseau_spatial_initial();

    // C'est ce à quoi doit ressembler notre vaisseau spatial après une tick
    // dans notre univers.
    let univers_attendu = vaisseau_spatial_attendu();

    // Appelons `tick` et voyons ensuite si les cellules dans les `Univers` sont
    // les mêmes.
    univers_initial.tick();
    assert_eq!(&univers_initial.get_cells(), &univers_attendu.get_cells());
}
```

<!--
Run the tests within the `wasm-game-of-life` directory by running
`wasm-pack test --firefox --headless`.
-->

Exécutez les tests dans le dossier `wasm-jeu-de-la-vie` en exécutant
`wasm-pack test --firefox --headless`.
