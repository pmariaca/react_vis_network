import { useEffect, useMemo, useRef, useState } from "react";
// import { Network } from "vis-network/esnext"; // con este si
// import { DataSet } from 'vis-data/esnext';
import { DataView, DataSet, Network } from "vis-network/standalone";
import "vis-network/styles/vis-network.min.css"
// import { useVisNContext } from "../../contexts/VisNProvider";
// import './network.css'

//   
export default function VisNetworkView({ networkviewRef, data,
  nodeConfig = {}, nodeCosas = {},
  edgeConfig = {}, edgeCosas = {},
  edgeArrow
}) {
  const { nodeShape } = nodeCosas
  // console.log('nodeCosas  -------------------- ', nodeCosas)
  console.log('nodeCosas  --------------------data ', data)
  const { theNodes, theEdges } = data
  const elementRef = useRef();

  const nodes = useMemo(() => {
    return new DataSet(theNodes);
  }, [theNodes]);
  const edges = useMemo(() => {
    return new DataSet(theEdges);
  }, [theEdges]);
  // ======================

  function nodesFilterShape(node) {
    if (nodeShape === "") {
      return node.shape === "";
      return true; // true;   false
    }
    if (nodeShape == node.shape) {
      return node.shape === nodeShape;
    }
    return false
  }

  const nodesView = new DataView(nodes, {
    filter: (node) => {
      const shape = nodesFilterShape(node)
      // console.log(' - nodesView -- shape- ', shape)
      // const color = nodesFilterColor(node)
      return shape
    },
  });

  // ===================================
  const edgesView = new DataView(edges, {
    filter: (edge) => {
      return true
      // const foundObject = edgeArrow.find(it => it.relation === edge.relation);
      // if (foundObject?.uno) {
      //   return edge.relation
      // }
      // if (foundObject?.dos) {
      //   return edge.relation
      // }
    },
  });
  // ===================================
  const configureOpt = {
    enabled: true,
    filter: function (option, path) {
      if (path.indexOf("color") !== -1) {
        // Uncaught TypeError: ctx.circle is not a function
        return true;
      }
      if (path.indexOf("edges") !== -1) {
        // console.log(' option: ', option, ' path: ', path, 'path.indexOf("edges")',path.indexOf("edges"))
        return true;
      }
      if (path.indexOf("nodes") !== -1) {
        // console.log(' option: ', option, ' path: ', path)
        return false;
      }
      // console.log(' option: ', option, ' path: ', path)
      return false
    },
    // filter: 'nodes,edges',
    // container:  undefined,
    // container:  document.getElementById('miRef'),
    showButton: true
  }
  const networkItems = { nodes: nodesView, edges: edgesView }
  // const networkOptions_node = {}
  const networkOptions_edge = {
    physics: true,
    // configure: function (option, path) {
    //   if (path.indexOf("smooth") !== -1 || option === "smooth") {
    //     return true;
    //   }
    //   return false;
    // },
    edges: {
      smooth: {
        type: "continuous",
      },
    },
  }
  let networkOptions = Object.keys(nodeCosas).length == 0 ? networkOptions_edge : {}
  // networkOptions = { configure: configureOpt }
  useEffect(() => {
    if (elementRef.current && !networkviewRef.current) {
      networkviewRef.current = new Network(
        elementRef.current,
        networkItems,
        // {nodes: nodesView, edges: edgesView},
        networkOptions
      );
    }
    return () => {
      elementRef.current = null;
    };
  }, [networkItems, networkOptions]);
  //===========================================

  useEffect(() => {
    if(Object.keys(nodeCosas).length > 0){
    // console.log('useEffectffffffffff background ', background)
    networkviewRef.current.redraw()

    const dataTemp = nodeTodoConfig(nodesView, nodeCosas)
    nodeConfig.current = { ...dataTemp[0] }
    // console.log('nodeCosas  ------nodeConfig.current-------------- ', nodeConfig.current)
    delete nodeConfig.current.id

    networkviewRef.current.setData({ nodes: dataTemp, edges: edgesView })
    }

  }, [nodeCosas]);

  useEffect(() => {
    if(Object.keys(edgeCosas).length > 0){

    }
    // console.log('useEffectffffffffff background ', background)
    // networkviewRef.current.redraw()

    // const dataTemp = nodeTodoConfig(nodesView, nodeCosas)
    // nodeConfig.current = { ...dataTemp[0] }
    // // console.log('nodeCosas  ------nodeConfig.current-------------- ', nodeConfig.current)
    // delete nodeConfig.current.id

    // networkviewRef.current.setData({ nodes: dataTemp, edges: edgesView })
  }, [edgeCosas]);

  // useEffect(() => {
  //   edgesView.refresh();
  //   networkviewRef.current.setData({ nodes: nodesView, edges: edgesView })
  // }, [edgeArrow]);

  const theClass = Object.keys(nodeCosas).length == 0 ? "the-vis-container-edit-edge" : "the-vis-container-edit-node"
  return (
    <>

      <div id="myView" >
        <div className={theClass}
          name='miNet'
          ref={elementRef} >
        </div>
      </div>
    </>
  )
}


function nodeTodoConfig(nodesView, nodeCosas) {
  // console.log('nodeCosas  -------------------- ', nodeCosas)
  const { background, fontColor, fontSize, borderWidth, border } = nodeCosas
  const theN = nodesView.get(nodesView.getIds()[0])

  return nodesView.map(item => {
    if (item.id === theN.id && item?.color == undefined) { // add
      item.color = { background: background, border: border }
      item.borderWidth = borderWidth
      item.font = { color: fontColor, size: parseInt(fontSize) }
      return item
    }
    if (item.id === theN.id && item?.color != undefined) { // update
      return {
        ...item,
        color: { background: background, border: border },
        borderWidth: borderWidth,
        font: { color: fontColor, size: parseInt(fontSize) }
      };
    }
  });

}


