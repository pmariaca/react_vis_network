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
  const [color, setColor] = useState('#2B7CE9') // color

  const [fontColor, setFontColor] = useState('#343434')
  const [fontSize, setFontSize] = useState(12)
  const [fontBackground, setFontBackground] = useState(undefined)

  const edgeCosas = { edgeArrow: edgeArrow, color: color, fontColor: fontColor, fontSize: fontSize, fontBackground: fontBackground }
  return (
    <div>
      <Stack direction="row-inverse">
        <VisEdgeView
          data={data_edges}
          networkviewRef={networkviewRef}
          edgeConfig={edgeConfig}
          edgeCosas={edgeCosas}
        />

        <SelectEdges
          theEdges={data_edges.theEdges}
          edgeArrow={edgeArrow}
          setEdgeArrow={setEdgeArrow}

          color={color}
          setColor={setColor}
          fontColor={fontColor}
          setFontColor={setFontColor}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontBackground={fontBackground}
          setFontBackground={setFontBackground}
        />
      </Stack>
    </div>
  )
}
function SelectEdges({ theEdges, edgeArrow, setEdgeArrow,
  color, setColor, fontColor, setFontColor, fontSize, setFontSize, fontBackground, setFontBackground
}) {

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
    <div className='the-vis-container-table-edit'>
      {/* {console.log(theEdges)} */}
      <table >
        <tbody>
          <tr>
            <td >
              {/* <Typography>edge</Typography> */}
              <Box >
                <FormControl sx={{ width: 80 }}
                //   fullWidth sx={{   width: 200,   height: 120,  }}
                >
                  <InputLabel id="select-edge-tipo">tipo</InputLabel>
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

                <Typography>color linea</Typography>
                <Colorful
                  color={color}
                  setColor={setColor} />
              </Box>

            </td>
            <td >
              <Typography>fontColor</Typography>
              <Colorful
                color={fontColor}
                setColor={setFontColor} />

              <Typography>fontBackground</Typography>
              <Colorful
                color={fontBackground}
                setColor={setFontBackground} />

              <Box sx={{ width: 300 }}>fontSize
                <Slider
                  aria-label="border-width"
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
    </div>
  )
}



function SelectEdges_x({ edgeArrow, setEdgeArrow }) {
  const [isCheck1, setIsCheck1] = useState(true)
  const [isCheck2, setIsCheck2] = useState(true)

  function handleCheck1(e) {
    // console.log('   --- eeee :  edgeArrow', edgeArrow)
    setIsCheck1(!isCheck1)
    const { value, checked } = e.target;
    const dataTemp = edgeArrow.map(item => {
      if (item.relation === value) {
        return { ...item, uno: checked };
      }
      return item
    });
    setEdgeArrow(dataTemp)
  }

  function handleCheck2(e) {
    // console.log('   --- eeee :  edgeArrow', edgeArrow)
    setIsCheck2(!isCheck2)
    const { value, checked } = e.target;
    const dataTemp = edgeArrow.map(item => {
      if (item.relation === value) {
        return { ...item, dos: checked };
      }
      return item
    });
    setEdgeArrow(dataTemp)
  }

  return (
    <div className='the-vis-container-table-edit'>
      <label >
        Filter edges
        <div>
          <label>
            <input type="checkbox" checked={isCheck1} value='uno' onChange={handleCheck1} />
            Is <span style={{ color: "green" }}>relacion UNO </span> of
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={isCheck2} value='dos' onChange={handleCheck2} />
            Is <span style={{ color: "red" }}>relacion DOS </span> of
          </label>
        </div>
      </label>
    </div>
  )
}


