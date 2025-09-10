import { useRef, useState, useEffect } from 'react'

import VisNetwork from './VisNetwork'
import VisNodeForm from './VisNodeForm'
import VisEdgeForm from './VisEdgeForm'
import Colorful from '../Colorful'
import './network_action.css'

import { Box, Stack, Checkbox, Typography, Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

// https://visjs.github.io/vis-network/examples/network/events/interactionEvents.html

function VisNetworkAction({ data = { theNodes: [], theEdges: [] } }) {
  const [nodeLabel, setNodeLabel] = useState('')
  const [edgeLabel, setEdgeLabel] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const [isEVisible, setIsEVisible] = useState(false);
  const [dataNode, setDataNode] = useState({});
  const [dataEdge, setDataEdge] = useState({});
  const [nodeId, setNodeId] = useState(0);
  const [nodeCheck, setNodeCheck] = useState(true);
  const [edgeCheck, setEdgeCheck] = useState(true);

  const [edgePhysics, setPhysics] = useState(false);
  const [edgeHierarchical, setHierarchical] = useState(false);

  const networkRef = useRef(null);
  const nodeConfig = useRef({})
  const edgeConfig = useRef({})

  function editNode(data, callback) {
    // console.log('  edit Note  data ', data)
    setNodeLabel(data.label)
    setDataNode({ data: data, callback: callback })
    setIsVisible(true)
  }

  function editEdge(data, callback) {
    // console.log('  editEdge  data ', data)
    setEdgeLabel(data?.label ? data.label : '')
    setDataEdge({ data: data, callback: callback })
    setIsEVisible(true)
  }

  return (
    <div>
      <EditNode
        nodeConfig={nodeConfig}
        dataNode={dataNode}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        nodeLabel={nodeLabel}
        setNodeLabel={setNodeLabel}
        nodeCheck={nodeCheck}
      />

      <EditEdge
        edgeConfig={edgeConfig}
        dataEdge={dataEdge}
        isEVisible={isEVisible}
        setIsEVisible={setIsEVisible}
        edgeLabel={edgeLabel}
        setEdgeLabel={setEdgeLabel}
        edgeCheck={edgeCheck}
      />

      <Stack direction="row-inverse">

        <VisNetwork
          modoEdicion={true}
          data={data}
          networkRef={networkRef}
          editNode={editNode}
          editEdge={editEdge}
          edgePhysics={edgePhysics}
          edgeHierarchical={edgeHierarchical}
        />

        <Stack direction="column">

          <Item elevation={8} style={{ margin: '5px' }}>
            <FormControlLabel
              control={<Checkbox {...label} value={edgeHierarchical} onClick={() => setHierarchical(!edgeHierarchical)} />}
              label={<Typography color="primary">setHierarchical</Typography>} />

            <FormControlLabel
              control={<Checkbox {...label} value={edgePhysics} onClick={() => setPhysics(!edgePhysics)} />}
              label={<Typography color="primary">setPhysics</Typography>} />
          </Item>

          <Item elevation={8} style={{ margin: '5px' }}>
            <FormControlLabel
              control={<Checkbox {...label} defaultChecked value={nodeCheck} onClick={() => setNodeCheck(!nodeCheck)} />}
              label={<Typography color="primary">Aplicar configuración de nodo</Typography>} />
            <VisNodeForm nodeConfig={nodeConfig} />
          </Item>

          <Item elevation={8} style={{ margin: '5px' }}>
            <FormControlLabel
              control={<Checkbox {...label} defaultChecked value={edgeCheck} onClick={() => setEdgeCheck(!edgeCheck)} />}
              label={<Typography color="primary">Aplicar configuración de segmento</Typography>} />
            <VisEdgeForm edgeConfig={edgeConfig} />
          </Item>
        </Stack>
      </Stack>

    </div>
  )
}

function EditNode({ nodeConfig, dataNode, isVisible, setIsVisible, nodeLabel, setNodeLabel, nodeCheck }) {

  function saveNodeData() {
    //console.log('dataNode', dataNode)

    if (nodeCheck) {
      dataNode.data.shape = nodeConfig.current.shape ? nodeConfig.current.shape : ''
      dataNode.data.borderWidth = nodeConfig.current.borderWidth ? nodeConfig.current.borderWidth : ''
      dataNode.data.color = nodeConfig.current.color ? nodeConfig.current.color : ''
      dataNode.data.font = nodeConfig.current.font ? nodeConfig.current.font : ''
    }

    dataNode.data.label = nodeLabel
    // console.log('----------  dataNode.callback .-.-. ', dataNode.callback)
    setIsVisible(false)
    dataNode.callback(dataNode.data);
  }
  return (
    <Item elevation={8} style={{ display: isVisible ? 'block' : 'none', borderStyle: 'none' }} id="node-popUp">
      <Typography >tu texto</Typography>
      <input value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)} />
      <Box>
        <Button size="small" variant="contained" onClick={saveNodeData} sx={{ padding: '2px 4px', fontSize: '0.7rem' }} >save</Button>
        <Button size="small" variant="outlined" onClick={() => setIsVisible(false)} sx={{ margin: '14px', padding: '2px 4px', fontSize: '0.7rem' }} >cancel</Button>
      </Box>
    </Item>
  )
}

function EditEdge({ edgeConfig, dataEdge, isEVisible, setIsEVisible, edgeLabel, setEdgeLabel, edgeCheck }) {

  function saveEdgeData() {

    if (edgeCheck) {
      // console.log('xxxxxx edgeConfig.current------ ', edgeConfig.current)
      // dataEdge.data.physics = edgeConfig.current.physics ? edgeConfig.current.physics : false
      dataEdge.data.arrows = edgeConfig.current.arrows ? edgeConfig.current.arrows : ''
      dataEdge.data.smooth = edgeConfig.current.smooth ? edgeConfig.current.smooth : ''
      dataEdge.data.width = edgeConfig.current.width ? edgeConfig.current.width : ''
      dataEdge.data.color = edgeConfig.current.color ? edgeConfig.current.color : ''
      dataEdge.data.font = edgeConfig.current.font ? edgeConfig.current.font : false
      dataEdge.data.dashes = edgeConfig.current.dashes // ? edgeConfig.current.dashes : '', no porque cuando false, tssss
    }
    // console.log('yyyyyyyy dataEdge.data------ ', dataEdge.data)
    if (typeof dataEdge.data.to === "object") dataEdge.data.to = dataEdge.data.to.id;
    if (typeof dataEdge.data.from === "object") dataEdge.data.from = dataEdge.data.from.id;
    dataEdge.data.label = edgeLabel
    setIsEVisible(false)
    dataEdge.callback(dataEdge.data);
  }
  function handleCancel() {
    dataEdge.callback(null);
    setIsEVisible(false)
  }

  // CAMBIARLO POR UN DIALOG O MODAL o tal vez no es necesario
  return (
    <Item elevation={8} style={{ display: isEVisible ? 'block' : 'none', borderStyle: 'none' }} id="edge-popUp">
      <Typography >tu texto - opcional</Typography>
      <input value={edgeLabel} onChange={(e) => setEdgeLabel(e.target.value)} />
      <Box>
        <Button size="small" variant="contained" onClick={saveEdgeData} sx={{ padding: '2px 4px', fontSize: '0.7rem' }} >save</Button>
        {/* <Button size="small" variant="outlined" onClick={() => setIsEVisible(false)} sx={{ margin: '14px', padding: '2px 4px', fontSize: '0.7rem' }} >cancel</Button> */}
        <Button size="small" variant="outlined" onClick={handleCancel} sx={{ margin: '14px', padding: '2px 4px', fontSize: '0.7rem' }} >cancel</Button>
      </Box>
    </Item>
  )
}



export default VisNetworkAction
