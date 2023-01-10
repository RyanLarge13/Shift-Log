import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Shift Log</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    position: "absolute",
    top: 0,
    backgroundColor: "#f0f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    marginTop: 25,
    fontSize: 25,
  },
});

export default Header;
