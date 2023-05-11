import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter, useSearchParams, Stack } from 'expo-router';
import SettingsIcon from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
import MusicPlayerIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OptionsIcon from 'react-native-vector-icons/SimpleLineIcons';

import { COLORS, FONT, SIZES } from '../../constants/theme';
import styles from './style';
import { secondsToMins } from '../../utils/secondsToMins';
import { baseUrl } from '../../utils/config';
import { AllSongs } from '../../components';
import { getRandomImages } from '../../utils/GetRandomImages';

const SongScreen = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [songId, setSongId] = useState(parseInt(params.id));
  const max = 90;
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [timeListened, setTimeListened] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [songData, setSongData] = useState(null);
  const [similarSongs, setSimilarSongs] = useState([]);
  let interval;

  const fetchNextSong = async () => {
    // Check if the current song is the last song

    // Request the next song
    try {
      console.log(`${songData.name}: ${sliderValue}s `);
      const { data } = await axios.get(`${baseUrl}/songs/${songId + 1}`);
      setSongData(data[0]);
      setSongId(parseInt(data[0].song_id));
    } catch (error) {
      console.warn(error);
    }

    // Set current music listened time and slider to 0
    setTimeListened(0);
    setSliderValue(0);
    // Play the new song
    setIsSongPlaying(true);
  };

  const fetchPrevSong = async () => {
    try {
      // Check if the current song is the first song
      if (songId > 1) {
        if (sliderValue > 0) {
          console.log(`${songData.name}: ${sliderValue}s `);
          setSliderValue(0);
          setIsSongPlaying(false);
        } else {
          // Fetch the previous song
          const { data } = await axios.get(`${baseUrl}/songs/${songId - 1}`);
          setSongData(data[0]);
          setSongId(parseInt(data[0].song_id));
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const likeUnlikeSong = async () => {
    try {
      if (isLike === false) {
        const { data } = await axios.get(`${baseUrl}/liked/add/${songId}`);
        console.log(data);
        setIsLike(true);
      } else if (isLike === true) {
        const { data } = await axios.get(`${baseUrl}/liked/remove/${songId}`);
        console.log(data);
        setIsLike(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const fetchSimilarSongs = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/songs/similar/${songId}`);
        console.log(data[0].name);
        console.log(data[1].name);
        console.log(data[2].name);
        setSimilarSongs(data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchSimilarSongs();
  }, []);

  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/liked/${songId}`);
        setIsLike(data);
      } catch (error) {
        console.warn(error);
      }
    };

    getLikeStatus();
  }, []);

  useEffect(() => {
    const fetchSongById = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/songs/${songId}`);
        setSongData(data[0]);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchSongById();
  }, []);

  // If the song ends, pause the slider at the end
  useEffect(() => {
    if (sliderValue >= max) {
      setIsSongPlaying(false);
      fetchNextSong();
    }
  }, [sliderValue === max]);

  useEffect(() => {
    setTimeListened(sliderValue);
    if (isSongPlaying) {
      interval = setInterval(() => {
        setSliderValue((prev) => prev + 1);
      }, 1000);
    } else if (!isSongPlaying) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSongPlaying]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={'light-content'} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => {
                {
                  router.back();
                }
              }}
            >
              <BackIcon color="white" name="arrow-back" size={25} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }}>
              <SettingsIcon color="white" name="settings" size={25} />
            </TouchableOpacity>
          ),
        }}
      />

      <Image
        source={{
          uri: songData?.image,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
      >
        <Text numberOfLines={1} style={styles.songName}>
          {songData?.name}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.darkText, width: '50%' }}
          >
            {songData?.artist} - {songData?.album}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.darkText, width: '50%', textAlign: 'right' }}
          >
            (dur. listened: {timeListened}s)
          </Text>
        </View>

        <View
          style={{
            marginBottom: 0,
            marginTop: 42,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.songInfo}>{secondsToMins(sliderValue)}</Text>
            <Text style={styles.songInfo}>{secondsToMins(max)}</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={max}
            minimumTrackTintColor="orange"
            maximumTrackTintColor={COLORS.darkText}
            thumbTintColor="orange"
            value={sliderValue}
          />
        </View>

        <View style={styles.musicPlayer}>
          <TouchableOpacity>
            <MusicPlayerIcons
              name="md-shuffle-outline"
              color="white"
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={fetchPrevSong}>
            <MusicPlayerIcons
              name="md-play-skip-back"
              color="white"
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsSongPlaying(!isSongPlaying);
            }}
          >
            <MusicPlayerIcons
              name={
                isSongPlaying === true ? 'md-pause-circle' : 'md-play-circle'
              }
              color="white"
              size={80}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={fetchNextSong}>
            <MusicPlayerIcons
              name="md-play-skip-forward"
              color="white"
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={likeUnlikeSong}>
            <AntDesignIcons
              name={isLike ? 'heart' : 'hearto'}
              size={25}
              color="orange"
            />
          </TouchableOpacity>
        </View>

        <View>
          {sliderValue > 30 && similarSongs && (
            <>
              <Text
                style={{
                  color: COLORS.darkHeading,
                  fontFamily: FONT.bold,
                  fontSize: SIZES.large,
                  marginBottom: 20,
                }}
              >
                Similar Songs
              </Text>
              {similarSongs.map((song) => (
                <AllSongs
                  key={song.song_id}
                  id={song.song_id}
                  name={song.name}
                  artist={song.artist}
                  album={song.album}
                  image={song.image}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SongScreen;
