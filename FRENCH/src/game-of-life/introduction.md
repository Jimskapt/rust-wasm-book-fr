<!--
# Tutorial: Conway's Game of Life
-->

# Tutoriel : le jeu de la vie

<!--
This is a tutorial that implements [Conway's Game of Life][gol] in Rust and
WebAssembly.
-->

Ceci est un tutoriel qui va implémenter [le Jeu de la vie, de Conway][gol] en
Rust et WebAssembly.

<!--
[gol]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
-->

[gol]: https://fr.wikipedia.org/wiki/Jeu_de_la_vie

<!--
## Who is this tutorial for?
-->

## A qui s'adresse ce tutoriel ?

<!--
This tutorial is for anyone who already has basic Rust and JavaScript
experience, and wants to learn how to use Rust, WebAssembly, and JavaScript
together.
-->

Ce tutoriel a été créé pour ceux qui ont déjà une expérience de base avec Rust
et le JavaScript, et qui souhaitent en savoir plus sur l'utilisation conjointe
de Rust, WebAssembly, et JavaScript.

<!--
You should be comfortable reading and writing basic Rust, JavaScript, and
HTML. You definitely do not need to be an expert.
-->

Vous devez donc être à l'aise pour lire et écrire du code Rust, JavaScript, et
HTML. Toutefois, vous n'avez vraiment pas besoin d'en être un expert.

<!--
## What will I learn?
-->

## Qu'allons-nous apprendre ?

<!--
* How to set up a Rust toolchain for compiling to WebAssembly.
-->

* Comment régler une toolchain de Rust pour compiler en WebAssembly.

<!--
* A workflow for developing polyglot programs made from Rust, WebAssembly,
  JavaScript, HTML, and CSS.
-->

* Suivre une procédure pour développer des programmes polyglottes constitués de
  Rust, WebAssembly, HTML et CSS.

<!--
* How to design APIs to take maximum advantage of both Rust and WebAssembly's
  strengths and also JavaScript's strengths.
-->

* Comment concevoir des API pour profiter des avantages à la fois de Rust et de
  de WebAssembly et aussi des avantages de JavaScript.

<!--
* How to debug WebAssembly modules compiled from Rust.
-->

* Comment déboguer les modules en WebAssembly, compilés avec Rust.

<!--
* How to time profile Rust and WebAssembly programs to make them faster.
-->

* Comment créer un profil chronologique de programmes en Rust et WebAssembly
  pour améliorer leurs performances.

<!--
* How to size profile Rust and WebAssembly programs to make `.wasm` binaries
  smaller and faster to download over the network.
-->

* Comment établir un profil de poids des programmes en Rust et WebAssembly pour
  réduire la taille des binaires `.wasm` et ainsi accélérer leur téléchargement
  via le réseau.
