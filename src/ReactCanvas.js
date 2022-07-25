import { useEffect, useRef } from 'react';
import './style.css';
import Watermark from './watermark.svg';
export default function App() {
  const myCanvas = useRef();

  useEffect(() => {
    const context = myCanvas.current.getContext('2d');
    const image = new Image();
    image.src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png';
    image.onload = () => {
      context.drawImage(image, 0, 0, 500, 500);
      //context.drawImage(Watermark, 0, 0, 100, 100);
    };
    console.log(image);
  }, []);

  return <canvas ref={myCanvas} width={500} height={500} />;
}
