const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImage = document.querySelector('[data-poke-img]');
const pokeImageContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEAA7',
    normal: '#C7C8CC',
    fire: '#BE3144',
    water: '#5FBDFF',
    ice: '#96EFFF',
    rock: '#A9A9A9',
    flying: '#F0ECE5',
    grass: '#86A789',
    psychic: '#7360DF',
    ghost: '#BFCFE7',
    bug: '#80BCBD',
    poison: '#81689D',
    ground: '#A87C7C',
    dragon: '#D04848',
    steel: '#B6BBC4',
    fighting: '#607274',
    fairy: '#E6A4B4',
    default: '#C7C8CC',
};

// arrow function
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`;
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeImage.setAttribute('src', sprite);
    pokeId.textContent = `#${String(data.id).padStart(4, '0')}`;
    pokeId.style.color = '#9E9FA5';
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImage.style.backgroundSize = ' 10px 10px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'Pokemon could not be found';
    pokeImage.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/59.png');
    pokeImage.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

