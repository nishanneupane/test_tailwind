import "../styles/globals.css"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/src/components/useColorScheme';
import { CartProvider } from "../providers/cart-provider";
import AuthProvider, { useAuth } from "../providers/auth-provider";
import QueryProvider from "../providers/query-provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const { session } = useAuth()
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => { setMounted(true) }, [])

  // if (!session) {
  //   return <Redirect href={"/sign-in"} />
  // }

  // if (!mounted) {
  //   return null
  // }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <AuthProvider>
        <QueryProvider>
          <CartProvider>
            <Stack screenOptions={{
              headerShown: false,
              animation: "ios"
            }}
            >
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ presentation: 'modal', animation: "fade" }} />
            </Stack>
          </CartProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
