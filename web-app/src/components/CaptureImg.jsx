import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { GiClockwiseRotation } from 'react-icons/gi';

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 1100,
  height: 800,
  facingMode: 'user',
};

const CaptureImg = () => {
  const [picture, setPicture] = useState('');
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });
  return (
    <div>
      <div>
        {picture === '' ? (
          <Webcam
            audio={false}
            height={800}
            ref={webcamRef}
            width={1100}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>

      <div>
        {picture !== '' ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setPicture('');
            }}
            className="bg-white w-20 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300 flex justify-evenly items-center"
          >
            Retake
            <GiClockwiseRotation />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="bg-white w-20 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};

export default CaptureImg;
