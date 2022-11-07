const $pokeInput = document.querySelector('#pokemon');
const $buscar = document.querySelector('#buscar');
const $imgPoke = document.querySelector('#imgPoke');
const $namePoke = document.querySelector('#nombrePoke');
const $infoPoke = document.querySelector("#infoPoke");

$buscar.addEventListener('click', async (event) => {
    event.preventDefault();

    if(!($pokeInput.value)){
        return alert('Llena los campos')
    }

    $buscar.setAttribute('disable', '');
    $buscar.setAttribute('aria-busy', 'true')

    let pokemon = $pokeInput.value;
    pokemon = pokemon.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let data = await fetch(url)
        .then((res) => {
            if(res.status != '200'){
                alert('No existe ese pokemon');
                $buscar.removeAttribute('disable');
                $buscar.removeAttribute('aria-busy');
            }
            else{
                return res.json();
            }

        });

    if(data){
        pintarPokemon(data);
    }    

});

const pintarPokemon = (datosPokemon) => {
    console.log(datosPokemon);

    let pokeImagen = datosPokemon.sprites.front_default;
    $imgPoke.src = pokeImagen;

    let pokeName = datosPokemon.name;
    $namePoke.innerHTML = pokeName;

    let tiposPoke = datosPokemon.types.map((item) => item.type.name);
    $infoPoke.innerHTML = tiposPoke;

    $buscar.removeAttribute('disable');
    $buscar.removeAttribute('aria-busy');
    
}
