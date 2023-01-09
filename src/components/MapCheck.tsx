import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import '../Styles/style.css';

interface Props {
  setMapOpen: React.Dispatch<SetStateAction<boolean>>;
  coordiList: Coordinate[];
  setCoordiList: React.Dispatch<SetStateAction<Coordinate[]>>;
}
interface Coordinate {
  coordinateX: number;
  coordinateY: number;
}

export default function MapCheck({ setMapOpen, coordiList, setCoordiList }: Props) {
  const mapRef = useRef<HTMLImageElement>(null);
  const [coordi, setCoordi] = useState<Coordinate>({
    coordinateX: 0,
    coordinateY: 0,
  });
  const clickHandler = (e: any) => {
    console.log(e.clientX, e.clientY)
    // 클릭한 좌표 구하기 = 지도 맨 왼쪽 상단 부분을 클릭한 좌표(offsetTop,Left로 구하는 방법 확인하기)에 원 크기의 반 값을 더한 뒤, 클릭한 좌표에서 빼준다.
    setCoordi({ coordinateX: e.clientX-175, coordinateY: e.clientY-245 })
  };
  const clear = () => { setCoordi({ coordinateX: 0, coordinateY: 0 })};
  const save = () => { setCoordiList([...coordiList, coordi]) }

  const closeModal = () => {
    setMapOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setMapOpen(false);
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
        <h1 className='title'> 지도 체크 </h1>
        <div className='container position-relative'>
          <img className='map-img position-absolute' src='http://www.n1art.co.kr/ez/upload/mall/shop_1509341818986515_11.jpg' alt='treasure' ref={mapRef} onClick={clickHandler} />
          { coordi.coordinateX !== 0 && coordi.coordinateY !== 0
            ? <input style={{ left: coordi.coordinateX, top: coordi.coordinateY }} disabled className='check-point' onClick={clickHandler} />
            : null
          }
          { coordiList
          ? coordiList.map((coordi) => <input style={{ left: coordi.coordinateX, top: coordi.coordinateY, border: 'blue solid 5px' }} disabled className='check-point' />)
          : null }
          <div className='btn-flex position-absolute' style={{ translate: '0 150px' }}>
            <button className='fn-btn' onClick={clear}>clear</button>
            <button className='fn-btn' onClick={save}>save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

