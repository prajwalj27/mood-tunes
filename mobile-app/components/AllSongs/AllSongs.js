import { View, Text, Image, TouchableOpacity } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import OptionsIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import styles from './style.js';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import axios from 'axios';
import { baseUrl } from '../../utils/config.js';
import { getRandomImages } from '../../utils/GetRandomImages.js';

const AllSongs = ({ mood, id, name, album, artist, image}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push(`song/${id}`);
      }}
    >
      {/* <Image
        source={{
          uri: 'https://static.wixstatic.com/media/e4256a_1772aed0a7424988ac044845081fd3af~mv2.png',
        }}
        style={{ flex: 1, height: 50, width: 50 }}
      /> */}
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <OptionsIcon name="share" size={15} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <OptionsIcon name="options-vertical" size={20} color="orange" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AllSongs;
