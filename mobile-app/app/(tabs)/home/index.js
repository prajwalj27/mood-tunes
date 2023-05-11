import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import { AllSongs, ScreenHeader } from '../../../components';
import { greetUser } from '../../../utils/greetUser';
import styles from './style';
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';

import { baseUrl } from '../../../utils/config';

const Home = () => {
  const greeting = greetUser();
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/songs/all`);
        setAllSongs(data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchAllSongs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={`${greeting}`} />

      <Text style={styles.title}>Listen to Top songs</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {allSongs.length === 0 ? (
          <ActivityIndicator color="orange" size={35} />
        ) : (
          allSongs
            ?.splice(0, 100)
            .map((song) => (
              <AllSongs
                key={song.song_id}
                id={song.song_id}
                name={song.name}
                artist={song.artist}
                album={song.album}
                image={song.image}
              />
            ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
