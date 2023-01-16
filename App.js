import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import Toast from "react-native-toast-message";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import TechTimes from "./pages/TechTimes/TechTimes";
import Log from "./pages/Log/Log";
import HMS from "./pages/HMS/HMS";
import Todos from "./pages/Todos/Todos";

export default function App() {
  return (
    <>
      <StatusBar />
      <Header />
      <ScrollView>
        <NativeRouter>
          <View style={styles.nav}>
            <View style={styles.linkContainer}>
              <Link to="/" style={styles.link}>
                <Text>Home</Text>
              </Link>
              <Link to="/log" style={styles.link}>
                <Text>Log</Text>
              </Link>
              <Link to="/todos" style={styles.link}>
                <Text>Todo's</Text>
              </Link>
              <Link to="/techtimes" style={styles.link}>
                <Text>Tech Times</Text>
              </Link>
              <Link to="/hms" style={styles.link}>
                <Text>HMS</Text>
              </Link>
            </View>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log" element={<Log />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/techtimes" element={<TechTimes />} />
              <Route path="/hms" element={<HMS />} />
            </Routes>
          </View>
        </NativeRouter>
      </ScrollView>
      <Toast position="bottom" bottomOffset={20} />
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    marginTop: 100,
    padding: 25,
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  link: {
    margin: 15,
    padding: 5,
    width: 125,
    height: 50,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#f0f",
    justifyContent: "center",
    alignItems: "center",
  },
});
