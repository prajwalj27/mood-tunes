import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.darkBackground,
  },
  title: {
    color: 'white',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    marginBottom: 20,
  },
  textContent: {
    textAlign: 'justify',
    fontFamily: FONT.medium,
    fontSize: SIZES.regular,
    color: COLORS.darkText,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    margin: 10,
    flex: 1
  },

  // lists
  card: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },
  songInfo: {
    flex: 5,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export default styles;
