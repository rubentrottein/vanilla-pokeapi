document.querySelector("#search").addEventListener("input", ()=>{
    searchPokemon(document.querySelector("#search").value);
})

createSelect()
select.addEventListener("input", ()=>{
    searchPokemon(select.value)
})