import { useState, useRef } from "react";
import {
  ImageBackground,
  Animated,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import Icon from "react-native-vector-icons/AntDesign";
import Home from "../../pages/Home/Home";
import TechTimes from "../../pages/TechTimes/TechTimes";
import Log from "../../pages/Log/Log";
import HMS from "../../pages/HMS/HMS";
import Todos from "../../pages/Todos/Todos";

const Nav = () => {
  const [toggled, setToggled] = useState(false);

  const linkImg = "../../assets/timeImg.jpg";

  const animateClosed = () => {
    unShow();
    setTimeout(() => {
      setToggled(false);
    }, 100);
  };

  const fadeAdmin = useRef(new Animated.Value(-600)).current;

  const show = () => {
    Animated.spring(fadeAdmin, {
      toValue: 0,
      durration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const unShow = () => {
    Animated.spring(fadeAdmin, {
      toValue: -700,
      durration: 4000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <NativeRouter>
      <View style={styles.nav}>
        <View>
          {toggled ? (
            <Animated.View
              style={{
                translateY: fadeAdmin,
                position: "absolute",
                top: 50,
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                zIndex: 500,
                borderRadius: 10,
                elevation: 10,
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require(linkImg)}
              >
                <Pressable
                  style={styles.toggleContainerClose}
                  onPress={animateClosed}
                >
                  <Icon style={styles.toggleClose} name="close" />
                </Pressable>
                <View style={{ paddingVertical: 25 }}>
                  <Link onPress={animateClosed} to="/" style={styles.link}>
                    <Text>Home</Text>
                  </Link>
                  <Link onPress={animateClosed} to="/log" style={styles.link}>
                    <Text>Log</Text>
                  </Link>
                  <Link onPress={animateClosed} to="/todos" style={styles.link}>
                    <Text>Todo's</Text>
                  </Link>
                  <Link
                    onPress={animateClosed}
                    to="/techtimes"
                    style={styles.link}
                  >
                    <Text>Tech Times</Text>
                  </Link>
                  <Link onPress={animateClosed} to="/hms" style={styles.link}>
                    <Text>HMS</Text>
                  </Link>
                </View>
              </ImageBackground>
            </Animated.View>
          ) : (
            <Pressable
              style={styles.toggleContainer}
              onPress={() => {
                setToggled(true);
                show();
              }}
            >
              <Icon name="bars" style={styles.toggle} />
            </Pressable>
          )}
        </View>

        <ScrollView>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Log />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/techtimes" element={<TechTimes />} />
            <Route path="/hms" element={<HMS />} />
          </Routes>
        </ScrollView>
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  nav: {
    marginTop: 100,
    zIndex: 999,
  },
  toggleContainer: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 999,
  },
  toggleContainerClose: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  toggle: {
    fontSize: 40,
  },
  toggleClose: {
    fontSize: 40,
    color: "#fff",
  },
  link: {
    margin: 15,
    padding: 5,
    width: 125,
    height: 50,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Nav;
