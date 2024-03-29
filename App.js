import { Alert, Text, TouchableOpacity, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Hello</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
