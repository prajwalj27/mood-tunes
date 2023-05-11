import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants/theme'

const styles = StyleSheet.create({
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
  title: {
    color: 'white',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    marginBottom: 20,
  },
})

export default styles;