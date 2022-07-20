import React, { useState } from 'react';
import ImageMarker from 'react-image-marker';
import Icon from './image.jpg';

const CustomMarker = () => {
  return <p className='custom-marker'>#MediaMarkt</p>;
};
const App = () => {
  const [image, setimage] = useState('');
  const [markers, setMarkers] = useState([
    {
      top: 10, //10% of the image relative size from top
      left: 50, //50% of the image relative size from left
    },
  ]);
  const handleChangeImage = (e) => {
    setimage({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
  };
  return (
    <div>
      <input
        type='file'
        id='img'
        name='img'
        accept='image/*'
        className='w-100'
        onChange={handleChangeImage}
      />
      <p></p>
      {/* <img width={320} height={320} src={image.img} alt='img' /> */}
      <ImageMarker
        src={Icon}
        markers={markers}
        onAddMarker={(marker) => setMarkers([...markers, marker])}
        markerComponent={CustomMarker}
      />
    </div>
  );
};

export default App;
