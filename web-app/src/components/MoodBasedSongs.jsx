import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { happySongs, sadSongs, angrySongs } from '../songs';

const fetchSongs = async (mood) => {
  const { data } = await axios.post(
    `http://localhost:8000/predict-songs?mood=${mood}`
  );
  // console.log(data.prediction);
  return data.prediction;
};

const MoodBasedSongs = ({ mood }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [playlist, setPlaylist] = useState(null);
  let songs = [];

  useEffect(() => {
    const getSongs = async () => {
      songs = await fetchSongs(mood);
      // console.log(songs);
      setPlaylist(songs);
    };
    getSongs();
  }, []);

  if (playlist) {
    console.log(playlist.name[0]);
  }

  return (
    <div className="flex flex-col">
      {/* {mood === 'disgust' || mood === 'surprise' ? (
        <h1 className="font-bold text-3xl text-white">
          Songs for when you are {mood[0].toUpperCase() + mood.slice(1)}ed
        </h1>
      ) : (
        <h1 className="font-bold text-3xl text-white">
          Songs for when you are {mood[0].toUpperCase() + mood.slice(1)}
        </h1>
      )} */}

      <h1 className="font-bold text-3xl text-white">
        Songs for {mood[0].toUpperCase() + mood.slice(1)} mood
      </h1>

      <div className="mt-6 w-full flex flex-col">
        <div className="w-full flex flex-row items-center bg-[#4c426e] hover:bg-[#5c5084] py-2 p-4 rounded-lg cursor-pointer mb-2">
          {playlist && (
            <>
              <h3 className="font-bold text-base text-white mr-3">1.</h3>
              <img
                className="w-20 h-20 rounded-lg"
                src="https://i.scdn.co/image/ab67616d0000b27398ac1936c5f9a9d0911754b2"
                alt={playlist?.name[0]}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                  {playlist?.name[0]}
                </p>
                <p className="text-base text-gray-300 mt-1">
                  {playlist?.artist[0]}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex flex-row items-center bg-[#4c426e] hover:bg-[#5c5084] py-2 p-4 rounded-lg cursor-pointer mb-2">
          {playlist && (
            <>
              <h3 className="font-bold text-base text-white mr-3">2.</h3>
              <img
                className="w-20 h-20 rounded-lg"
                src="https://i.scdn.co/image/ab67616d0000b27398ac1936c5f9a9d0911754b2"
                alt={playlist?.name[1]}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                  {playlist?.name[1]}
                </p>
                <p className="text-base text-gray-300 mt-1">
                  {playlist?.artist[1]}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex flex-row items-center bg-[#4c426e] hover:bg-[#5c5084] py-2 p-4 rounded-lg cursor-pointer mb-2">
          {playlist && (
            <>
              <h3 className="font-bold text-base text-white mr-3">3.</h3>
              <img
                className="w-20 h-20 rounded-lg"
                src="https://i.scdn.co/image/ab67616d0000b27398ac1936c5f9a9d0911754b2"
                alt={playlist?.name[2]}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                  {playlist?.name[2]}
                </p>
                <p className="text-base text-gray-300 mt-1">
                  {playlist?.artist[2]}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex flex-row items-center bg-[#4c426e] hover:bg-[#5c5084] py-2 p-4 rounded-lg cursor-pointer mb-2">
          {playlist && (
            <>
              <h3 className="font-bold text-base text-white mr-3">4.</h3>
              <img
                className="w-20 h-20 rounded-lg"
                src="https://i.scdn.co/image/ab67616d0000b27398ac1936c5f9a9d0911754b2"
                alt={playlist?.name[3]}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                  {playlist?.name[3]}
                </p>
                <p className="text-base text-gray-300 mt-1">
                  {playlist?.artist[3]}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex flex-row items-center bg-[#4c426e] hover:bg-[#5c5084] py-2 p-4 rounded-lg cursor-pointer mb-2">
          {playlist && (
            <>
              <h3 className="font-bold text-base text-white mr-3">5.</h3>
              <img
                className="w-20 h-20 rounded-lg"
                src="https://i.scdn.co/image/ab67616d0000b27398ac1936c5f9a9d0911754b2"
                alt={playlist?.name[4]}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                  {playlist?.name[4]}
                </p>
                <p className="text-base text-gray-300 mt-1">
                  {playlist?.artist[4]}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodBasedSongs;
