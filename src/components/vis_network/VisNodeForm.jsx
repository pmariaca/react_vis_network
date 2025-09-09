import { useRef, useState, useEffect } from 'react'
import VisNodeView from './VisNodeView';
import data_nodes from './data/data_nodes'


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

        <VisNodeView
          data={data_nodes}
          networkviewRef={networkviewRef}
          nodeConfig={nodeConfig}
          nodeCosas={nodeCosas}
        />

        <SelectShapes
          theNodes={data_nodes.theNodes}
          nodeShape={nodeShape}
          setNodeShape={setNodeShape}

          background={background}
          setBackground={setBackground}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
          border={border}
          setBorder={setBorder}
        />
      </Stack>
      <SelectFont
        fontColor={fontColor}
        setFontColor={setFontColor}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
    </div>
  )
}

function SelectFont({ fontColor, setFontColor, fontSize, setFontSize,
}) {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <Colorful
                color={fontColor}
                setColor={setFontColor} />
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="font-size"
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
              </Box>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

function SelectShapes({ theNodes, nodeShape, setNodeShape,
  background, setBackground,
  borderWidth, setBorderWidth, border, setBorder
}) {

  // function handleChange(e) {
  //   const dataTemp = nodeShape.map(item => {
  //     item.shape = e.target.value
  //     return item;
  //   });
  //   setNodeShape(dataTemp)
  // }

  return (
    <div className='the-vis-container-table-edit'>
      <table >
        <tbody>
          <tr>
            <td >
              <Box >
                <FormControl sx={{ width: 120 }}
                //   fullWidth sx={{   width: 200,   height: 120,  }}
                >
                  <InputLabel id="select-nodo-tipo">tipo</InputLabel>
                  <Select
                    labelId="select-nodo-tipo"
                    value={nodeShape}
                    label="nodeShape"
                    size="4"
                    onChange={e => setNodeShape(e.target.value)}
                  >
                    {theNodes.map((item, index) => {
                      return <MenuItem key={index} value={item.shape ? item.shape : ''}>{item.label}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Box>


              {/* <select size="4" className="vis-configuration vis-config-select"
                value={nodeShape}
                onChange={e => setNodeShape(e.target.value)}
              >
                {theNodes.map(item => {
                  return (<option key={item.id} value={item.shape ? item.shape : ''}> {item.label}</option>)
                })}
              </select> */}

            </td>
            <td >
              {/* <td style={{display:'grid' }}> */}
              <Typography>color nodo</Typography>
              <Colorful
                color={background}
                setColor={setBackground} />
            </td>
            <td >
              <Typography>color borde</Typography>
              <Colorful
                color={border}
                setColor={setBorder} />

              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="border-width"
                  valueLabelDisplay="auto"
                  min={0}
                  max={10}
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(e.target.value)}
                />
              </Box>

              {/* <input className="vis-configuration vis-config-range" type="range" min="0" max="10" step="1"
                value={borderWidth} onChange={(e) => setBorderWidth(e.target.value)} /> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

