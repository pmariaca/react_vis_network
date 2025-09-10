import VisNet from './views/VisNet';
import { VisNProvider } from './contexts/VisNProvider';
import VisEdita from './views/VisEdita';
import { Box, Stack } from '@mui/material';

function App() {

  return (
    <>
      <ul>
        <li><a href="https://visjs.github.io/vis-network/examples/" target="_blank">vis-network/examples</a></li>
        <li><a href="https://visjs.github.io/vis-network/docs/network/" target="_blank">vis-network/docs</a></li>
      </ul>

      <Stack direction="column" >
        <Box sx={{ p: 3 }}>
          <VisEdita />
        </Box>
        {/* <VisNProvider >
          <Box sx={{ p: 3 }}>
            <VisNet />
          </Box>
        </VisNProvider> */}
      </Stack>

    </>
  )
}

export default App
