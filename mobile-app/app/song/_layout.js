import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
};
export default Layout;
