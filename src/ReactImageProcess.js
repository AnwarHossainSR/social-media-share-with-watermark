import React, { useEffect, useRef, useState } from 'react';
import ReactImageProcess from 'react-image-process';
import watermarkIcon from './watermark.svg';
const App = () => {
  const [image, setimage] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const ref = useRef();
  useEffect(() => {
    console.log(ref.current);
    if (ref.current?.currentImgNodes[0]) {
      setimage(ref.current?.currentImgNodes[0]?.src);
    }
  }, [image, file, ref]);

  return (
    <div>
      <input
        type='file'
        onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
      />
      <p></p>
      {file && (
        <ReactImageProcess
          mode='waterMark'
          waterMarkType='image'
          waterMark={watermarkIcon}
          width={3000}
          height={200}
          opacity={1}
          coordinate={[200, 1400]}
          ref={ref}
        >
          <img width={400} height={400} src={file} alt='icon' />
        </ReactImageProcess>
      )}

      <button
        onClick={() =>
          navigator.share({ files: [ref.current?.currentImgNodes[0]?.src] })
        }
      >
        Share
      </button>

      {image && (
        <img
          src={ref.current?.currentImgNodes[0]?.src}
          alt='fdgfd'
          width={400}
          height={420}
        />
      )}
    </div>
  );
};

export default App;
