var pokemonRepository = (function (){

  //repository of pokemons
  var repository = [
  {
  name: "Bulbasur",
  height: 0.7,
  types: ["grass", "jmonster"]},
  {
  name: "Charmander",
  height: 0.6,
  types: ["monster", "dragon"]},
  {
  name: "Squirtle",
  height: 0.5,
  types: ["monster", "water 1"]},
    {
  name: "Venusaur",
  height: 0.7,
  types: ["grass", "jmonster"]},
  {
  name: "Charmeleon",
  height: 0.6,
  types: ["monster", "dragon"]},
    {
  name: "Venu",
  height: 0.7,
  types: ["grass", "jmonster"]},
  {
  name: "Leon",
  height: 0.6,
  types: ["monster", "dragon"]},
];

  //adds a new pokemon
  function add (pokemon) {
    repository.push(pokemon);
  }
  //returns the complete repository
  function getAll() {
    return repository;
  }
  function showDetails(pokemon){
    console.log(pokemon.name)
  }
  function addListItem (pokemon) {

    var $pokemonList = document.querySelector("ul");
    var listItem = document.createElement("li");
    listItem.classList.add("pokemon-list_item");
    
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add('buttonStyle');
    
    
    $pokemonList.appendChild(listItem);
    listItem.appendChild(button);
    button.addEventListener("click", function(event){
      showDetails(pokemon);
    });
  }
  
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();


pokemonRepository.getAll().forEach(function(pokemon) {
pokemonRepository.addListItem(pokemon);
});




