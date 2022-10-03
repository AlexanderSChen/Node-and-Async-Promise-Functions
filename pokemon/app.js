$(function() {
    let url = "https://pokeapi.co/api/v2";

    // 1. 
    async function allPokemon() {
        let pokemon = await $.getJSON(`${url}/pokemon/?limit=1000`);
        console.log(pokemon);
    }
    allPokemon();

    // 2.
    async function threeRandomPokemon() {
        let allData = await $.getJSON(`${url}/pokemon/?limit=1000`);
        let randomPokemonUrls = [];
        for(let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * allData.results.length);
            let url = allData.results.splice(randomIdx, 1)[0].url;
            randomPokemonUrls.push(url);
        }
        let pokemonData = await Promise.all(
            randomPokemonUrls.map(url => $.getJSON(url))
        );
        pokemonData.forEach(p => console.log(p));
    }
    threeRandomPokemon();

    // 3. 
    async function threeRandomPokemonDescriptions() {
        let allData = await $.getJSON(`${url}/pokemon/?limit=1000`);
        let randomPokemonUrls = [];
        for(let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * allData.results.length);
            let url = allData.results.splice(randomIdx, 1)[0].url;
            randomPokemonUrls.push(url);
        }
        let pokemonData = await Promise.all(
            randomPokemonUrls.map(url => $.getJSON(url))
        );
        let speciesData = await Promise.all(
            pokemonData.map(p => $.getJSON(p.species.url))
        );
        descriptions = speciesData.map(d => {
            let descriptionObj = d.flavor_text_entries.find(
                entry => entry.language.name === "en"
            );
            return descriptionObj ? descriptionObj.flavor_text : "No description available.";
        });
        descriptions.forEach((desc, i) => {
            console.log(`${pokemonData[i].name}: ${desc}`);
        });
    }
    threeRandomPokemonDescriptions();

    // 4.
    let $btn = $("button");
    let $pokeArea = $("#pokemon-area");

    $btn.on("click", async function() {
        $pokeArea.empty();
        let allData = await $.getJSON(`${url}/pokemon/?limit=1000`);
        let randomPokemonUrls = [];
        for(let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * allData.results.length);
            let url = allData.results.splice(randomIdx, 1)[0].url;
            randomPokemonUrls.push(url);
        }
        let pokemonData = await Promise.all(
            randomPokemonUrls.map(url => $.getJSON(url))
        );
        let speciesData = await Promise.all(
            pokemonData.map(p => $.getJSON(p.species.url))
        );
        speciesData.forEach((d, i) => {
            let descriptionObj = d.flavor_text_entries.find(function(entry) {
                return entry.language.name === "en";
            });
            let description = descriptionObj ? descriptionObj.flavor_text : "";
            let name = pokemonData[i].name;
            let imgSrc = pokemonData[i].sprites.front_default;
            $pokeArea.append(makePokeCard(name, imgSrc, description));
        });
    });

    function makePokeCard(name, imgSrc, description) {
        return `
        <div class="card">
            <h1>${name}</h1>
            <img src = ${imgSrc} />
            <p>${description}</p>
        </div>
        `;
    }
});