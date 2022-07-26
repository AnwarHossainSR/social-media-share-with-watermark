import React, { useRef, useState } from 'react';
import ReactImageProcess from 'react-image-process';
import { getDimenssion } from './customFunc';
import WatermarkImage from './watermark.svg';

const ReactImageProcessvesion2 = () => {
  const [image, setimage] = useState(null);
  let [file_and_dataurl, set_file] = useState(null);
  const [dimension, setDimension] = useState({});
  const ref = useRef();

  const onChange = async (event) => {
    try {
      if (event.target.files.length > 0) {
        await getDimenssion(event, setDimension);
        let file = event.target.files[0];
        setimage(URL.createObjectURL(file));
        let reader = new FileReader();
        reader.onload = function (e) {
          set_file([file, e.target.result]);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input type='file' onChange={onChange} />
      <p></p>
      {file_and_dataurl !== null && image !== null && (
        <ReactImageProcess
          mode='waterMark'
          waterMarkType='image'
          waterMark={WatermarkImage}
          width={dimension.width ? dimension.width : dimension.width}
          height={dimension.height ? dimension.height : dimension.height}
          //width={dimension.width}
          // height={dimension.height}
          opacity={1}
          coordinate={[0, 0]}
          ref={ref}
        >
          <img
            style={{
              width: '350px',
              height: '200px',
              border: '1px solid black',
            }}
            src={image}
            alt='icon'
          />
        </ReactImageProcess>
      )}

      <button
        onClick={async () => {
          const base64url = ref.current?.currentImgNodes[0]?.src;
          const blob = await (await fetch(base64url)).blob();
          const file = new File([blob], `${Date.now()}.png`, {
            type: blob.type,
          });
          navigator.share({
            title: 'Hello',
            text: 'Check out this image!',
            files: [file],
          });
        }}
      >
        Share
      </button>
    </div>
  );
};

export default ReactImageProcessvesion2;
