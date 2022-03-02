const getButton = document.getElementById("btn");
const pokemonContainer = document.querySelector("#pokemon-container");
const loaderContainer = document.querySelector(".loader");

let page = 0;

//Carrega link de todos os pokemon
const getPokemon = async() => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page}`);
    return response.json().then(e => e.results.map(e => e.url));

}

//Pega dados de cada um individualmente
const loadPokemon = async(url) => {
    const response = await fetch(url);
    return response.json();

}

//Adiciona lista de pokemons ao DOM
const addPokemonDOM = async () => {
    const pokemon = await getPokemon()

    const pokemonTamplate = await pokemon.map(
        async (e) => {
            let data = await loadPokemon(e)
            let types = data['types'].map(e => e.type['name']).join(', ')


            return `
            <div  class="card mb-2 shadow-sm p-4 rounded" style="max-width: 90% ">
                <div class="row g-0"><div class="col-md-4">
                    <img src="${data['sprites']['front_default']}" class="img-fluid rounded-start" alt="">
                </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p><b>ID: </b>${data['id']}</p>
                            <p class="card-title"><b>Nome: </b>${data['name']}</p>
                            <p><b>Peso: </b>${data['weight']} Kg</p>
                            <p><b>Tipo: </b>${types}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    )
    const promiseValues = await Promise.all(pokemonTamplate);

    pokemonContainer.innerHTML += promiseValues
}

addPokemonDOM()

const getNextContainer = () => {
    page += 10;
    addPokemonDOM()
}

const removeLoader = () => {
    setTimeout(()=>{
        loaderContainer.classList.remove('show')
        getNextContainer()
    }, 2000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader();
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;

    const isPageBottom = scrollTop + clientHeight >= scrollHeight - 10

    if(isPageBottom){
        //faltam 10 pixel para a pagina acabar
        showLoader()
    }
})
