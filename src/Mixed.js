import ReactImageProcess from 'react-image-process';
import './style.css';

import { useRef } from 'react';

export default function App() {
  const ref1 = useRef();
  console.log(ref1.current);

  return (
    <div className='App'>
      <ReactImageProcess
        mode='waterMark'
        waterMarkType='text'
        waterMark={'WATER'}
        fontBold={false}
        fontSize={20}
        fontColor='red'
        coordinate={[10, 20]}
        rotate={0.9}
        ref={ref1}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src='https://www.draft-js-plugins.com/images/canada-landscape-small.jpg' alt='' />
      </ReactImageProcess>
    </div>
  );
}
