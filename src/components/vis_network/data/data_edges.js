const theNodes = [
  { id: 1, label: "Nodo fijo", x: 0, y: 0, fixed: true },
  { id: 2, label: "Drag", x: 10, y: 130, physics: false },
  { id: 3, label: "Obstaculo", x: 60, y: 60, fixed: true, mass: 10 },
]
const theEdges = [
  { tipo: 1, from: 1, label: "linea", to: 2, dashes: false }, //  sin flecha
  { tipo: 2, from: 1, label: "linea", to: 2, dashes: false, arrows: { to: true } }, // una dirección
  { tipo: 3, from: 1, label: "linea", to: 2, dashes: false, arrows: { to: true, from: true } },// bi-direccional
  { tipo: 11, from: 1, label: "linea", to: 2, dashes: true },// (p) sin flechap
  { tipo: 22, from: 1, label: "linea", to: 2, dashes: true, arrows: { to: true } },// (p) una dirección
  { tipo: 33, from: 1, label: "linea", to: 2, dashes: true, arrows: { to: true, from: true } }// (p) bi-direccional
];

export default { theNodes: theNodes, theEdges: theEdges }

// const theNodes = [
//   { id: 1, label: "Fixed node", x: 0, y: 0, fixed: true },
//   { id: 2, label: "Drag me", x: 150, y: 130, physics: false },
//   { id: 3, label: "Obstacle", x: 80, y: -80, fixed: true, mass: 10 },
// ]
// const theEdges = [{ from: 1, to: 2, arrows: "to" }];
// https://visjs.github.io/vis-network/examples/network/edgeStyles/smooth.html
// configure: function (option, path) {
//   if (path.indexOf("smooth") !== -1 || option === "smooth") {
//     return true;
//   }
//   return false;
// },


// https://visjs.github.io/vis-network/examples/network/other/chosen.html