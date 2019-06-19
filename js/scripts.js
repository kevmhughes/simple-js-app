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

for (var i = 0; i < repository.length; i++) {
      document.write(repository[i].name + " (height: " + repository[i].height + " )" );
}
