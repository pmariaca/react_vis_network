import { useRef, useState, useEffect } from 'react'

import VisEdgeView from './VisEdgeView'
import data_edges from './data/data_edges'

import Colorful from '../Colorful'
import { Box, Slider, Stack, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function VisEdgeForm({ edgeConfig }) {
  const networkviewRef = useRef(null);

  const [edgeArrow, setEdgeArrow] = useState(1)
  const [edgeArrowType, setEdgeArrowType] = useState(false)
  const [edgeWidth, setEdgeWidth] = useState(1)

  const [color, setColor] = useState('#2B7CE9') // color

  const [fontColor, setFontColor] = useState('#343434')
  const [fontSize, setFontSize] = useState(12)
  const [fontBackground, setFontBackground] = useState(undefined)

  const edgeCosas = {
    edgeArrow: edgeArrow, color: color, edgeWidth, edgeArrowType: edgeArrowType,
    fontColor: fontColor, fontSize: fontSize, fontBackground: fontBackground
  }
  return (
    <div>
      <Stack direction="row-inverse">
        <VisEdgeView
          data={data_edges}
          networkviewRef={networkviewRef}
          edgeConfig={edgeConfig}
          edgeCosas={edgeCosas}
        />
        <Stack direction="column"  >
          <SelectEdgeWidthColor
            color={color}
            setColor={setColor}
            edgeWidth={edgeWidth}
            setEdgeWidth={setEdgeWidth}
          />
          <SelectFont
            fontColor={fontColor}
            setFontColor={setFontColor}
            fontBackground={fontBackground}
            setFontBackground={setFontBackground}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </Stack>
      </Stack>

      <Stack direction="row" style={{ justifyContent: "space-around", alignItems: "flex-end", }} >
        <SelectEdgesArrow
          theEdges={data_edges.theEdges}
          edgeArrow={edgeArrow}
          setEdgeArrow={setEdgeArrow}
        />

        <SelectEdgesArrowType
          edgeArrowType={edgeArrowType}
          setEdgeArrowType={setEdgeArrowType}
        />
        <div></div><div></div><div></div>
      </Stack>
    </div>
  )
}
function SelectFont({ fontColor, setFontColor, fontBackground, setFontBackground, fontSize, setFontSize }) {
  return (
    <>
      <Box sx={{ width: 200 }}>
        <Typography><span style={{ fontSize: '32px' }}>&#9997;</span></Typography>
        <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-between' }} >
          <Colorful
            color={fontColor}
            setColor={setFontColor} />

          <Colorful
            color={fontBackground}
            setColor={setFontBackground} />
        </Stack >

        <Slider
          aria-label="border-width"
          valueLabelDisplay="auto"
          min={0}
          max={45}
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
      </Box >
    </>
  )
}

function SelectEdgeWidthColor({ color, setColor, edgeWidth, setEdgeWidth }) {
  return (
    <>
      <Box sx={{ width: 200 }}>
        <Typography><span style={{ fontSize: '32px' }}>&#8692;&#129042;&#129050;</span></Typography>
        <Colorful
          color={color}
          setColor={setColor} />

        <Slider
          aria-label="edge-width"
          valueLabelDisplay="auto"
          min={0}
          max={30}
          value={edgeWidth}
          onChange={(e) => setEdgeWidth(e.target.value)}
        />
      </Box>
    </>
  )
}

function SelectEdgesArrowType({ edgeArrowType, setEdgeArrowType }) {
  const smooth = ['dynamic', 'diagonalCross', 'straightCross', 'curvedCW', 'curvedCCW', 'cubicBezier']
  // const smooth = ['dynamic', 'diagonalCross', 'straightCross', 'curvedCW', 'curvedCCW', 'cubicBezier']
  return (
    <Box >
      <FormControl sx={{ width: 80 }}
      //   fullWidth sx={{   width: 200,   height: 120,  }}
      >
        {/* &#11099; &#11118;   &#11150;  &#11153; */}
        <InputLabel id="select-edge-tipo-tipo"><span style={{ fontSize: '26px' }}> &#11150; </span></InputLabel>
        <Select
          // multiple native
          labelId="select-edge-tipo-tipo"
          value={edgeArrowType}
          label="edgeArrowType"
          size="4"
          onChange={e => setEdgeArrowType(e.target.value)}
        >
          <MenuItem value={false} ><Typography style={{ fontSize: '12px' }}>ninguno</Typography></MenuItem>
          {smooth.map((item, index) => {
            return <MenuItem key={index} value={item}> <Typography style={{ fontSize: '12px' }}>{item}</Typography> </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
function SelectEdgesArrow({ theEdges, edgeArrow, setEdgeArrow }) {

  function iconArrow(tipo) {
    // https://www.w3schools.com/charsets/ref_utf_arrows.asp
    const size = '20px'
    const sizeMin = '18px'
    let va = "<---->"
    switch (tipo) {
      case 1:
        return <span style={{ fontSize: sizeMin }}>&#9472;&#9472;</span>
      case 2:
        return <span style={{ fontSize: size }}>&#8594;</span>
      case 3:
        return <span style={{ fontSize: size }}>&#129112;</span>
      case 11:
        return <span style={{ fontSize: sizeMin }}>&#8943;&#8943;</span>
      case 22:
        return <span style={{ fontSize: size }}>&#10513;</span>
      case 33:
        return <span style={{ fontSize: sizeMin }}>{va}</span>
    }
  }
  return (
    <Box >
      <FormControl sx={{ width: 80 }}
      //   fullWidth sx={{   width: 200,   height: 120,  }}
      >
        <InputLabel id="select-edge-tipo"><span style={{ fontSize: '22px' }}>&#11085;</span></InputLabel>
        <Select
          // multiple native
          labelId="select-edge-tipo"
          value={edgeArrow}
          label="edgeArrow"
          size="4"
          onChange={e => setEdgeArrow(e.target.value)}
        >
          {theEdges.map((item, index) => {
            return <MenuItem key={index} value={item.tipo}>{iconArrow(item.tipo)}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
