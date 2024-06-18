import { Stack } from "expo-router";
import { Provider, useAuth } from "../shared/context/auth.context";


function AppRoot () {
  const { authInitialized, user } = useAuth();
  if (!authInitialized && !user) return null;

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='(tabs)'/>
    </Stack>
  );
}

export default function AppLayout() {
  return (
    <Provider>
      <AppRoot />
    </Provider>
  )
}