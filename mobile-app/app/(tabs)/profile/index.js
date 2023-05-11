import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import { ScreenHeader } from '../../../components';
import styles from './style';
import { baseUrl } from '../../../utils/config';
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import { getRandomImages } from '../../../utils/GetRandomImages';

const LikedSongsList = ({ id, name, album, artist, image }) => {
  const router = useRouter();
  const [isLike, setIsLike] = useState(true);

  const likeUnlikeSong = async (songId) => {
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

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push(`/song/${id}`);
      }}
      key={id}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{ flex: 1, height: 50, width: 50 }}
      />
      <View style={styles.songInfo}>
        <Text
          style={{
            color: COLORS.darkHeading,
            fontFamily: FONT.medium,
            fontSize: SIZES.large,
          }}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          style={{
            color: COLORS.darkText,
            fontFamily: FONT.medium,
            fontSize: SIZES.regular,
          }}
          numberOfLines={1}
        >
          {artist} {'\u2022'} {album}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            likeUnlikeSong(id);
          }}
        >
          <AntDesignIcons
            name={isLike ? 'heart' : 'hearto'}
            size={20}
            color="orange"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const [likedSongsData, setLikedSongsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState('...');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getLikedSongs();
    getUserImagesCount();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getLikedSongs = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/liked`);
      setLikedSongsData(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteUserImages = async () => {
    try {
      user = 'prajwalj27';
      const { data } = await axios.get(`${baseUrl}/delete-info/${user}`);
      onRefresh();
    } catch (error) {
      console.warn(error);
    }
  };

  const getUserImagesCount = async () => {
    try {
      user = 'prajwalj27';
      const { data } = await axios.get(`${baseUrl}/get-info/${user}`);
      setCount(data.count);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getLikedSongs();
    getUserImagesCount();
  }, [likedSongsData.length]);

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7
    );

  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

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
      <ScreenHeader title="Profile" />
      <View
        style={{
          marginBottom: 30,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>User Privacy</Text>
        <View>
          <Text style={styles.subtitle}>
            We use user images to improve our ML models to recommend you music
            with the best accuracies.
          </Text>
          <Text style={styles.subtitle}>
            We respect your privacy. Do you want to delete all your personal
            information stored from our servers?
          </Text>
          <Text style={styles.subtitle}>
            (images stored on our servers: {count})
          </Text>
        </View>

        <TouchableOpacity
          onPress={deleteUserImages}
          style={{
            padding: 10,
            borderRadius: 25,
            margin: 10,
            flex: 1,
            backgroundColor: 'orange',
            borderWidth: 2,
            borderColor: 'orange',
            width: '40%',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.darkBackground,
            }}
          >
            Delete all info
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>View your analytics</Text>
        <View
          style={{
            height: 200,
            borderRadius: 10,
            backgroundColor: '#2b2929',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{color: 'white'}}>Nothing to show currently!</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.title}>Liked Songs</Text>
          <Text style={styles.subtitle}>{likedSongsData.length} songs</Text>
        </View>

        {likedSongsData.length !== 0 ? (
          likedSongsData.map((song) => (
            <LikedSongsList
              id={song.song_id}
              name={song.name}
              album={song.album}
              artist={song.artist}
              image={song.image}
              key={song.song_id}
            />
          ))
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
