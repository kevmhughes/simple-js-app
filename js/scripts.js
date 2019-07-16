var pokemonRepository = (function (){

  //repository of pokemons
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //adds a new pokemon
  function add (pokemon) {
    repository.push(pokemon);
  }
  //returns the complete repository
  function getAll() {
    return repository;
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
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
 function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {
    console.log(pokemon);   });
}


