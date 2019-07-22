 var pokemonRepository = (function() {
  var repository = [];

  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // adds item to the repository
 function add (pokemon) {
    repository.push(pokemon);
  }
    // allows to access the repository from outside
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

  //Creates new elements and adds to the DOM
  
  //loads details for each pokemon by clicking on the button
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      //displays details in a modal
      showModal(item);
    });
  }
   
  //loads detailed data for each pokemon using detailsUrl property
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        item.weight = details.weight;
      })
      .catch(function(e) {
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  // creating modal content
  function showModal(item) {
    var $modalContainer = document.querySelector('#modal-container');

    //clearing all existing modal content
    $modalContainer.innerHTML = '';

    //creating div element in DOM
    var modal = document.createElement('div');
    //adding class to div DOM element
    modal.classList.add('modal');

    //creating closing button in modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    // adding event listener to close modal when clicked on button
    closeButtonElement.addEventListener('click', hideModal);

    //creating element for name in modal content
    var nameElement = document.createElement('h1');
    nameElement.innerText = item.name;

    // creating img in modal content
    var imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', item.imageUrl);

    //creating element for height in modal content
    var heightElement = document.createElement('p');
    heightElement.innerText = 'height : ' + item.height;

    //creating element for weight in modal content
    var typesElement = document.createElement('p');
    typesElement.innerText = 'weight : ' + item.weight;

    //appending modal content to webpage
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    $modalContainer.appendChild(modal);

    //adds class to show the modal
    $modalContainer.classList.add('is-visible');
  }

  //hides modal when clicked on close button
  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible');
  }
  function showDialog(item) {
  showModal(title, text);

  // We want to add a confirm and cancel button to the modal
  var modal = $modalContainer.querySelector('.modal');

  var confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  var cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();
}
  //hides modal when clicked on ESC on keyboard
  window.addEventListener('keydown', e => {
    var $modalContainer = document.querySelector('#modal-container');
    if (
      e.key === 'Escape' &&
      $modalContainer.classList.contains('is-visible')
    ) {
      hideModal();
    }
  });

  //hides modal if clicked outside of it
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.addEventListener('click', e => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// Loading the data from API
pokemonRepository.loadList().then(function() {
  // accessing pokemon repository & running function over each object in repository
  pokemonRepository.getAll().forEach(function(Pokemon) {
    //executing addListItem function for each object in pokemon repository
    pokemonRepository.addListItem(Pokemon);
  });
});



