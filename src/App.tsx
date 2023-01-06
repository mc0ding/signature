import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './Styles/style.css';

function App() {
  const signCanvas = useRef() as React.MutableRefObject<any>;
  const clear = () => {
    signCanvas.current.clear();
  }
  const save = () => {
    const image = signCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'sign_image.png';
    link.click();
  };

  return (
    <>
      <h1> 서명 연습 </h1>
      <div className='container'>
        <div className='canvasContainer'>
          <SignatureCanvas
            ref={signCanvas}
            canvasProps={{ className: 'signCanvas canvasStyle '}}
            backgroundColor="rgb(230, 230, 230)"
          />
        </div>
        <button onClick={clear}>clear</button>
        <button onClick={save}>save</button>
      </div>
    </>
  );
}

export default App;
