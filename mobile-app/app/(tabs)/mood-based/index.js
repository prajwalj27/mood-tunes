import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';

import { RecommendedSongs, ScreenHeader } from '../../../components';
import styles from './style';
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import CameraScreen from '../../../components/CameraScreen/CameraScreen';
import { baseUrl } from '../../../utils/config';
import { getRandomImages } from '../../../utils/GetRandomImages';

const moods = [
  'happy',
  'sad',
  'neutral',
  'angry',
  'disgust',
  'fear',
  'surprise',
];

const errorMsg =
  'Face could not be detected. Please confirm that the picture is a face photo or consider to set enforce_detection param to False.';

const MoodBased = () => {
  const router = useRouter();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState();
  const [songData, setSongData] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const [mood, setMood] = useState('');
  const [predictionData, setpredictionData] = useState({
    deepface: '',
    fer: '',
    error: '',
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setSongData([]);
    setActiveButton('');
    setMood('');
    setIsCameraOpen(false);
    setPhoto();
    setpredictionData({
      error: '',
      deepface: '',
      fer: '',
    });

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getRecommendedSongs = async (model) => {
    const selectedMood = predictionData[model];
    setMood(selectedMood);
    try {
      const { data } = await axios.get(`${baseUrl}/songs/${selectedMood}`);
      setSongData(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUpload = async () => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/upload`,
        JSON.stringify(photo)
      );
      console.log(data.deepface);
      console.log(data.fer);

      if (data.deepface !== undefined || data.fer !== undefined) {
        setpredictionData((prev) => ({
          ...prev,
          deepface: data.deepface,
          fer: data.fer[0],
        }));
      } else {
        setpredictionData((prev) => ({
          ...prev,
          deepface: '',
          fer: '',
          error:
            'There was an error while detecting your Mood. Please try again later!',
        }));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/songs/all`);
        // console.log(data);
        setAllSongs(data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchAllSongs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Mood Based" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="orange"
          />
        }
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={styles.title}>Capture. Recommend. Enjoy. . .</Text>
          <Text style={styles.textContent}>
            MoodTunes analyzes your facial features to determine your current
            mood and generates a custom playlist tailored to your emotions.
            Whether you're feeling happy, sad, energized, or anything in
            between, MoodTunes has got you covered.
          </Text>
          <Text style={styles.textContent}>
            Say goodbye to endlessly scrolling through music libraries trying to
            find the perfect song - let MoodTunes do the work for you!
          </Text>
          {isCameraOpen ? (
            <View style={{ flex: 1, height: 400 }}>
              <Button
                title="close"
                onPress={() => {
                  setIsCameraOpen(false);
                }}
              />
              <CameraScreen
                photo={photo}
                setPhoto={setPhoto}
                handleUpload={handleUpload}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsCameraOpen(true);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Try now
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ width: '100%' }}>
          {predictionData.error === '' ? (
            predictionData.deepface !== '' && (
              <>
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    fontSize: SIZES.regular,
                    color: COLORS.darkHeading,
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Deepface Model: {predictionData.deepface}
                </Text>
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    fontSize: SIZES.regular,
                    color: COLORS.darkHeading,
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Our Model: {predictionData.fer}
                </Text>
              </>
            )
          ) : (
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.regular,
                color: COLORS.darkHeading,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {predictionData.error}
            </Text>
          )}
        </View>

        {predictionData.deepface !== '' ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 25,
                margin: 10,
                flex: 1,
                backgroundColor:
                  activeButton === 'deepface'
                    ? 'orange'
                    : COLORS.darkBackground,
                borderWidth: 2,
                borderColor: 'orange',
              }}
              onPress={() => {
                setActiveButton('deepface');
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color:
                    activeButton === 'deepface'
                      ? COLORS.darkBackground
                      : 'white',
                }}
              >
                Deepface
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 25,
                margin: 10,
                flex: 1,
                backgroundColor:
                  activeButton == 'fer' ? 'orange' : COLORS.darkBackground,
                borderWidth: 2,
                borderColor: 'orange',
              }}
              onPress={() => {
                setActiveButton('fer');
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color:
                    activeButton == 'fer' ? COLORS.darkBackground : 'white',
                }}
              >
                Our
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                getRecommendedSongs(activeButton);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                show
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        <View style={{ flex: 1, flexDirection: 'column', marginTop: 20 }}>
          {songData.length !== 0 && (
            <Text style={styles.title}>
              Recommended songs for {mood.toUpperCase()} mood
            </Text>
          )}

          {songData?.slice(0, 10).map((song) => (
            <RecommendedSongs
              mood={mood}
              name={song?.name}
              id={song?.song_id}
              album={song?.album}
              artist={song?.artist}
              key={song?.song_id}
              image={song?.image}
            />
          ))}
        </View>

        <View style={{ flex: 1, flexDirection: 'column', marginTop: 20 }}>
          <Text style={styles.title}>Explore other Songs</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodBased;
