import { Button, Text, View } from "react-native";
import { useAuth } from "../../shared/context/auth.context";
import { router } from "expo-router";

export default function HomeScreen() {
  const { signOut } = useAuth();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home 1</Text>
      <Button title='Logout' onPress={ signOut } />
      <Button title='Secondary Screen' onPress={ () => router.push('/screens') } />
    </View>
  )
}