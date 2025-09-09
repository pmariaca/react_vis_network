import { useEffect, useMemo, useRef, useState } from "react";
// import { Network } from "vis-network/esnext"; // con este si
// import { DataSet } from 'vis-data/esnext';
import { DataView, DataSet, Network } from "vis-network/standalone";
import "vis-network/styles/vis-network.min.css"

export default function VisEdgeView({ networkviewRef, data, edgeConfig = {}, edgeCosas }) {
  const elementRef = useRef();
  const { theNodes, theEdges } = data
  const { edgeArrow } = edgeCosas

  const nodes = useMemo(() => {
    return new DataSet(theNodes);
  }, [theNodes]);
  const edges = useMemo(() => {
    return new DataSet(theEdges);
  }, [theEdges]);

  // ===================================
  // filtros
  function edgesFilterArrow(edge) {
    if (parseInt(edgeArrow) === edge.tipo) {
      // console.log('edgeeees.tipo ', edge.tipo, ' edgeArrow- tipooooo',parseInt(edgeArrow) , edge)
      return edge.tipo === parseInt(edgeArrow);
    }
    return false
  }

  // ===================================
  const nodesView = new DataView(nodes);

  const edgesView = new DataView(edges, {
    filter: (edge) => {

      const arrow = edgesFilterArrow(edge)
      // console.log(' - nodesView -- shape- ', shape)
      // const color = edgeFilterColor(node)
      return arrow
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
  let networkOptions = {
    physics: true,
    // configure: configureOpt ,
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
  }  //Object.keys(nodeCosas).length == 0 ? networkOptions_edge : {}
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
    if (Object.keys(edgeCosas).length > 0) {

      // console.log('nodeCosas 111 ------edgesView.get()------------- ', edgesView.get())
      // console.log('nodeCosassssssss------- ', edgeCosas)
      networkviewRef.current.redraw()
      const dataTemp = edgeTodoConfig(edgesView, edgeCosas)

      edgeConfig.current = { ...dataTemp[0] }
      delete edgeConfig.current.id

      networkviewRef.current.setData({ nodes: nodesView, edges: dataTemp })
      // networkviewRef.current.setData({ nodes: nodesView, edges: edgesView })
    }

  }, [edgeCosas]);

  const theClass = "the-vis-container-edit-edge"
  return (
    <>
      <div id="myEdgeView" >
        <div className={theClass}
          name='miNett'
          ref={elementRef} >
        </div>
      </div>
      {/* <VisNetworkView
        origin='node'
        networkviewRef={networkviewRef}
        networkItems={networkItems} /> */}
    </>
  )
}

function edgeTodoConfig(edgesView, edgeCosas) {
  // console.log('nodeCosas  -------------------- ', edgeCosas)
  // const { color, fontColor, fontSize, borderWidth, border } = edgeCosas
  const { edgeArrow, color, fontColor, fontSize, fontBackground } = edgeCosas

  const theN = edgesView.get(edgesView.getIds()[0])

  let dashes = false
  if (edgeArrow == 11 || edgeArrow == 22 || edgeArrow == 33) {
    dashes = true
  }

  return edgesView.map(item => {
    if (item.id === theN.id && item?.color == undefined) { // add
      // item.color = { color: color, border: border }
      item.color = { color: color, highlight: color }
      item.dashes = dashes
      item.font = { color: fontColor, size: parseInt(fontSize), background: fontBackground }
      return item
    }
    if (item.id === theN.id && item?.color != undefined) { // update
      return {
        ...item,
        color: { color: color, highlight: color },
        dashes: dashes,
        font: { color: fontColor, size: parseInt(fontSize), background: fontBackground }
      };
    }
  });
}