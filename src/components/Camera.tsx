import React, { SetStateAction, useEffect, useRef } from 'react';
import '../Styles/style.css';

interface Props {
  setCamOpen : React.Dispatch<SetStateAction<boolean>>;
  imgList : string[];
  setImgList : React.Dispatch<SetStateAction<string[]>>;
}

export default function Camera({setCamOpen, imgList, setImgList}: Props) {
  const closeModal = () => { setCamOpen(false); };
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handler = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) { setCamOpen(false); }
    };
    document.addEventListener('mousedown', handler);
    return () => { document.removeEventListener('mousedown', handler); };
  });
  
  const viewRef = useRef<HTMLVideoElement>(null);
  const outputRef = useRef<HTMLImageElement>(null);
  const sensorRef = useRef<HTMLCanvasElement>(null);
  const triggerRef =useRef<HTMLButtonElement>(null);
  let constraints = { video: { facingMode: "user"}, audio: false};
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream){
        const track = stream.getTracks()[0];
        if (viewRef !== null && viewRef.current !== null) { viewRef.current.srcObject = stream; }
      })
      .catch(function(error){
        console.error("카메라에 문제가 있습니다.", error);
      })
  }, []);

  //촬영 버튼 클릭 리스너
  const captureHandler = () => {
    if(sensorRef.current !== null && viewRef.current !== null && outputRef.current !== null) {
      sensorRef.current.width = viewRef.current.videoWidth; //640으로 정해져서 나오네?
      sensorRef.current.height = viewRef.current.videoHeight;
      sensorRef.current.getContext("2d")?.drawImage(viewRef.current, 0, 0);
      outputRef.current.src = sensorRef.current.toDataURL("image/webp");

      outputRef.current.classList.add("taken");
      const link = document.createElement('a');
      link.href = outputRef.current.src;
      setImgList([...imgList, link.href]);
      // console.log(imgList);
      
    };
  };

return (
  <div ref={modalRef} className='modal-container'>
    <button className='close' onClick={closeModal}>X</button>
    <div id="header">
      <h3>Simple Web Camera</h3>
      <p>사진 촬영 버튼을 클릭 하세요.</p>
    </div>
    <div id="camera">
      <canvas id="camera--sensor" ref={sensorRef}></canvas>
      <video id="camera--view" ref={viewRef} autoPlay playsInline></video>

      <img src="//:0" alt="" ref={outputRef} id="camera--output" />

      <button id="camera--trigger" ref={triggerRef} onClick={captureHandler}>사진촬영</button>
      
    </div>
  </div>
);
}

