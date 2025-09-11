import { useRef } from 'react'
import { useVisNContext } from '../contexts/VisNProvider'
import VisNetworkAction from '../components/vis_network/VisNetworkAction'
import data_mini from '../components/vis_network/data/data_mini'
import data_herencia from '../components/vis_network/data/data_herencia'
import data_herencia_sinLevel from '../components/vis_network/data/data_herencia_sinLevel'
import data_herencia_lanninster from '../components/vis_network/data/data_herencia_lanninster'

function VisEdita() {
  const { setVisNItemRef, setVisNRef, visNRef, visNItemRef, visNItem, setVisNItem, visNValuesForm } = useVisNContext()
  const networkRef = useRef(null);

  let datan = data_herencia_lanninster //data_herencia_sinLevel // data_herencia //data_mini

  return (
    <div>
      VisEdita con VisNetworkAction
      <VisNetworkAction data={datan} />
    </div>
  )
}

export default VisEdita
