let GET_pokemon = "https://pokeapi.co/api/v2/pokemon/";
const pokemonSearch = document.querySelector("#pokemonSearch .results");
const select = document.querySelector("#pokemonNames");

(function save(){
  getData(1)
  .then(data=>{
    localStorage.setItem("data", JSON.stringify(data))
    searchPokemon(1);
    console.log(localStorage);
  })
})()

async function getData(pokemon){
  const response = await fetch(GET_pokemon + pokemon)
  const data = await response.json()
  return data
}
function allPokemons(){
  for (let i=0; i<=1025; i++){
    getData(i)
    .then(data => {
      let a = document.createElement("a")
      a.class="miniature"
      a.href="#"
      let image = document.createElement("img")
      image.src = data.sprites.front_default;
      let name = document.createElement("h3")
      name.innerText = data.name
      a.append(image,name)
      a.addEventListener("click", ()=>{searchPokemon(data.id)})
      document.querySelector("#allPokemons article").append(a)
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })
  }
}
function cardify(data, where){
  let secondaryType = "test"
  data.types[1]? secondaryType = " / " + data.types[1].type.name: secondaryType = "";
  let hiddenAbility = "test"
  data.abilities[1]? hiddenAbility = data.abilities[0].name: hiddenAbility = "non";
  where.innerHTML += 
  `
  <figure>
    <div class="images">
      <img src=${data.sprites.back_default} />
      <img src=${data.sprites.front_default} />
    </div>
    <figcaption>
      <h3>${data.id} : ${data.name}</h3>
      <aside class="types">
        <h4>Types</h4>
        <div>
          <p>${data.types[0].type.name}${secondaryType}</p>
        </div>
      </aside>
      <aside class="stats">
      <h4>Statistics</h4>
      ${displayStats(data)}
      
      </aside>
      <aside>
      <h4>Abilities</h4>
        ${displayAbilities(data)}
      </aside>
      <aside stats="cries">
        <h4>Cries</h4>
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
    let color;
    let statJauge = data.stats[i].base_stat/255*100;

    if (Number(statJauge)>40){
      color = "seagreen"
    } else  if (Number(statJauge)>30){
      color = "skyblue"
    } else  if (Number(statJauge)>20){
      color = "orange"
    } else  if (Number(statJauge)>10){
      color = "indianred"
    } else {
      color = "crimson"
    }
    
    statList.push(`<p>${data.stats[i].stat.name} : <span style="width : ${statJauge}%; background:${color}">${data.stats[i].base_stat}</span></p>`)
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