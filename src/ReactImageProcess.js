import React, { useEffect, useRef, useState } from 'react';
import ReactImageProcess from 'react-image-process';
const App = () => {
  const [image, setimage] = useState(undefined);
  let [file_and_dataurl, set_file] = useState(null);
  const ref = useRef();
  const ref2 = useRef();
  useEffect(() => {
    if (ref.current?.currentImgNodes[0]) {
      console.log(ref.current);
      setimage(ref.current?.currentImgNodes[0]?.src);
    }
  }, [ref, image]);
  console.log(file_and_dataurl);
  console.log(ref.current?.currentImgNodes[0]?.src);
  console.log('image', image);
  console.log(ref2.current);
  return (
    <div>
      <input
        type='file'
        onChange={(e) => {
          if (e.target.files.length > 0) {
            let file = e.target.files[0];
            setimage(URL.createObjectURL(file));
            let reader = new FileReader();
            reader.onload = function (e) {
              set_file([file, e.target.result]);
            };
            reader.readAsDataURL(file);

            // set_file(file);
          }
        }}
      />
      <p></p>
      {file_and_dataurl !== null && (
        <ReactImageProcess
          mode='waterMark'
          waterMarkType='text'
          waterMark={'WATER'}
          fontBold={false}
          fontSize={20}
          fontColor='#396'
          coordinate={[10, 20]}
          ref={ref}
        >
          <img width={400} height={400} src={image} alt='icon' />
        </ReactImageProcess>
      )}

      <button
        onClick={() => {
          navigator.share({ files: [image] });
        }}
      >
        Share
      </button>

      {image && (
        <img
          src={ref.current?.currentImgNodes[0]?.src}
          alt='fdgfd'
          width={400}
          height={420}
          ref={ref2}
        />
      )}
    </div>
  );
};

export default App;
