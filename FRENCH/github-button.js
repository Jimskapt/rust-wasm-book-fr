document.addEventListener('DOMContentLoaded', () => {
	let a = document.createElement("a");
	a.setAttribute("href", "https://github.com/Jimskapt/rust-wasm-book-fr");
	a.setAttribute("title", "See GitHub repository of this book");
	a.setAttribute("aria-label", "See GitHub repository of this book");
	a.setAttribute("target", "_blank");

	let i = document.createElement("i");
	i.setAttribute("id", "github-button");
	i.setAttribute("class", "fa fa-github");

	a.appendChild(i);

	document.querySelector("#menu-bar-sticky-container .right-buttons").appendChild(a);
});
