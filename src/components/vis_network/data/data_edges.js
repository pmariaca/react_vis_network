const theNodes = [
  { id: 1, label: "Nodo fijo", x: -180, y: 10, fixed: true },
  { id: 2, label: "Drag", x: 10, y: 130, physics: false },
  // { id: 3, label: "Obstaculo", x: -80, y: 60, fixed: true, mass: 10 },
]

const theNodesdd = [
  { id: 1, label: "Nodo fijo", x: 0, y: 0, fixed: true },
  { id: 2, label: "Drag", x: 10, y: 130, physics: false },
  { id: 3, label: "Obstaculo", x: 60, y: 60, fixed: true, mass: 10 },
]
const theEdges = [
  { tipo: 1, from: 1, label: "linea", to: 2, dashes: false, smooth: false }, //  sin flecha
  { tipo: 2, from: 1, label: "linea", to: 2, dashes: false, arrows: { to: true }, smooth: false }, // una dirección
  { tipo: 3, from: 1, label: "linea", to: 2, dashes: false, arrows: { to: true, from: true }, smooth: false },// bi-direccional
  { tipo: 11, from: 1, label: "linea", to: 2, dashes: true, smooth: false },// (p) sin flechap
  { tipo: 22, from: 1, label: "linea", to: 2, dashes: true, arrows: { to: true }, smooth: false },// (p) una dirección
  { tipo: 33, from: 1, label: "linea", to: 2, dashes: true, arrows: { to: true, from: true }, smooth: false },// (p) bi-direccional
];

export default { theNodes: theNodes, theEdges: theEdges }

// https://stackoverflow.com/questions/50766239/avoiding-overlapping-edges-with-minimal-physics-in-vis-js