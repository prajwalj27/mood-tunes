import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    // alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.darkBackground,
  },
  title: {
    color: 'white',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    marginBottom: 20,
  },
  card: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },
  songInfo: {
    flex: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;
