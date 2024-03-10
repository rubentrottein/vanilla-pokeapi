let GET_pokemon = "https://pokeapi.co/api/v2/pokemon/";
const pokemonSearch = document.querySelector("#pokemonSearch .results");
const select = document.querySelector("#pokemonNames");

async function getData(pokemon){
  const response = await fetch(GET_pokemon + pokemon)
  const data = await response.json()
  return data
}
function allPokemons(){
  let allPokemon; 
  for (let i=0; i<=1025; i++){
    getData(i)
    .then(data => {
      allPokemon = data;
      localStorage("pokemons", stringify(allPokemon));
      GET_pokemon = json.parse(allPokemon);
      cardify(data, document.querySelector("#allPokemons article"))
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })
  }
}
function cardify(data, where){
  let secondaryType = "test"
  data.types[1]? secondaryType = data.types[1].type.name: secondaryType = "";
  let hiddenAbility = "test"
  data.abilities[1]? hiddenAbility = data.abilities[0].name: hiddenAbility = "non";
  where.innerHTML += 
  `
  <figure>
    <img src=${data.sprites.back_default} />
    <img src=${data.sprites.front_default} />
    <figcaption>
      <h3>${data.id} : ${data.name}</h3>
      <aside class="types">
        <h4>Types</h4>
        <div>
          <p>${data.types[0].type.name}</p>
          <p>${secondaryType}</p>
        </div>
      </aside>
      <aside class="stats">
        ${displayStats(data)}
        
        ${displayAbilities(data)}
      </aside>
      <aside stats="cries">
        <h4>Cris</h4>
        <div>
          <audio src=${data.cries.latest} controls></audio>
          <audio src=${data.cries.legacy} controls></audio>
        </div>
      </aside>
    </figcaption>
  </figure>
  `
}
function searchPokemon(pokemon){
  document.querySelector("#pokemonSearch .results").innerHTML = "";
  getData(pokemon)
  .then(data => {
    cardify(data, pokemonSearch)
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  })
}

function displayStats(data){
  let statList=[];
  for(let i=0; i<6;i++){
    statList.push(`<p>${data.stats[i].stat.name} ${data.stats[i].base_stat}</p>`)
  }
  return statList.join("");
}

function displayAbilities(data){
  let cardData=[];
  try{
    cardData.push(`<p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p>`)
  } catch(e){
    console.info(e);
  }
  data.abilities[2] ? cardData.push("<p>Hidden Ability : "+ data.abilities[2].ability.name + "</p>") : cardData.push("<p>No hidden ability</p>")
  return cardData.join("");
}


/**************** Shinies **************/
function getShiny(){
  getData("mewtwo")
  .then(data => {
      let images = 
      [
        `<img src=${data.sprites.front_shiny} />`,
        `<img src=${data.sprites.back_shiny} />`
      ]
      return images
  })
}

function createSelect(){
  for (let i=0; i<=1025; i++){
    getData(i)
    .then(data => {
      let option = document.createElement("option")
      option.innerHTML = data.name
      option.value = data.name
    select.append(option);
    })
  }
}