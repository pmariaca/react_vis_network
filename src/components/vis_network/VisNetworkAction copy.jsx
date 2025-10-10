import { useRef, useState, useEffect } from 'react'

import VisNetwork from './VisNetwork'
import VisNodeForm from './VisNodeForm'
import VisEdgeForm from './VisEdgeForm'
import VisNodeGralForm from './VisNodeGralForm'
import VisEdgeGralForm from './VisEdgeGralForm'
import './network_action.css'

import { Box, Stack, Checkbox, Typography, Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

import { GiTreeRoots, GiPlantRoots, GiThreeLeaves } from "react-icons/gi";

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
  const [nodeGralCheck, setNodeGralCheck] = useState('gral');
  const [edgeGralCheck, setEdgeGralCheck] = useState('gral');
  const [nodeGral, setNodeGral] = useState([]);
  const [edgeGral, setEdgeGral] = useState([]);

  const [nodeCheck, setNodeCheck] = useState(true);
  const [edgeCheck, setEdgeCheck] = useState(true);

  const [edgePhysics, setPhysics] = useState(false);
  const [edgeHierarchical, setHierarchical] = useState(false);
  const [shakeTowards, setShakeTowards] = useState('roots');
  const [edgeDirection, setEdgeDirection] = useState('UD');


  const [edgeArrowType, setEdgeArrowType] = useState('dynamic')

  const networkRef = useRef(null);
  const nodeConfig = useRef({})
  const edgeConfig = useRef({})
  const gralNodeEdgeRef = useRef({})

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

  const configEdgesGral = {
    edgePhysics: edgePhysics, edgeHierarchical: edgeHierarchical, edgeDirection: edgeDirection,
    shakeTowards: shakeTowards, edgeArrowType: edgeArrowType, gralNodeEdgeRef
  }

  gralNodeEdgeRef.current.node = {}
  gralNodeEdgeRef.current.edge = {}
  // if (edgeGralCheck == 'gral') {
  //   console.log('xxxxxxxxxxxxxxxxxxx EditGral edgeGral---- ', edgeGral)
  //   gralNodeEdgeRef.current.edge = { ...edgeGral }
  // }
  // if (nodeGralCheck == 'gral') {
  //   gralNodeEdgeRef.current.node = { ...nodeGral }
  //   // console.log('aaaaaaaaaaaaa EditGral gralNodeEdgeRef.current.node----- ', gralNodeEdgeRef.current.node)
  // }

  return (
    <div>
      <EditNode
        nodeConfig={nodeConfig}
        dataNode={dataNode}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        nodeLabel={nodeLabel}
        setNodeLabel={setNodeLabel}
        nodeGralCheck={nodeGralCheck}
      />

      <EditEdge
        edgeConfig={edgeConfig}
        dataEdge={dataEdge}
        isEVisible={isEVisible}
        setIsEVisible={setIsEVisible}
        edgeLabel={edgeLabel}
        setEdgeLabel={setEdgeLabel}
        edgeGralCheck={edgeGralCheck}
      />

      <Stack direction="row-inverse">

        <Stack direction="column">
          <Item elevation={8} style={{ margin: '5px' }}>
            <EditGral
              edgeHierarchical={edgeHierarchical}
              setHierarchical={setHierarchical}
              edgePhysics={edgePhysics}
              setPhysics={setPhysics}
              shakeTowards={shakeTowards}
              setShakeTowards={setShakeTowards}
              edgeArrowType={edgeArrowType}
              setEdgeArrowType={setEdgeArrowType}
              edgeDirection={edgeDirection}
              setEdgeDirection={setEdgeDirection}
            />
          </Item>

          <VisNetwork
            modoEdicion={true}
            data={data}
            networkRef={networkRef}
            editNode={editNode}
            editEdge={editEdge}
            configEdgesGral={configEdgesGral}
          />


        </Stack>

        <Stack direction="column">
          <Item>
            <FormLabel id="demo-radio-buttons-group-label">Nodes</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={nodeGralCheck}
              onChange={(e) => setNodeGralCheck(e.target.value)}
            >
              <FormControlLabel value="item" control={<Radio />} label={<Typography color="primary">Aplicar configuración de nodo</Typography>} />
              <FormControlLabel value="gral" control={<Radio />} label={<Typography color="primary">Aplicar configuración de nodo GENERAL</Typography>} />
            </RadioGroup>
          </Item>
          <Item>
            <FormLabel id="demo-radio-buttons-group-label">Edges</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={edgeGralCheck}
              onChange={(e) => setEdgeGralCheck(e.target.value)}
            >
              <FormControlLabel value="item" control={<Radio />} label={<Typography color="primary">Aplicar configuración de segmento</Typography>} />
              <FormControlLabel value="gral" control={<Radio />} label={<Typography color="primary">Aplicar configuración de segmento GENERAL</Typography>} />
            </RadioGroup>
          </Item>

          {/* ==================================== */}
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
          {/* ==================================== */}

          {/* <NodeEdgeForm
            nodeConfig={nodeConfig}
            edgeConfig={edgeConfig}
            edgeGralConfig={edgeGralConfig}
            setNodeGral={setNodeGral}
            setEdgeGral={setEdgeGral}
          /> */}

        </Stack>
      </Stack>
    </div>
  )
}

function NodeEdgeForm({ nodeConfig, edgeConfig, edgeGralConfig, setNodeGral, setEdgeGral }) {

  return (
    <>
      {/* defaultExpanded */}
      <Accordion defaultExpanded >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Configuración general de nodos</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <Item elevation={8} style={{ margin: '5px' }}>
            <VisNodeGralForm setNodeGral={setNodeGral} />
          </Item>

          <Item elevation={8} style={{ margin: '5px' }}>
            <VisEdgeGralForm setEdgeGral={setEdgeGral} />
          </Item>

        </AccordionDetails>
      </Accordion>

      <Accordion  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Configuración nodo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Item elevation={8} style={{ margin: '5px' }}>
            <VisNodeForm nodeConfig={nodeConfig} />
          </Item>

          <Item elevation={8} style={{ margin: '5px' }}>
            <VisEdgeForm edgeConfig={edgeConfig} type='item' />
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

function EditGral({ edgeHierarchical, setHierarchical, edgePhysics, setPhysics, shakeTowards, setShakeTowards,
  edgeArrowType, setEdgeArrowType, edgeDirection, setEdgeDirection
}) {

  return (
    <>
      <Stack direction="row" sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }} >
        <FormControlLabel
          control={<Checkbox {...label} value={edgeHierarchical} onClick={() => setHierarchical(!edgeHierarchical)} />}
          label={<Typography color="primary">Genealogía</Typography>} />

        {edgeHierarchical && (
          <>
            <SelectHierachicalOpt
              shakeTowards={shakeTowards}
              setShakeTowards={setShakeTowards}
            />
            <SelectEdgeDirection
              edgeDirection={edgeDirection}
              setEdgeDirection={setEdgeDirection}
            />
          </>
        )}

        <FormControlLabel
          control={<Checkbox {...label} value={edgePhysics} onClick={() => setPhysics(!edgePhysics)} />}
          label={<Typography color="primary">Viento&#9730;&#9928;</Typography>} />

        <SelectEdgesArrowType
          edgeArrowType={edgeArrowType}
          setEdgeArrowType={setEdgeArrowType}
        />
      </Stack>
    </>
  )
}
function EditNode({ nodeConfig, dataNode, isVisible, setIsVisible, nodeLabel, setNodeLabel, nodeGralCheck }) {

  function saveNodeData() {
    //console.log('dataNode', dataNode)
    if (nodeGralCheck == 'item') {
      let typeShape = dataNode.data.shape == ("circularImage") || dataNode.data.shape == ("image")
      // console.log('nodeConfig.current.shape  - ', nodeConfig.current.shape )
      dataNode.data.shape = (typeShape ? dataNode.data.shape : (nodeConfig.current.shape ? nodeConfig.current.shape : ''))
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
      <input value={nodeLabel ? nodeLabel : ''} onChange={(e) => setNodeLabel(e.target.value)} />
      <Box>
        <Button size="small" variant="contained" onClick={saveNodeData} sx={{ padding: '2px 4px', fontSize: '0.7rem' }} >save</Button>
        <Button size="small" variant="outlined" onClick={() => setIsVisible(false)} sx={{ margin: '14px', padding: '2px 4px', fontSize: '0.7rem' }} >cancel</Button>
      </Box>
    </Item>
  )
}
function EditEdge({ edgeConfig, dataEdge, isEVisible, setIsEVisible, edgeLabel, setEdgeLabel, edgeGralCheck }) {

  function saveEdgeData() {

    if (edgeGralCheck == 'item') {
      // console.log('xxxxxx edgeConfig.current------ ', edgeConfig.current)
      // dataEdge.data.physics = edgeConfig.current.physics ? edgeConfig.current.physics : false
      dataEdge.data.arrows = edgeConfig.current.arrows ? edgeConfig.current.arrows : ''
      // dataEdge.data.smooth = edgeConfig.current.smooth ? edgeConfig.current.smooth : ''
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
        <Button size="small" variant="outlined" onClick={handleCancel} sx={{ margin: '14px', padding: '2px 4px', fontSize: '0.7rem' }} >cancel</Button>
      </Box>
    </Item>
  )
}
function SelectEdgesArrowType({ edgeArrowType, setEdgeArrowType }) {
  const smooth = ['dynamic', 'continuous', 'discrete', 'diagonalCross', 'straightCross', 'curvedCW', 'curvedCCW', 'cubicBezier']
  // const smooth = ['dynamic',  'continuous', 'discrete', 'continuous', 'discrete' 'diagonalCross', 'straightCross', 'curvedCW', 'curvedCCW', 'cubicBezier']
  return (
    <Box >
      <FormControl sx={{ width: 120 }}
      //   fullWidth sx={{   width: 200,   height: 120,  }}
      >
        {/* &#11099; &#11118;   &#11150;  &#11153; */}
        <InputLabel id="select-edge-tipo-tipo"><span style={{ fontSize: '32px' }}>&#10547;</span></InputLabel>
        <Select
          // multiple native
          labelId="select-edge-tipo-tipo"
          value={edgeArrowType}
          label="edgeArrowType"
          size="4"
          onChange={e => setEdgeArrowType(e.target.value)}
        >
          {smooth.map((item, index) => {
            return <MenuItem key={index} value={item}> <Typography style={{ fontSize: '14px' }}>{item}</Typography> </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
function SelectHierachicalOpt({ shakeTowards, setShakeTowards }) {
  const shakeTowardsOpt = ['roots', 'leaves']
  //  GiTreeRoots, GiPlantRoots, GiThreeLeaves 
  function iconShake(leave) {
    const size = '20px'
    switch (leave) {
      case 'roots':
        return <span style={{ fontSize: size }}><Tooltip title="troncos"><GiTreeRoots /></Tooltip></span>
      case 'leaves':
        return <span style={{ fontSize: size }}><Tooltip title="hojas"><GiThreeLeaves /></Tooltip></span>
    }
  }
  return (
    <Box >
      <FormControl sx={{ width: 80 }}
      //   fullWidth sx={{   width: 200,   height: 120,  }}
      >
        {/* &#11099; &#11118;   &#11150;  &#11153; */}
        <InputLabel id="select-edge-tipo-hierarchical"><span style={{ fontSize: '26px' }}>&#10512;</span></InputLabel>
        <Select
          // multiple native
          labelId="select-edge-tipo-hierarchical"
          value={shakeTowards}
          label="shakeTowards"
          size="4"
          onChange={e => setShakeTowards(e.target.value)}
        >
          {shakeTowardsOpt.map((item, index) => {
            return <MenuItem key={index} value={item}> <Typography style={{ fontSize: '14px' }}>{iconShake(item)}</Typography> </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
function SelectEdgeDirection({ edgeDirection, setEdgeDirection }) {
  const direction = ['UD', 'DU', 'LR', 'RL']
  function iconDirection(direction) {
    const size = '20px'
    switch (direction) {
      case 'UD':
        return <span style={{ fontSize: size }}>&#9759;</span>
      case 'DU':
        return <span style={{ fontSize: size }}>&#9757;</span>
      case 'LR':
        return <span style={{ fontSize: size }}>&#9758;</span>
      case 'RL':
        return <span style={{ fontSize: size }}>&#9756;</span>
    }
  }
  return (
    <Box >
      <FormControl sx={{ width: 80 }}
      //   fullWidth sx={{   width: 200,   height: 120,  }}
      >
        {/* &#11099; &#11118;   &#11150;  &#11153; */}
        <InputLabel id="select-edge-tipo-direction"><span style={{ fontSize: '28px' }}> &#10226;</span></InputLabel>
        <Select
          // multiple native
          labelId="select-edge-tipo-direction"
          value={edgeDirection}
          label="edgeDirection"
          size="4"
          onChange={e => setEdgeDirection(e.target.value)}
        >
          {direction.map((item, index) => {
            return <MenuItem key={index} value={item}> <Typography style={{ fontSize: '14px' }}>{iconDirection(item)}</Typography> </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}


export default VisNetworkAction
