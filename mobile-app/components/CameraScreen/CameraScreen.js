import {
  SafeAreaView,
  Text,
  Button,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';

// import { StatusBar } from 'expo-status-bar';

const CameraScreen = ({ photo, setPhoto, handleUpload }) => {
  let cameraRef = useRef();
  const [hascameraPermissions, setHasCameraPermissions] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraPermission.status === 'granted');
      // console.log(cameraPermission);
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
    const uploadPicture = () => {
      console.log('pic captured');
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        />
        <Button title="Upload" onPress={handleUpload} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef} type={CameraType.front}>
      <View>
        <Button title="Capture" onPress={takePicture}></Button>
      </View>
    </Camera>
  );
};

export default CameraScreen;

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
