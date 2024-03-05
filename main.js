let GET_pokemon = "https://pokeapi.co/api/v2/pokemon/";
let body = document.querySelector("body")

async function getData(pokemon){
  const response = await fetch(GET_pokemon + pokemon)
  const data = await response.json()
  return data
}
getData(1)
.then(data => {
body.innerHTML += `
  <figure>
    <img src=${data.sprites.back_default} />
    <img src=${data.sprites.front_default} />
    <figcaption>
      <h3>${data.id} : ${data.name}</h3>
      <aside>
        <h4>Types</h4>
        <p>${data.types[0].type.name}</p>
        <img src="${data.types[0].type.url}" />
      </aside>
      <aside>
        ${displayStats(data)}
        <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p>
        ${displayAbilities(data)}
      </aside>
      <aside>
        <h4>Cris</h4>
        <audio src=${data.cries.latest} controls></audio>
        <hr>
        <audio src=${data.cries.legacy} controls></audio>
      </aside>
    </figcaption>
  </figure>`
})
.catch(error => {
  console.error("Error fetching data:", error);
})

  
function displayStats(data){
  let statList=[];
  for(let i=0; i<6;i++){
    statList.push(`<p>${data.stats[i].stat.name} ${data.stats[0].base_stat}</p>`)
  }
  return statList.join("");
}

function displayAbilities(data){
  if(data.abilities>2)
  return `<p>Talent caché : ${data.abilities[2].ability.name}</p>`
else {
    return `<p>Talent caché : ${data.abilities[1].ability.name}</p>`
  }
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