import { Tabs, Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MoodIcon from 'react-native-vector-icons/Octicons';
// const myIcon = <Icon name="rocket" size={30} color="#900" />;

import { COLORS, FONT } from '../../constants/theme';

export default function AppLayout() {
  return (
    <>
      <StatusBar animated={true} barStyle={'light-content'} />
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: COLORS.darkBackground,
            height: 60,
            borderTopColor: 'none',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 7,
            fontFamily: FONT.medium,
          },
          tabBarItemStyle: { width: 100 },
          tabBarActiveTintColor: 'orange',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FeatherIcons name="home" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mood-based"
          options={{
            title: 'Mood Based',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MoodIcon name="smiley" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Explore',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FeatherIcons name="search" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FeatherIcons name="user" size={25} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
