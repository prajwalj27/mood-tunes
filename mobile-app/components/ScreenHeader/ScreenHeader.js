import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import SettingsIcon from 'react-native-vector-icons/Feather'

import { COLORS, FONT } from '../../constants/theme';

const ScreenHeader = ({ title }) => {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: true,
          headerTitle: '',
          headerLeft: () => (
            <Text
              style={{
                color: COLORS.darkHeading,
                fontFamily: FONT.bold,
                fontSize: 22,
              }}
            >
              {title}
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity style={{paddingRight: 10}}>
              <SettingsIcon color='white' name='settings' size={25} />
            </TouchableOpacity>
          ),
        }}
      />
    </>
  );
};

export default ScreenHeader;
