import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
    padding: 20,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.darkHeading,
    marginBottom: 5,
  },
  card: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },
  songInfo: {
    flex: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  subtitle: {
    marginBottom: 5,
    color: COLORS.darkText,
    fontFamily: FONT.medium,
    fontSize: SIZES.regular,
    textAlign: 'justify',
  },
  section: {
    marginBottom: 20,
  },
});

export default styles;
