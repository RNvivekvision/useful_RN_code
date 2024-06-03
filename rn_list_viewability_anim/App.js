import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ListViewableItemAnim from "./src/list_anim";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <ListViewableItemAnim />
      </SafeAreaProvider>
    </>
  );
}
