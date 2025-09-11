import { Stack } from '@mui/material';
import { useState, useRef, useEffect } from 'react'
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

// hex
function Colorful({ color, setColor, }) {
  const copyRef = useRef()
  const [copied, setCopied] = useState(false);
  const [colorH, setColorH] = useState(color);
  const myText = "This is the text I want to copy.";
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  const presetColors = ['#cd9323', '#1a53d8', '#9a2151', '#0d6416', '#8d2808']
  const [colorHistory, setColorHistory] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      // ------------------
      setColorHistory((prevHistory) => {
        const updatedHistory = [color, ...prevHistory.filter((colorr) => colorr !== color)];
        return updatedHistory.slice(0, 10); // max 10 colors
      });
      // ------------------
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyClick = async () => {
    try {
      // console.log('------------------- ', copyRef.current.value)
      await navigator.clipboard.writeText(copyRef.current.value);
      setCopied(true);
      // Optionally, reset the "copied" state after a short delay
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
    }
  };

  return (
    <>
      <Stack direction="row">
        <div onClick={() => setIsOpen(!isOpen)} className="picker__select"
          style={{ backgroundColor: color }}
        > </div>
        {/* copyRef.current.textContent  ->  <span onClick={handleCopyClick} ref={copyRef} style={{ cursor: 'copy', marginLeft: '15px', padding: '10px', borderRadius: '30%', border: '1px solid #ccc' }} >
          {color} {copied ? '✅' : ''} 👉
        </span> */}
      </Stack>

      {isOpen && (
        <div ref={pickerRef} style={{ position: 'absolute', zIndex: 1 }}>
          <div className="picker">

            <HexAlphaColorPicker color={color} onChange={setColor} />
            <div style={{ display: 'flex' }}>
              <span onClick={handleCopyClick} style={{ cursor: 'copy', marginLeft: '5px', padding: '0px' }} > {copied ? '✅' : '👉'} </span>
              <HexColorInput color={color} onChange={setColor} ref={copyRef} alpha={true} prefixed={true} />
            </div>
            <div className="picker__swatches">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="picker__swatch"
                  style={{ background: presetColor }}
                  onClick={() => setColor(presetColor)}
                />
              ))}
            </div>

            <div className="picker__swatches">
              {colorHistory.map((colorr, index) => (
                <button
                  key={index}
                  className="picker__swatch"
                  style={{ background: colorr }}
                  onClick={() => setColor(colorr)}
                  title={colorr}
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </>

  )
}


export default Colorful
