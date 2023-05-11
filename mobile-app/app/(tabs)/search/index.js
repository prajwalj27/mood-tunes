import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';

import { ScreenHeader, AllSongs } from '../../../components';
import styles from './style';
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import { baseUrl } from '../../../utils/config';
import { getRandomImages } from '../../../utils/GetRandomImages';

const Playlists = ({ mood }) => {
  const router = useRouter();
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/songs/${mood}`);
        // console.log(data)
        setAllSongs(data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchAllSongs();
  }, []);
  return (
    <View style={{ flex: 1, flexDirection: 'column', marginTop: 20 }}>
      <Text style={styles.title}>
        {mood.charAt(0).toUpperCase() + mood.slice(1, mood.length)}
      </Text>

      {allSongs.length === 0 ? (
        <ActivityIndicator color="orange" size={35} />
      ) : (
        <FlatList
          data={allSongs.splice(0, 5)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/song/${item?.song_id}`);
              }}
              style={{
                height: 200,
                width: 150,
                borderRadius: 20,
              }}
            >
              <Image
                source={{
                  uri: item?.image,
                }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                }}
              />
              <View style={{ padding: 5, paddingTop: 0 }}>
                <Text
                  style={{
                    color: COLORS.darkHeading,
                    fontFamily: FONT.medium,
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.darkText,
                    fontFamily: FONT.medium,
                  }}
                  numberOfLines={1}
                >
                  {item.artist}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.song_id}
          horizontal
          contentContainerStyle={{ columnGap: 28 }}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchScreen, setSearchScreen] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchAllSongs = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/songs/all`);
      // console.log(data)
      setSongsData(data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor="orange"
        />
      }
    >
      <ScreenHeader title="Search" />
      <Text style={styles.title}>Find your favorite songs</Text>

      <TextInput
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: 45,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
        placeholder="What do you want to listen to?"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      {searchTerm !== '' ? (
        songsData
          ?.filter((song) => {
            if (searchTerm === '') {
              return song;
            } else if (
              song.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return song;
            }
          })
          .splice(0, 10)
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
      ) : (
        <>
          <Playlists mood="happy" />
          <Playlists mood="relax" />
          <Playlists mood="sad" />
          <Playlists mood="angry" />
        </>
      )}
    </ScrollView>
  );
};

export default Search;
