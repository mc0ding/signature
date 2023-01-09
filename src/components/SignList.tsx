import React from 'react';
import '../Styles/style.css';

export default function SignList({ src, idx }: { src: string, idx: number }) {

  const debugBase64 = (base64URL: any) => {
    var win = window.open();
    if (win) { win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'); };
  };
  
  return (
    <div className='img-list' key={idx}>
      <button onClick={() => debugBase64(src)}>Signature {idx}</button>
    </div>
  );
}