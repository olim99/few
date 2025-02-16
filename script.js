import pokemons from "./pokemons.js";
const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortBy = document.getElementById("sortBy");
const searchButton = document.getElementById("searchButton");

function generator(pokemon) {
  pokemonContainer.innerHTML = ''; 
  pokemon.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.img}" alt="${pokemon.name}">
      <p>Type: ${pokemon.type}</p>
      <p>Weight: ${pokemon.weight}</p>
    `;
    pokemonContainer.appendChild(card);
  });
}

function filter() {
  let filteredPokemons = pokemons.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const typeMatch = filterType.value === 'all' || pokemon.type === filterType.value;
    return nameMatch && typeMatch;
  });


  if (sortBy.value === 'alphabeticalAsc') {
    filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'alphabeticalDesc') {
    filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy.value === 'weightAsc') {
    filteredPokemons.sort((a, b) => a.weight - b.weight);
  } else if (sortBy.value === 'weightDesc') {
    filteredPokemons.sort((a, b) => b.weight - a.weight);
  }

  generator(filteredPokemons);
}


searchButton.addEventListener("click", filter);

searchInput.addEventListener("input", filter);
filterType.addEventListener("change", filter);
sortBy.addEventListener("change", filter);

// Initialize with all pokemons
generator(pokemons);
