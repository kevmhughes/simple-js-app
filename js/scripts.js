var pokemonRepository = (function (){
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
];

  function add (pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
 };
})();


pokemonRepository.getAll().forEach(function(currentItem) {
    if(currentItem.height > 0.6){
    document.write("<p>" + currentItem.name + " (height: " + currentItem.height + ") - WOW, that´s big!</p>")
  }else{
    document.write("<p>" +  currentItem.name + " (height: " + currentItem.height + ")</p>")
  }
});