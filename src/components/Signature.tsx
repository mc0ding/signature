import React, { SetStateAction, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import '../Styles/style.css';

interface Props {
  setSignOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Signature({ setSignOpen }: Props) {
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
  const closeModal = () => {
    setSignOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSignOpen(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler); // 모바일 대응
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <div ref={modalRef} className='modal-container'>
      <button className='close' onClick={closeModal}>X</button>
      <div className='wrap'>
        <h1 className='title'> 서명 연습 </h1>
        <div className='container'>
          <div className='canvasContainer'>
            <SignatureCanvas
              ref={signCanvas}
              canvasProps={{ className: 'signCanvas canvasStyle ' }}
              backgroundColor="white"
            />
          </div>
          <div className='btn-flex'>
            <button className='fn-btn' onClick={clear}>clear</button>
            <button className='fn-btn' onClick={save}>save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

