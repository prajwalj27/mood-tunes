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
    marginBottom: 20
  }
});

export default styles;
