import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import axios from 'axios';

import styles from './style.js';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { baseUrl } from '../../utils/config.js';
import { getRandomImages } from '../../utils/GetRandomImages.js';

const RecommendedSongs = ({ mood, id, name, album, artist, image }) => {
  const [like, setLike] = useState(false);
  const router = useRouter();

  const likeUnlikeSong = async (songId) => {
    try {
      if (like === false) {
        const { data } = await axios.get(`${baseUrl}/liked/add/${songId}`);
        console.log(data);
        setLike(true);
      } else if (like === true) {
        const { data } = await axios.get(`${baseUrl}/liked/remove/${songId}`);
        console.log(data);
        setLike(false);
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

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            likeUnlikeSong(id);
          }}
        >
          <AntDesignIcons
            name={like ? 'heart' : 'hearto'}
            size={20}
            color="orange"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedSongs;
