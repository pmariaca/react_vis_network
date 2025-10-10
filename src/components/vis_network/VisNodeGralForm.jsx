import { useState, useEffect } from 'react'
import data_nodes from './data/data_nodes'

import Colorful from '../Colorful'
import { Box, Slider, Stack, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function VisNodeGralForm({ setNodeGral }) {

  const [nodeShape, setNodeShape] = useState('ellipse');
  const [fontColor, setFontColor] = useState('#000000')
  const [fontSize, setFontSize] = useState(12)
  const [background, setBackground] = useState('#D2E5FF') // background
  const [borderWidth, setBorderWidth] = useState(1);
  const [border, setBorder] = useState('#2B7CE9');

  const nodeCosas = {
    nodeShape: nodeShape, background: background, fontColor: fontColor, borderWidth: borderWidth,
    border: border, fontSize: fontSize
  }

  useEffect(() => {
    const nodesView = [{}]
    // const dataTemp = nodeTodoGralConfig_x(nodesView, nodeCosas)
    const dataTemp = nodeTodoGralConfig(nodeCosas)
    // console.log('2222 dataTemp', dataTemp)
    setNodeGral(dataTemp)
  },
    // [nodeCosas]);
    [nodeShape, background, fontColor, borderWidth, border, fontSize]);

  return (
    <div>

      <Stack direction="row-inverse">
        <Box sx={{ margin: '15px' }}>
          <SelectShapes
            theNodes={data_nodes.theNodes}
            nodeShape={nodeShape}
            setNodeShape={setNodeShape}
          />
          <Box sx={{ marginTop: '15px' }}>
            <SelectBackground
              background={background}
              setBackground={setBackground}
            />
          </Box>
        </Box>

        <Stack direction="column" sx={{ margin: '15px' }}>

          <SelectBorder
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            border={border}
            setBorder={setBorder}
          />

          <SelectFont
            fontColor={fontColor}
            setFontColor={setFontColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </Stack>
      </Stack>

    </div>
  )
}

function SelectFont({ fontColor, setFontColor, fontSize, setFontSize,
}) {
  return (
    <>
      <Box sx={{ width: 200 }}>
        <Typography><span style={{ fontSize: '32px' }}>&#9997;</span></Typography>
        <Box sx={{ marginBottom: '5px' }} >
          <Colorful
            color={fontColor}
            setColor={setFontColor} />
        </Box>
        <Slider
          aria-label="font-size"
          valueLabelDisplay="auto"
          min={0}
          max={45}
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
      </Box>
    </>
  )
}
function SelectBackground({ background, setBackground }) {
  return (
    <>
      {/* color interno figura*/}
      <Typography><span style={{ fontSize: '22px' }}>&#9635;&#9673;</span></Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Colorful
          color={background}
          setColor={setBackground} />
      </Box>
    </>
  )
}
function SelectBorder({ borderWidth, setBorderWidth, border, setBorder }) {
  return (
    <>
      {/* color borde figura*/}
      <Box sx={{ width: 200 }}>
        <Typography><span style={{ fontSize: '22px' }}>&#128913;&#128902;</span></Typography>

        <Box sx={{ marginBottom: '5px' }} >
          <Colorful
            color={border}
            setColor={setBorder} />
        </Box>
        <Slider
          aria-label="border-width"
          valueLabelDisplay="auto"
          min={0}
          max={10}
          value={borderWidth}
          onChange={(e) => setBorderWidth(e.target.value)}
        />
      </Box>
    </>
  )
}
function SelectShapes({ theNodes, nodeShape, setNodeShape }) {

  function iconShape(shape) {
    const size = '20px'
    const sizeMin = '14px'
    const sizeMax = '27px'

    switch (shape) {
      case 'box':
        return <span style={{ fontSize: size }}>&#9645;</span>
      case 'circle':
        return <span style={{ fontSize: size }}>&#9711;</span>
      case 'ellipse':
        return <span style={{ fontSize: size }}>&#11053;</span>
      case 'text':
        return <span style={{ fontSize: sizeMin }}>texto</span>
      case 'star':
        return <span style={{ fontSize: size }}>&#9734;</span>
      case 'square':
        return <span style={{ fontSize: size }}>&#9634;</span>
      case 'dot':
        return <span style={{ fontSize: size }}>&#9702;</span>
      case 'hexagon':
        return <span style={{ fontSize: size }}>&#11041;</span>
      case 'diamond':
        return <span style={{ fontSize: sizeMax }}>&#9671;</span>
      case 'triangle':
        return <span style={{ fontSize: size }}>&#9651;</span>
      case 'triangleDown':
        return <span style={{ fontSize: size }}>&#9661;</span>
      case 'image':
        return <span style={{ fontSize: sizeMin }}>imagen</span>
      case 'circularImage':
        return <span style={{ fontSize: sizeMin }}>imagenCircular</span>
      case undefined:
        return <span style={{ fontSize: sizeMin }}>sin shape</span>
    }
  }
  return (
    <div >
      <Box >
        <FormControl sx={{ width: 80 }}  >
          <InputLabel id="select-nodo-tipo"><span style={{ fontSize: '22px' }}>&#128981;&#128983;</span></InputLabel>
          <Select
            labelId="select-nodo-tipo"
            value={nodeShape}
            label="nodeShape"
            size="4"
            onChange={e => setNodeShape(e.target.value)}
          >
            {theNodes.map((item, index) => {
              return <MenuItem key={index} value={item.shape ? item.shape : ''}>{iconShape(item.shape)}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

function nodeTodoGralConfig(nodeCosas) {
  console.log('nodeCosas  -------------------- ', nodeCosas)
  const { background, fontColor, fontSize, borderWidth, border, nodeShape } = nodeCosas

  const item = {}
  item.shape = nodeShape
  item.color = { background: background, border: border }
  item.borderWidth = borderWidth
  item.font = { color: fontColor, size: parseInt(fontSize) }
  return item

}

function nodeTodoGralConfig_x(nodesView, nodeCosas) {
  const { background, fontColor, fontSize, borderWidth, border, nodeShape } = nodeCosas

  return nodesView.map(item => {
    if (item?.color == undefined) { // add
      item.shape = nodeShape
      item.color = { background: background, border: border }
      item.borderWidth = borderWidth
      item.font = { color: fontColor, size: parseInt(fontSize) }
      return item
    }
    // if (item?.color != undefined) { // update
    //   return {
    //     ...item,
    //     shape: nodeShape,
    //     color: { background: background, border: border },
    //     borderWidth: borderWidth,
    //     font: { color: fontColor, size: parseInt(fontSize) }
    //   };
    // }
  });
}