import React, { useState } from 'react';
import Camera from './components/Camera';
import ImgList from './components/ImgList';
import Signature from './components/Signature';

import './Styles/style.css';

export default function App() {
  const [signOpen, setSignOpen] = useState<boolean>(false);
  const [camOpen, setCamOpen] = useState<boolean>(false);
  const [imgList, setImgList] = useState<string[]>([]);

  const showSign = () => {
    setSignOpen(true);
  };
  const showCam = () => {
    setCamOpen(true);
  };

  return (
    <div>
      <div className='btn-flex'>
        <button className='modal-btn' onClick={showSign}>서명 띄우기</button>
        {signOpen && <Signature setSignOpen={setSignOpen} />}
        <button className='modal-btn' onClick={showCam}>카메라 띄우기</button>
        {camOpen && <Camera setCamOpen={setCamOpen} imgList={imgList} setImgList={setImgList} />}
      </div>
      <div>
        { imgList.length !== 0
        ? imgList.map((src, idx) => <ImgList src={src} idx={idx} />)
        : null }
      </div>
    </div>
  );
};