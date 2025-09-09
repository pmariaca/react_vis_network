var nodes = [];
var edges = [];

for (var i = 0; i < 8; i++) {
  nodes.push({ id: i, label: String(i) });
}
edges.push({ from: 0, to: 1 });
edges.push({ from: 0, to: 2 });
edges.push({ from: 0, to: 3 });
edges.push({ from: 0, to: 4 });
edges.push({ from: 1, to: 5 });
edges.push({ from: 1, to: 6 });
edges.push({ from: 1, to: 7, label: "label7",  color: "rgb(243, 67, 14)", font: { background: "pink" } });

// ---------------------
nodes[0]["level"] = 0;
nodes[0]["font"] = { size: 25, color: "red", face: "courier", strokeWidth: 3, strokeColor: "#ffffff" };

nodes[1]["level"] = 1;
nodes[1]["font"] = { size: 12, color: "red", face: "sans", background: "white" }

nodes[2]["level"] = 1;
nodes[3]["level"] = 1;
nodes[4]["level"] = 1;
nodes[5]["level"] = 2;
nodes[6]["level"] = 2;
nodes[7]["level"] = 2;
// ---------------------
nodes[8] = { id: 8, label: "Node 5", level: 0, shape: "star", color: "#FB7E81" ,font: { background: "pink" } }

// console.log(' nodes ', nodes)
// // 0: Object { id: 0, label: "0", level: 0 }
// console.log(' edges ', edges)
// 0: Object { from: 0, to: 1, id: "ba19182c-1247-4c69-ab3f-05d98d04ec57" }

export default { theNodes: nodes, theEdges: edges }