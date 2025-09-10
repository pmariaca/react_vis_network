import { useRef, useState, useEffect } from 'react'
import VisNodeView from './VisNodeView';
import data_nodes from './data/data_nodes'


import Colorful from '../Colorful'
import { Box, Slider, Stack, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

export default function VisNodeForm({ nodeConfig }) {
  const networkviewRef = useRef(null);
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
  return (
    <div>

      <Stack direction="row-inverse">
        <Box  >
          <VisNodeView
            data={data_nodes}
            networkviewRef={networkviewRef}
            nodeConfig={nodeConfig}
            nodeCosas={nodeCosas}
          />
        </Box>
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
        <Colorful
          color={fontColor}
          setColor={setFontColor} />

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
        <Colorful
          color={border}
          setColor={setBorder} />

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
        return <span style={{ fontSize: sizeMin }}>text</span>
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

