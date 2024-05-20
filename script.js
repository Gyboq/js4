document.getElementById('searchButton').addEventListener('click', fetchPokemon);

async function fetchPokemon() {
    const container = document.getElementById('container');
    container.innerHTML = ''; 
    const pokemonId = document.getElementById('pokemonId').value;

    if (!pokemonId) {
        renderError('Please enter a valid Pokémon ID.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        renderPokemonCard(pokemon);
    } catch (error) {
        renderError(error.message);
    }
}

function renderPokemonCard(pokemon) {
    const container = document.getElementById('container');
    const card = document.createElement('div');
    card.className = 'card';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    const types = document.createElement('p');
    types.textContent = 'Type: ' + pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    const height = document.createElement('p');
    height.textContent = 'Height: ' + pokemon.height / 10 + ' m';

    const weight = document.createElement('p');
    weight.textContent = 'Weight: ' + pokemon.weight / 10 + ' kg';

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(types);
    card.appendChild(height);
    card.appendChild(weight);

    container.appendChild(card);
}

function renderError(message) {
    const container = document.getElementById('container');
    const error = document.createElement('p');
    error.className = 'error';
    error.textContent = message;
    container.appendChild(error);
}
