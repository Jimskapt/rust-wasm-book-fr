> # 🚧 Attention, peinture fraîche !
>
> Cette page a été traduite par une seule personne et n'a pas été relue et
> vérifiée par quelqu'un d'autre ! Les informations peuvent par exemple être
> erronées, être formulées maladroitement, ou contenir d'autres types de fautes.

<!--
# Publishing to npm
-->

# Publier sur npm

<!--
Now that we have a working, fast, *and* small `wasm-game-of-life` package, we
can publish it to npm so other JavaScript developers can reuse it, if they ever
need an off-the-shelf Game of Life implementation.
-->

Maintenant que nous avons un paquet `jeu-de-la-vie` qui fonctionne, qui est
rapide *et* de petite taille, nous pouvons le publier sur npm pour que les
autres développeurs Javascript puissent le réutiliser, si ils ont besoin d'une
implémentation du Jeu de la vie.

<!--
## Prerequisites
-->

## Prérequis

<!--
First, [make sure you have an npm account](https://www.npmjs.com/signup).
-->

Tout d'abord, [faites en sorte d'avoir un compte
npm](https://www.npmjs.com/signup).

<!--
Second, make sure you are logged into your account locally, by running this
command:
-->

Ensuite, assurez-vous que vous êtes connectés à ce compte en local, en lançant
cette commande :

<!--
```
wasm-pack login
```
-->

```
wasm-pack login
```

<!--
## Publishing
-->

## Publier

<!--
Make sure that the `wasm-game-of-life/pkg` build is up to date by running
`wasm-pack` inside the `wasm-game-of-life` directory:
-->

Assurez-vous que la compilation `wasm-jeu-de-la-vie/pkg` est à jour en exécutant
`wasm-pack` dans le dossier `wasmè-jeu-de-la-vie` :

<!--
```
wasm-pack build
```
-->

```
wasm-pack build
```

<!--
Take a moment to check out the contents of `wasm-game-of-life/pkg` now, this is
what we are publishing to npm in the next step!
-->

Prenez ensuite un petit moment pour vérifier le contenu de
`wasm-jeu-de-la-vie/pkg`, c'est ce que nous allons publier sur npm à la
prochaine phase !

<!--
When you're ready, run `wasm-pack publish` to upload the package to npm:
-->

Lorsque vous serez prêt, lancez `wasm-pack publish` pour téléverser le paquet
sur npm :

<!--
```
wasm-pack publish
```
-->

```
wasm-pack publish
```

<!--
That's all it takes to publish to npm!
-->

C'est tout ce qu'il faut faire pour publier sur npm !

<!--
...except other folks have also done this tutorial, and therefore the
`wasm-game-of-life` name is taken on npm, and that last command probably didn't
work.
-->

... sauf que d'autres compères ont déjà suivi ce tutoriel, et donc le nom
`wasm-jeu-de-la-vie` est déjà pris sur npm, et donc cette dernière commande va
échouer.

<!--
Open up `wasm-game-of-life/Cargo.toml` and add your username to the end of the
`name` to disambiguate the package in a unique way:
-->

Ouvrez `wasm-jeu-de-la-vie/Cargo.toml` et ajoutez votre nom d'utilisateur à la
fin du nom pour distinguer votre paquet de manière unique :

<!--
```toml
[package]
name = "wasm-game-of-life-my-username"
```
-->

```toml
[package]
name = "wasm-jeu-de-la-vie-mon-nom-utilisateur"
```

<!--
Then, rebuild and publish again:
-->

Et ensuite, recompilez et publiez-le à nouveau :

<!--
```
wasm-pack build
wasm-pack publish
```
-->

```
wasm-pack build
wasm-pack publish
```

<!--
This time it should work!
-->

Et cette fois-ci, cela devrait fonctionner !
