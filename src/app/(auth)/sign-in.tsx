import { Button, Text, View } from "react-native";
import { useAuth } from "../../shared/context/auth.context";

export default function SignInScreen() {
  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign in</Text>
      <Button 
        title='Login'
        onPress={signIn}
      />
    </View>
  )
}