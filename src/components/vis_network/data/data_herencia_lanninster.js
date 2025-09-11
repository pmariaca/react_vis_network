var nodes = [];
var edges = [];

// ---------------------
nodes = [
  { id: 'm', shape: "image", image: './img/mini/house_lannister.png' },
  { id: 0, shape: "circularImage", image: './img/mini/Lannister_Lord_Tywin.png' },
  { id: 1, shape: "circularImage", image: './img/mini/Lannister_Cersei.png' },
  { id: 4, shape: "circularImage", image: './img/mini/Lannister_Tyrion.png' },
  { id: 5, shape: "circularImage", image: './img/mini/Lannister_Jaime.png' },
  { id: 2, shape: "image", image: './img/mini/Lannister_Joffrey.png' },
  { id: 3, shape: "circularImage", image: './img/mini/Lannister_Tommen.png' },
]

edges = [
  { from: 0, to: 1,arrows:'to'  },
  // { from: 0, to: 1, arrows: { to: { enabled: true, type: 'box', scaleFactor: 2 } } },
  { from: 0, to: 4 },
  { from: 0, to: 5 },

  { from: 1, to: 2 },
  { from: 1, to: 3 },
]

// ---------------------
// { id: 'm', shape: "image", image: './img/mini/house_lannister.png', level: 0 },
// { id: 0, shape: "circularImage", image: './img/mini/Lannister_Lord_Tywin.png', level: 0 },
// { id: 1, shape: "circularImage", image: './img/mini/Lannister_Cersei.png', level: 1 },
// { id: 4, shape: "circularImage", image: './img/mini/Lannister_Tyrion.png', level: 1 },
// { id: 5, shape: "circularImage", image: './img/mini/Lannister_Jaime.png', level: 1 },
// { id: 2, shape: "circularImage", image: './img/mini/Lannister_Joffrey.png', level: 2 },
// { id: 3, shape: "circularImage", image: './img/mini/Lannister_Tommen.png', level: 2 },

// const nodes = [
//   { id: 1, label: "Node 1" },
//   { id: 2, label: "Node 2" },
//   { id: 3, label: "Node 3" },
//   { id: 4, label: "Node 4" },
//   { id: 5, label: "Node 5" },
// ]

// const edges = [
//   { from: 1, to: 3 },
//   // { from: 1, to: 2 },
//   // { from: 2, to: 4 },
//   // { from: 2, to: 5 },
//   // { from: 3, to: 3 },
// ]


// console.log(' nodes ', nodes)
// // 0: Object { id: 0, label: "0",   }
// console.log(' edges ', edges)
// // 0: Object { from: 0, to: 1, id: "ba19182c-1247-4c69-ab3f-05d98d04ec57" }

export default { theNodes: nodes, theEdges: edges }