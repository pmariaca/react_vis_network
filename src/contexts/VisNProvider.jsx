import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  visNRef: null,
  visNItem: null
})

const VisNProvider = ({ children }) => {
  const [visNRef, setVisNRef] = useState({})
  const [visNItem, setVisNItem] = useState({})

  // valores por defecto
  const visNNodeIni = Object.freeze({
    id: '',
    color: {
      border: '#2B7CE9',
      background: '#D2E5FF',
      highlight: { border: '#2B7CE9', background: '#D2E5FF' },
      hover: { border: '#2B7CE9', background: '#D2E5FF' }
    },
    size: 25,
    opacity: undefined,
    fixed: false,// {x:false,y:false}
    font: {
      color: "", size: 14, face: 'arial', background: "undefined",
      strokeWidth: 0, strokeColor: '#ffffff', align: 'center', vadjust: 0,
      multi: false, // true/html
      bold: false
    },

    icon: {},
    imagePadding: {},
    label: '',
    margin: {},
    scaling: {},
    shadow: { "enabled": true, "size": 10, color: "rgba(0,0,0,0.5)", x: 5, y: 5 },
    shape: '',
    shapeProperties: {
      borderDashes: false, borderRadius: 6, //interpolation: true,
      // useImageSize: false, // star y otras img tamaño
      useBorderWithImage: false, //coordinateOrigin: ''
    },
    widthConstraint: 150, // { minimum: 120, maximum: 170, x:undefined, y:undefined }
  });

  const visNEdgeIni = Object.freeze({
    id: '',
    // smooth:false,
    smooth: {
      type: 'dynamic', // 'diagonalCross', 'straightCross', 'curvedCW', 'curvedCCW', 'cubicBezier'
    },
    color: {
      color: '#848484',
      highlight: '#848484',
      hover:  '#848484',
      opacity: 1.0, 
    },

  });

  return (
    <StateContext.Provider value={{
      visNRef, setVisNRef,
      visNItem, setVisNItem,
    }}>
      {children}
    </StateContext.Provider>
  )
}

const useVisNContext = () => {
  return useContext(StateContext);
};

export { VisNProvider, useVisNContext };