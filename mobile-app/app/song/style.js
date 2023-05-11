import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBackground,
    flex: 1,
    padding: 25,
    paddingTop: 40,
  },
  image: {
    paddingTop: 40,
    width: '100%',
    height: 350,
    borderRadius: 10,
  },
  songName: {
    marginTop: 30,
    fontFamily: FONT.bold,
    color: COLORS.darkHeading,
    fontSize: 30,
  },
  songInfo: {
    color: COLORS.darkText,
  },
  musicPlayer: {
    height: 160,
    marginBottom: 50,
    paddingTop: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  playButton: {
    backgroundColor: 'white',
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
});

export default styles;
