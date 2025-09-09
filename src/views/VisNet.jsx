import { useRef } from 'react'
import VisNetwork from '../components/vis_network/VisNetwork'
import { useVisNContext } from '../contexts/VisNProvider'

import data_mini from '../components/vis_network/data/data_mini'

function VisNet() {
  const { visNRef, visNItem } = useVisNContext()
  const networkRef = useRef(null);
  const network2Ref = useRef(null);

  let datan = data_mini // data_herencia_sinLevel // data_herencia //data_mini

  function handleNodeEdit() {
    let getSelN = visNRef.current.getSelectedNodes()
    const idNode = getSelN[0]
    // console.log('VisNet::::: getSelN: ', getSelN, 'idNode', idNode)
    const theItem = visNItem.nodes.get(idNode)
    theItem.label = "oks"
    theItem.shape = "star"
    visNItem.nodes.updateOnly(theItem)
  }

  function handleNodeAdd() {
    // const theItem = {id:44, label:"nuevoooo"}
    const theItem = { label: "nuevoooo", shape: "star", color: "green", font: { background: "green" } }
    visNItem.nodes.add(theItem)
  }

  function handleEdgeEdit() {
    let getSelE = visNRef.current.getSelectedEdges()
    // console.log('VisNet::::: getSelE: ', getSelE[0])
    const theItem = visNItem.edges.get(getSelE[0])
    theItem.color = "rgb(243, 67, 14)"
    theItem.label = "vacaciones"
    visNItem.edges.updateOnly(theItem)
  }
  function handleInfoClick() {
    // console.log('VisNet::::: visNValuesForm label: ', visNValuesForm)
    // let getSel = visNRef.current.getSelection()
    // console.log('VisNet::::: getSel: ', getSel)
    let getSelN = visNRef.current.getSelectedNodes()
    const idNode = getSelN[0]
    // console.log('VisNet::::: getSelN: ', getSelN, 'idNode', idNode)
    // const theItem = visNItem.nodes.get(idNode)
    // console.log('VisNet::::: visNItem.nodes.get(idNode): ', visNItem.nodes.get(idNode))
    console.log('VisNet::::: visNItem.nodes.get(): ', visNItem.nodes.get())
    console.log('VisNet::::: visNItem.edges.get(): ', visNItem.edges.get())

    // console.log('VisNet::::: visNItem.nodes : ', visNItem.nodes )
    // let getSelE = visNRef.current.getSelectedEdges()
    // console.log('VisNet::::: getSelE: ', getSelE)
  }

  function handleGetSelect() {
    let getSel = visNRef.current.getSelection()
    console.log('VisNet::::: getSel: ', getSel)
    let getSelN = visNRef.current.getSelectedNodes()
    console.log('VisNet::::: getSelN: ', getSelN)
    let getSelE = visNRef.current.getSelectedEdges()
    console.log('VisNet::::: getSelE: ', getSelE)
  }

  function exportNetwork() {
    var nodes = objectToArray(visNRef.current.getPositions());
    // visNRef, visNItemRef,
    nodes.forEach(addConnections);
    // pretty print node data
    var exportValue = JSON.stringify(nodes, undefined, 2);
    console.log('exportValue', exportValue)
  }
  function objectToArray(obj) {
    return Object.keys(obj).map(function (key) {
      obj[key].id = key;
      return obj[key];
    });
  }
  function addConnections(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = visNRef.current.getConnectedNodes(index);
  }
  return (
    <div>VisNet<br />
      <button onClick={handleGetSelect} >handleGetSelect</button>
      <button onClick={handleNodeEdit} >edita label</button>
      <button onClick={handleNodeAdd} >add label</button>
      <button onClick={handleEdgeEdit} >handleEdgeEdit</button>
      <button onClick={handleInfoClick} >info</button>
      <button onClick={exportNetwork} >exportNetwork</button>

      <VisNetwork
        data={datan}
        networkRef={networkRef} />
    </div>
  )
}

export default VisNet
