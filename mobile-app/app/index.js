import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Stack, useRouter, Tabs, Link, Redirect } from 'expo-router';
import { StatusBar } from 'react-native';

const index = () => {
  const router = useRouter();
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <StatusBar animated={true} barStyle={'light-content'} />

    //   <Stack.Screen
    //     options={{
    //       headerStyle: { backgroundColor: 'black' },
    //       headerShadowVisible: false,
    //       headerLeft: () => (
    //         <Text
    //           style={{ fontFamily: 'DMBold', color: 'white', fontSize: 22 }}
    //         >
    //           Good afternoon
    //         </Text>
    //       ),
    //       headerTitle: '',
    //     }}
    //   />

    //   <View>
    //     <Text>test</Text>
    //   </View>

    // </SafeAreaView>
    <>
      <Redirect href="/home" />
    </>
  );
};

export default index;
