import React, { useState } from 'react';
import { GiClockwiseRotation } from 'react-icons/gi';

import { MoodBasedSongs, CaptureImg } from '../components';

const MoodBased = () => {
  const moodArr = [
    'happy',
    'sad',
    'angry',
    'disgust',
    'surprise',
    'neutral',
  ];

  // const moodArr = ['happy'];
  const [currentMood, setCurrentMood] = useState(null);
  const [viewPlaylist, setViewPlaylist] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const getMood = () => {
    setCurrentMood(moodArr[Math.floor(Math.random() * moodArr.length)]);
    // if (currentMood === null) {
    //   setCurrentMood('Happy');
    // }
    // if (currentMood === 'Happy') {
    //   setCurrentMood('Sad');
    // }
    // if (currentMood === 'Sad') {
    //   setCurrentMood('Happy');
    // }
  };

  const resetPlaylist = () => {
    setViewPlaylist(false);
    setCurrentMood(null);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-7">
        Mood Based Playlist
      </h2>
      <div className="mb-10">
        <div className="mb-5">
          <p className="text-white font-bold mb-4 italic">
            Get your Mood Based Recommended Playlist!
          </p>

          {/* <button onClick={setCameraOpen(!cameraOpen)}>Open Camera</button> */}

          <p className="text-gray-400 mb-4 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            maiores exercitationem nesciunt deleniti voluptatem nisi quibusdam
            expedita! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Libero porro illo a optio ipsa fugiat minima cupiditate quasi,
            obcaecati expedita doloribus animi quo molestiae aut? Praesentium!
          </p>
          <p className="text-gray-400 mb-4 text-justify">
            You can either capture your current mood through your device camera
            or you can upload your current image through your system memory.
          </p>
        </div>

        {cameraOpen === true ? (
          <>
            <button
              type="button"
              className="bg-white w-20 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300"
              onClick={(e) => {
                e.preventDefault();
                setCameraOpen(!cameraOpen);
              }}
            >
              Close
            </button>
            <CaptureImg />
          </>
        ) : (
          <button
            type="button"
            className="bg-white w-20 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300"
            onClick={(e) => {
              e.preventDefault();
              setCameraOpen(!cameraOpen);
            }}
          >
            Open
          </button>
        )}

        <div className="flex flex-row justify-center items-center mb-5">
          <button
            type="button"
            className="bg-white w-20 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300"
            onClick={resetPlaylist}
          >
            Retry
          </button>

          <p className="mr-3 text-white font-bold">OR</p>

          <button
            type="button"
            className="bg-white w-20 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300"
            onClick={getMood}
          >
            Upload
          </button>
          {/* <button type="button" onClick={resetPlaylist}>
            <GiClockwiseRotation className="text-white" />
          </button> */}
        </div>

        {currentMood && (
          <>
            <div>
              <p className="text-white font-bold text-center text-lg text italic mb-5">
                Your mood appears to be{' '}
                {currentMood[0].toUpperCase() + currentMood.slice(1)}
              </p>
            </div>

            <div className="flex flex-row justify-center items-center">
              <button
                type="button"
                className="bg-white w-40 h-10 mr-3 font-bold opacity-80 rounded cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setViewPlaylist(true);
                }}
              >
                Get your Playlist
              </button>
            </div>
          </>
        )}
      </div>

      {viewPlaylist && <MoodBasedSongs mood={currentMood} />}
    </div>
  );
};

export default MoodBased;
