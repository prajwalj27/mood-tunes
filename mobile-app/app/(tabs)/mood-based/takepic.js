import {
  SafeAreaView,
  Text,
  Button,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { StatusBar } from 'expo-status-bar';

const TakePic = () => {
  const router = useRouter();
  let cameraRef = useRef();
  const [hascameraPermissions, setHasCameraPermissions] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraPermission.status === 'granted');
    })();
  }, []);

  if (hascameraPermissions === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hascameraPermissions) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const retakePicture = () => {};
    const uploadPicture = async () => {
      try {
        await AsyncStorage.setItem(
          'photo',
          JSON.stringify({ uri: photo.base64 })
        );
      } catch (e) {
        console.log(e);
      }
      router.push('/mood-based');
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        />
        <Button title="Upload" onPress={uploadPicture} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View>
        <Button title="Capture" onPress={takePicture}></Button>
      </View>
    </Camera>
  );
};

export default TakePic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
