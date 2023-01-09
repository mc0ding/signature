import React, { useState } from 'react';
import Camera from './components/Camera';
import ImgList from './components/ImgList';
import MapCheck from './components/MapCheck';
import Signature from './components/Signature';
import SignList from './components/SignList';

import './Styles/style.css';

interface Coordinate {
  coordinateX: number;
  coordinateY: number;
}

export default function App() {
  const [signOpen, setSignOpen] = useState<boolean>(false);
  const [camOpen, setCamOpen] = useState<boolean>(false);
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [signList, setSignList] = useState<string[]>([]);
  const [imgList, setImgList] = useState<string[]>([]);
  const [coordiList, setCoordiList] = useState<Coordinate[]>([]);

  const showSign = () => {
    setSignOpen(true);
  };
  const showCam = () => {
    setCamOpen(true);
  };
  const showMap = () => {
    setMapOpen(true);
  };

  return (
    <div>
      <div className='btn-flex'>
        <button className='modal-btn' onClick={showSign}>서명 띄우기</button>
        {signOpen && <Signature setSignOpen={setSignOpen} signList={signList} setSignList={setSignList} />}
        <button className='modal-btn' onClick={showCam}>카메라 띄우기</button>
        {camOpen && <Camera setCamOpen={setCamOpen} imgList={imgList} setImgList={setImgList} />}
        <button className='modal-btn' onClick={showMap}>지도 띄우기</button>
        {mapOpen && <MapCheck setMapOpen={setMapOpen} coordiList={coordiList} setCoordiList={setCoordiList} />}
      </div>
      <div>
        { signList.length !== 0
        ? signList.map((src, idx) => <SignList src={src} idx={idx} />)
        : null }
      </div>
      <div>
        { imgList.length !== 0
        ? imgList.map((src, idx) => <ImgList src={src} idx={idx} />)
        : null }
      </div>
      <div>
        { coordiList.length !== 0
        ? coordiList.map((coordi, idx) => <TreasureCoordinate coordi={coordi} idx={idx + 1} />)
        : null}
      </div>
    </div>
  );
};

const TreasureCoordinate = ({coordi, idx}: {coordi: Coordinate, idx: number}) => {
  return(
    <div>
      {idx}번째 보물 좌표: {coordi.coordinateX}, {coordi.coordinateY}
    </div>
  )
}