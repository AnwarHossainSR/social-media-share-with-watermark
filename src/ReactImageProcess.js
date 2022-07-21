import React, { useEffect, useRef, useState } from 'react';
import ReactImageProcess from 'react-image-process';
const App = () => {
  const [image, setimage] = useState(undefined);
  let [file_and_dataurl, set_file] = useState(null);
  const ref = useRef();
  useEffect(() => {
    if (ref.current?.currentImgNodes[0]) {
      setimage(ref.current?.currentImgNodes[0]?.src);
    }
  }, [ref, image]);

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
