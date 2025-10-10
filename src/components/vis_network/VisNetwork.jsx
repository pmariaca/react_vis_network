import { useEffect, useMemo, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";
import "vis-network/styles/vis-network.min.css"
import { useVisNContext } from "../../contexts/VisNProvider";
import './network.css'

// To use a color picker for vis-network, you would integrate an external JavaScript 
// color picker library (e.g., jscolor, pickr, spectrum). The color picker's 
// output (a hex color code) would then be used to update the color properties 
// of the selected node, edge, or network background using the methods described 
// above (e.g., updating the DataSet or setOptions).

//  --  EDITAR: 
// https://visjs.github.io/vis-network/examples/network/other/manipulationEditEdgeNoDrag.html
//  -- VISIBILIDAD:
// https://visjs.github.io/vis-network/examples/network/data/dynamicFiltering.html

// DOT edge styles
// https://visjs.github.io/vis-network/examples/network/data/dotLanguage/dotEdgeStyles.html
// { theNodes: [], theEdges: [] }
export default function VisNetwork({ modoEdicion = false, networkRef, data = { theNodes: [], theEdges: [] },
  editNode = null, editEdge = null, configEdgesGral = {}
}) {
  console.log('ITIT  VisNetwork          editNode    ', editNode)
  console.log('ITIT  VisNetwork          editEdge    ', editEdge)
  console.log('ITIT  VisNetwork          configEdgesGral    ', configEdgesGral)


  const { setVisNRef, setVisNItem } = useVisNContext()

  const { theNodes, theEdges } = data
  const elementRef = useRef();
  const miRef = useRef('miRef')

  // ===================================
  // const canvasRef = useRef(null);
  // let ctx
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     ctx = canvas.getContext('2d');
  //     if (ctx) {
  //       // Now you can use ctx to draw on the canvas
  //       ctx.fillStyle = 'blue';
  //       ctx.fillRect(10, 10, 100, 50);
  //     }
  //   }
  // }, []);
  // ===================================
  const nodes = useMemo(() => {
    return new DataSet(theNodes);
  }, [theNodes]);
  const edges = useMemo(() => {
    return new DataSet(theEdges);
  }, [theEdges]);
  const networkItems = {
    nodes: nodes, edges: edges
  }
  const configureOpt = {
    enabled: true,
    filter: function (option, path) {
      if (path.indexOf("color") !== -1) {
        // Uncaught TypeError: ctx.circle is not a function
        return true;
      }
      if (path.indexOf("edges") !== -1) {
        // console.log(' option: ', option, ' path: ', path, 'path.indexOf("edges")',path.indexOf("edges"))
        return false;
      }
      if (path.indexOf("nodes") !== -1) {
        // console.log(' option: ', option, ' path: ', path)
        return true;
      }
      // console.log(' option: ', option, ' path: ', path)
      return false
    },
    // filter: 'nodes,edges',
    // container:  undefined,
    // container:  document.getElementById('miRef'),
    showButton: true
  }
  const manipulationConf = {
    addNode: function (data, callback) {
      // filling in the popup DOM elements
      // nodeOperationRef.current.innerText = "Add Nodeeee"
      //console.log(' -- addNode --   data ', data)
      // data.shape = 'star'
      // data.widthConstraint= { minimum: 120, maximum: 170 }
      // data.widthConstraint = 150
      data.label = '😊'//"<b>This</b>😊 <i>hola</i>"
      // callback(data);
      editNode(data, callback);
    },
    editNode: function (data, callback) {
      // setVisNValuesForm(data)
      editNode(data, callback);
    },
    addEdge: function (data, callback) {
      if (data.from == data.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r != true) {
          callback(null);
          return;
        }
      }
      // console.log(' -- ++ -- addEdge --   data ', data)
      editEdge(data, callback);
      // callback(data);
    },
    // editEdge: {
    //   editWithoutDrag: function (data, callback) {
    //     editEdge(data, callback);
    //     // callback(data);
    //   },
    // },
    editEdge: function (data, callback) {
      editEdge(data, callback);
      // callback(data);
    }
  }
  // ===================================
  const networkOptions_edit = useMemo(() => {
    return {
      // layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
      locale: 'es',//document.getElementById("locale").value,
      // configure: false,
      // configure: configureOpt,
      // manipulation: true,
      manipulation: manipulationConf,
      nodes: {
        font: { multi: true },
        // widthConstraint: 150, // { minimum: 120, maximum: 170, x:undefined, y:undefined }
      },
      // edges: {
      //   smooth: {
      //     forceDirection: 'none'
      //     // forceDirection:
      //     //   directionInput.value == "UD" || directionInput.value == "DU"
      //     //     ? "vertical"
      //     //     : "horizontal",
      //   }
      // },
      layout: {
        // hierarchical: false,// true,false  // isCluster -> para borrar ?
        hierarchical: {
          enabled: false,
          // nodeSpacing: 10,
          // parentCentralization: true,
          sortMethod: 'directed',  // hubsize, directed
          shakeTowards: 'roots'  // roots, leaves
        }
      },
      physics: { enabled: false },// false,
      // clickToUse:true,
      interaction: { navigationButtons: true, hover: true },
      // onInitial : function () {
      //   console.log('ajaaaaaaaaaaaaaaaaaaaaaaa ')
      // },
      // afterDrawing: console.log('  -----------------------   afterDrawing')
    }
  }, [])
  const networkOptions_noEdit = {
    locale: 'es',
    nodes: {
      font: { multi: true },
      // widthConstraint: 150, // { minimum: 120, maximum: 170, x:undefined, y:undefined }
    },
    interaction: { hover: true },
  }
  function handleConfChange() {
    draw(new FormData(conf));
  }
  // ===================================
  let networkOptions = {}
  networkOptions = modoEdicion ? networkOptions_edit : networkOptions_noEdit
  useEffect(() => {
    if (elementRef.current && !networkRef.current) {
      networkRef.current = new Network(
        elementRef.current,
        networkItems,
        networkOptions
      );
      // console.log('-.--.-.', networkRef.current.options)
      if (!modoEdicion) {
        setVisNRef(networkRef)
        setVisNItem(networkItems)
      }

      if (modoEdicion) {

        // networkRef.current.cluster({
        //   joinCondition(nodeOptions) {
        //     return !!formData.get(`cluster-node-${nodeOptions.id}`);
        //   },
        // });

        // networkRef.current.on("afterDrawing", function (params) {
        //   console.log(' on afterDrawing ', params)
        // });

        networkRef.current.on("configChange", function (updatedOptions) {
          console.log("Network configuration changed:", updatedOptions);
          // Example: Save the updated options to local storage
          // localStorage.setItem("visNetworkOptions", JSON.stringify(updatedOptions));
        });


        // networkRef.current.on("doubleClick", function (params) {
        //   params.event = "[original event]";
        //   // console.log(' on doubleClick ', params)
        //   const idNode = networkRef.current.getSelectedNodes()[0]

        //   if (idNode == undefined) {
        //     // la seleccion es un edge
        //     const theItem = networkItems.edges.get(networkRef.current.getSelectedEdges()[0])
        //     if (!Array.isArray(theItem)) {
        //       // ok
        //       console.log(' on  theItem ', theItem, 'label', theItem.label)
        //       const va = theItem.label ? theItem.label : ''
        //       setEdgeLabel(va)
        //     }
        //   }
        // });

        // networkRef.current.on("oncontext", function (params) {
        //   params.event = "[original event]";
        //   console.log(' on oncontext ', params)
        //   console.log(' on  params.event ', params.event)
        // });

        // networkRef.current.on("selectNode", function (params) {
        //   console.log(' on selectNodeeee ', params)
        // });
        // networkRef.current.on("selectEdge", function (params) {
        //   console.log(' on selectEeeeedge ', params)
        // });

      }
    }

    // ---------------------------------
    if (networkRef.current && modoEdicion == true) {

      const { edgeHierarchical, edgeDirection, shakeTowards, edgePhysics, edgeArrowType, gralNodeEdgeRef } = configEdgesGral
      // console.log(' edgePhysics  ', edgePhysics   layout:{hierarchical: true}    )
      let confGralEdges = {}// { smooth: { enabled: false } }
      let gralNodeEdge = gralNodeEdgeRef.current
      gralNodeEdge.edge.smooth = { enabled: true, type: edgeArrowType }

      networkRef.current.setOptions({
        physics: { enabled: edgePhysics },
        // layout: { hierarchical: { enabled: edgeHierarchical, shakeTowards: shakeTowards } },
        // https://visjs.github.io/vis-network/examples/network/layout/hierarchicalLayoutUserdefined.html
        layout: { hierarchical: { enabled: edgeHierarchical, shakeTowards: shakeTowards, direction: edgeDirection } },  //  // UD, DU, LR, RL
        // UD, DU, LR, RL
        edges: gralNodeEdge.edge, //confGralEdges
        nodes: gralNodeEdge.node,
      })


      networkRef.current.redraw()
      // networkRef.current.setOptions({
      //   interaction: {
      //     // editNode: true,
      //     // addEdge: true
      //     // editEdge:true
      //   }
      // });
    }
    // ---------------------------------
    return () => {
      elementRef.current = null;
    };
  }, [networkItems, networkOptions]);
  //===========================================

  function printNetwork() {

    // NO ACTUALIZA NUEVO NODO
    const nodess = networkItems.nodes.get();
    // const edgess = networkItems.edges.get();
    console.log(' networkItems nodes: ', nodess)
    // console.log('networkItems edges:', edgess)
    // ---------------
    // SI ACTUALIZA NUEVO NODO y las posiciones x,y son
    var nodes = objectToArray(networkRef.current.getPositions());
    // visNRef, visNItemRef,
    nodes.forEach(addConnections);
    var exportValue = JSON.stringify(nodes, undefined, 2);

    console.log(' networkItems objectToArray: ', nodes)
    // console.log(' networkItems exportValue: ', exportValue)

    "25001e8b-7eeb-4293-9d63-9188b9bf4647"
    let theItem = networkItems.nodes.get("25001e8b-7eeb-4293-9d63-9188b9bf4647")
    console.log(' theItem ', theItem)
    // -----------------
    // AQUI SI ESTAN TAMBIEN LOS NUEVOS
    var visibleNodes = [];
    for (var nodeId in networkRef.current.body.nodes) {
      // Check if the node is not part of a cluster
      if (!networkRef.current.clustering.clusteredNodes[nodeId]) {
        visibleNodes.push(networkRef.current.body.nodes[nodeId].options); // Or just nodeId
      }
    }
    console.log(visibleNodes);

  }

  function objectToArray(obj) {
    // console.log( ' - obj',obj )
    return Object.keys(obj).map(function (key) {
      obj[key].id = key;
      return obj[key];
    });
  }
  function addConnections(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = networkRef.current.getConnectedNodes(index);
  }
  // =====================================
  const theClass = modoEdicion ? "the-vis-container-edit" : "the-vis-container"
  return (
    <>
      <div   >
        <div className={theClass}
          name='miNet'
          ref={elementRef} >
        </div>
      </div>
      <button onClick={printNetwork} >printNetwork</button>
    </>
  )
}


