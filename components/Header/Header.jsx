import { ImageBackground, View, Text, StyleSheet } from "react-native";

const img = "../../assets/headerImg.jpg";

const Header = () => {
  return (
    <View style={styles.header}>
      <ImageBackground source={require(img)} style={styles.img}>
        <Text style={styles.heading}>Shift Log</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    position: "absolute",
    top: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 999,
  },
  img: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  heading: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 25,
    color: "#020",
  },
});

export default Header;
