> # 🚧 Attention, peinture fraîche !
>
> Cette page a été traduite par une seule personne et n'a pas été relue et
> vérifiée par quelqu'un d'autre ! Les informations peuvent par exemple être
> erronées, être formulées maladroitement, ou contenir d'autres types de fautes.

<!--
# Rules of Conway's Game of Life
-->

# Les règles du jeu de la vie de Conway

<!--
*Note: If you are already familiar with Conway's Game of Life and its rules,
feel free to skip to the next section!*
-->

*Note : si vous connaissez bien les règles du jeu de la vie de Conway, vous
pouvez sauter à la section suivante !*

<!--
[Wikipedia gives a great description of the rules of Conway's Game of
Life:][wikipedia]
-->

[Wikipedia décrit bien les règles du jeu de la vie de Conway :][wikipedia]

<!--
> The universe of the Game of Life is an infinite two-dimensional orthogonal
> grid of square cells, each of which is in one of two possible states, alive or
> dead, or "populated" or "unpopulated". Every cell interacts with its eight
> neighbours, which are the cells that are horizontally, vertically, or
> diagonally adjacent. At each step in time, the following transitions occur:
>
> 1. Any live cell with fewer than two live neighbours dies, as if caused by
>    underpopulation.
>
> 2. Any live cell with two or three live neighbours lives on to the next
>    generation.
>
> 3. Any live cell with more than three live neighbours dies, as if by
>    overpopulation.
>
> 4. Any dead cell with exactly three live neighbours becomes a live cell, as if
>    by reproduction.
>
> The initial pattern constitutes the seed of the system. The first generation
> is created by applying the above rules simultaneously to every cell in the
> seed—births and deaths occur simultaneously, and the discrete moment at which
> this happens is sometimes called a tick (in other words, each generation is a
> pure function of the preceding one). The rules continue to be applied
> repeatedly to create further generations.
-->

> L'univers du jeu de la vie est une grille orthogonale infinie de cellules
> carrées sur deux dimensions, qui ont deux états possibles, soit vivante soit
> morte. Chaque cellule interagit avec ses 8 cellules voisines, celles qui sont
> alignées verticalement, horizontalement, et en diagonale. A chaque étape, les
> évolutions suivantes se produisent :
>
> 1. Toute cellule vivante avec moins de deux voisines vivantes meurt, comme si
>    cela était un effet de sous-population.
>
> 2. Toute cellule vivante avec deux ou trois voisines vivantes survit jusqu'à
>    la prochaine génération.
>
> 3. Toute cellule vivante avec plus de trois voisines vivantes meurt, comme si
>    cela était un effet de surpopulation.
>
> 4. Toute cellule morte avec exactement trois voisines vivantes devient une
>    cellule vivante, comme si cela était un effet de reproduction.
>
> Le dessin initial représente la graine du système. La première génération est
> créée en appliquant simultanément les règles précédentes sur chaque cellule de
> la graine, ainsi les naissances et les morts se produisent simultanément, et
> le moment précis où cela se produit est parfois appelé un tick (autrement dit,
> chaque génération dépend purement de la précédente). Les règles continuent à
> s'appliquer en boucle pour engendrer les générations suivantes.

<!--
[wikipedia]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
-->

[wikipedia]: https://fr.wikipedia.org/wiki/Jeu_de_la_vie

<!--
Consider the following initial universe:
-->

Imaginons l'univers initial suivant :

<!--
<img src='images/game-of-life/initial-universe.png' alt='Initial Universe' width=80 />
-->

<img
  src='images/game-of-life/initial-universe.png'
  alt='Univers initial'
  width=80 />

<!--
We can calculate the next generation by considering each cell. The top left cell
is dead. Rule (4) is the only transition rule that applies to dead
cells. However, because the top left cell does not have exactly three live
neighbors, the transition rule does not apply, and it remains dead in the next
generation. The same goes for every other cell in the first row as well.
-->

Nous pouvons calculer la prochaine génération en analysant chaque cellule. La
cellule d'en haut à gauche est morte. La règle (4) est la seule règle
d'évolution qui s'applique aux cellules mortes. Cependant, comme la cellule
d'en haut à gauche n'a pas exactement trois voisines vivantes, la règle
d'évolution ne peut pas s'appliquer, et elle reste morte à la prochaine
génération. C'est aussi ce qui se passe pour les autres cellules dans la
première ligne.

<!--
Things get interesting when we consider the top live cell, in the second row,
third column. For live cells, any of the first three rules potentially
applies. In this cell's case, it has only one live neighbor, and therefore rule
(1) applies: this cell will die in the next generation. The same fate awaits the
bottom live cell.
-->

Les choses deviennent intéressantes lorsque nous analysons la première cellule
vivante en haut, dans la deuxième ligne et troisième colonne. Pour les cellules
vivantes, les trois premières règles peuvent potentiellement s'appliquer. Dans
le cas de cette cellule, elle n'a qu'une seule voisine vivante, ce qui fait que
la règle (1) s'applique : cette cellule va mourir à la prochaine génération. Le
même destin va se produire pour la cellule vivante d'en bas.

<!--
The middle live cell has two live neighbors: the top and bottom live cells. This
means that rule (2) applies, and it remains live in the next generation.
-->

La cellule du milieu a deux voisines vivantes : les cellules du haut et du bas.
Cela signifie que la règle (2) s'applique, et donc elle reste vivante à la
prochaine génération.

<!--
The final interesting cases are the dead cells just to the left and right of the
middle live cell. The three live cells are all neighbors both of these cells,
which means that rule (4) applies, and these cells will become alive in the next
generation.
-->

Les derniers cas intéressants concernent les cellules mortes à la gauche et la
droite de la cellule vivante du milieu. Les trois cellules vivantes sont toutes
des voisines de ces deux cellules, ce qui signifie que la règle (4) s'applique,
et que ces cellules vont naître et être vivantes à la prochaine génération.

<!--
Put it all together, and we get this universe after the next tick:
-->

Une fois toutes ces conditions assemblées, nous obtenons l'univers suivant après
le prochain tick :

<!--
<img src='images/game-of-life/next-universe.png' alt='Next Universe' width=80 />
-->

<img
  src='images/game-of-life/next-universe.png'
  alt="L'univers suivant"
  width=80 />

<!--
From these simple, deterministic rules, strange and exciting behavior emerges:
-->

Un comportement intéressant et étrange émerge de ces règles simples et
déterministes :

<!--
| Gosper's glider gun | Pulsar | Space ship |
|---|---|---|
| ![Gosper's glider gun](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif) | ![Pulsar](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif) | ![Lighweight space ship](https://upload.wikimedia.org/wikipedia/commons/3/37/Game_of_life_animated_LWSS.gif) |
-->

| Le canon à planeurs de Gosper | Un pulsar | Un vaisseau spatial |
|---|---|---|
| ![Le canon à planeurs de Gosper](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif) | ![Un pulsar](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif) | ![Un petit vaisseau spatial](https://upload.wikimedia.org/wikipedia/commons/3/37/Game_of_life_animated_LWSS.gif) |

<!--
<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C2vgICfQawE?rel=0&amp;start=65" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</center>
-->

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Gbvy6gY5Ev4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

<!--
## Exercises
-->

## Exercices

<!--
* Compute by hand the next tick of our example universe. Notice anything
  familiar?
-->

* Calculez à la main la prochaine tick de notre univers d'exemple. Est-ce que
  vous ne remarquez pas quelque chose ?

<!--
  <details>
    <summary>Answer</summary>

    It should be the initial state of the example universe:

    <img src='images/game-of-life/initial-universe.png' alt='Initial Universe' width=80 />

    This pattern is *periodic*: it returns to the initial state after every two
    ticks.

  </details>
-->

<details>
  <summary>Réponse</summary>

  Vous devriez retrouver l'état initial de l'univers de l'exemple :

  <img
    src='images/game-of-life/initial-universe.png'
    alt='Univers initial'
    width=80 />

  Ce schéma est *périodique* : il retourne à son état initial tous les deux
  ticks.

</details>

<!--
* Can you find an initial universe that is stable? That is, a universe in which
  every generation is always the same.
-->

* Pouvez-vous trouver un univers initial qui est stable ? Cela désigne un
  univers dont chaque génération est toujours la même.

<!--
  <details>
    <summary>Answer</summary>

    There are an infinite number of stable universes! The trivially stable
    universe is the empty universe. A two-by-two square of live cells is also a
    stable universe.

  </details>
-->

<details>
  <summary>Réponse</summary>

  Il y a un nombre infini d'univers stables ! L'univers stable le plus trivial
  est l'univers qui est vide. Un carré de deux cellules de large et de deux
  cellules de haut est aussi un univers stable.

</details>
