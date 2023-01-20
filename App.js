import { StatusBar } from "expo-status-bar";
import { ScrollView, Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

const App = () => {
  return (
    <>
      <StatusBar />
      <View>
        <Nav />
      </View>
      <Header />
      <Toast position="bottom" bottomOffset={20} />
    </>
  );
};

export default App;
