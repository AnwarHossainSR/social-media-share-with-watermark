import React, { useRef } from 'react';
import ImageIcon from './image.jpg';
const App = () => {
  const imageRef = useRef(null);
  const handleShare = async () => {
    //const newFile = await toBlob(imageRef.current);
    const data = {
      files: [
        new File([imageRef.current], ImageIcon),
      ],
      title: 'Image',
      text: 'image',
    };

    try {
      await navigator.share(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Dynamically generate and share images</h1>
      <button onClick={handleShare}>Share</button>
      <p></p>
      <img
        style={{ width: 120, height: 120 }}
        ref={imageRef}
        src={ImageIcon}
        alt='icon'
      />
    </div>
  );
};

export default App;
