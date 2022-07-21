import React, { useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import ReactImageProcess from 'react-image-process';
import WatermarkImage from './watermark1.svg';

const App = () => {
  const [image, setimage] = useState(undefined);
  let [file_and_dataurl, set_file] = useState(null);
  const ref = useRef();
  useEffect(() => {
    if (ref.current?.currentImgNodes[0]) {
      setimage(ref.current?.currentImgNodes[0]?.src);
    }
  }, [ref, image]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        4000,
        3000,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
        200,
        150
      );
    });

  const onChange = async (event) => {
    try {
      const img = await resizeFile(event.target.files[0]);
      const base64url = img;
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], 'fileName.png', { type: blob.type });

      if (event.target.files.length > 0) {
        setimage(URL.createObjectURL(file));
        let reader = new FileReader();
        reader.onload = function (e) {
          set_file([file, event.target.result]);
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
      {file_and_dataurl !== null && (
        <ReactImageProcess
          mode='waterMark'
          waterMarkType='image'
          waterMark={WatermarkImage}
          width={4000}
          height={500}
          opacity={1}
          coordinate={[0, 2500]}
          ref={ref}
        >
          <img
            style={{
              width: '200px',
              height: '150px',
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
          const file = new File([blob], 'fileName.png', { type: blob.type });
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
