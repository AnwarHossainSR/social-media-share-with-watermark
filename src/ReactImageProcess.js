import React, { useEffect, useRef, useState } from 'react';
import ReactImageProcess from 'react-image-process';
import WatermarkImage from './watermark1.svg';
const App = () => {
  const [image, setimage] = useState(undefined);
  const [size, setSize] = useState({ width: 0, height: 0 });
  let [file_and_dataurl, set_file] = useState(null);
  const ref = useRef();
  const ref2 = useRef();
  useEffect(() => {
    if (ref.current?.currentImgNodes[0]) {
      setimage(ref.current?.currentImgNodes[0]?.src);
    }
  }, [ref, image]);
  useEffect(() => {
    if (ref2.current) {
      console.log('ref width height', ref2.current);
    }
  }, [ref2]);

  return (
    <div>
      <input
        type='file'
        onChange={(e) => {
          console.log(e.nativeEvent.path[6].window.innerWidth);
          console.log(e.nativeEvent.path[6].window.innerHeight);
          setSize({
            width: e.nativeEvent.path[6].window.innerWidth,
            height: e.nativeEvent.path[6].window.innerHeight,
          });
          //console.log(e.nativeEvent.path.window.innerWidth);
          if (e.target.files.length > 0) {
            let file = e.target.files[0];
            setimage(URL.createObjectURL(file));
            let reader = new FileReader();
            reader.onload = function (e) {
              set_file([file, e.target.result]);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <p></p>
      {file_and_dataurl !== null && (
        <ReactImageProcess
          mode='waterMark'
          waterMarkType='image'
          waterMark={WatermarkImage}
          width={size.width*5}
          height={510}
          //coordinate={[0, 200 * 14.8]}
          ref={ref}
        >
          <img
            style={{
              width: 200,
              minWidth: 200,
              maxWidth: 200,
              height: 150,
              minHeight: 150,
              MaxHeight: 150,
            }}
            src={image}
            alt='icon'
            ref={ref2}
          />
        </ReactImageProcess>
      )}

      <button
        onClick={async () => {
          const base64url = ref.current?.currentImgNodes[0]?.src;
          const blob = await (await fetch(base64url)).blob();
          const file = new File([blob], 'fileName.png', { type: blob.type });
          console.log(file);
          navigator.share({
            title: 'Hello',
            text: 'Check out this image!',
            files: [file],
          });
        }}
      >
        Share
      </button>

      {/* {image && (
        <img
          src={ref.current?.currentImgNodes[0]?.src}
          alt='fdgfd'
          width={400}
          height={400}
        />
      )} */}
    </div>
  );
};

export default App;
