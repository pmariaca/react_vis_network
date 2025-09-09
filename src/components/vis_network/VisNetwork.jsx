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
  editNode = null, editEdge = null
}) {
const {setVisNRef, setVisNItem} = useVisNContext()

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
      // console.log(' -- addEdge --   data ', data)
      // editEdge(data, callback);
      callback(data);
    },
    editEdge: {
      editWithoutDrag: function (data, callback) {
        editEdge(data, callback);
        // callback(data);
      },
    },
  }
  // ===================================
  const networkOptions_edit = useMemo(() => {
    return {
      // layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
      locale: 'es',//document.getElementById("locale").value,
      // configure: false,
      // configure: configureOpt,
      // manipulation: true,
      manipulation: {
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
          // console.log(' -- addEdge --   data ', data)
          // editEdge(data, callback);
          callback(data);
        },
        editEdge: function (data, callback) {
          editEdge(data, callback);
          // callback(data);
        }
      },
      nodes: {
        font: { multi: true },
        // widthConstraint: 150, // { minimum: 120, maximum: 170, x:undefined, y:undefined }
      },
      edges: {
        smooth: {
          forceDirection: 'none'
        }
      },
      layout: {
        hierarchical: false,// true, // isCluster -> para borrar ?
        // hierarchical: { nodeSpacing: 10, parentCentralization: true }
      },
      physics: false,
      // clickToUse:true,
      // interaction: { navigationButtons: true, hover: true },
      // onInitial : function () {
      //   console.log('ajaaaaaaaaaaaaaaaaaaaaaaa ')
      // },
    }
  }, [])
  const networkOptions_noEdit = {
    locale: 'es',
    nodes: {
      font: { multi: true },
      // widthConstraint: 150, // { minimum: 120, maximum: 170, x:undefined, y:undefined }
    },
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
if(!modoEdicion){
  setVisNRef(networkRef)
  setVisNItem(networkItems)
}

      if (modoEdicion) {
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
    return () => {
      elementRef.current = null;
    };
  }, [networkItems, networkOptions]);
  //===========================================


  const theClass = modoEdicion ? "the-vis-container-edit" : "the-vis-container"
  return (
    <>
      <div   >
        <div className={theClass}
          name='miNet'
          ref={elementRef} >
        </div>
      </div>
    </>
  )
}


