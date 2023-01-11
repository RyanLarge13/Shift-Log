import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import PouchDB from "pouchdb-react-native";

const TechTimes = () => {
  const DBThreeAndFour = new PouchDB("threefour");
  const DBFive = new PouchDB("five");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tech Times</Text>
      <View style={styles.threeAndFour}>
        <Text style={styles.furnaceTitle}> 3 & 4 Furnace</Text>
        <View style={styles.cd}>
          <TextInput style={styles.input} placeholder="3F CD" />
          <TextInput style={styles.input} placeholder="4F CD" />
          <TextInput style={styles.input} placeholder="GRIND" />
          <TextInput style={styles.input} placeholder="MgO %" />
        </View>
      </View>
      <View style={styles.five}>
        <Text style={styles.furnaceTitle}>5 Furnace</Text>
        <View style={styles.fiveCdGrind}>
          <TextInput style={styles.input} placeholder="CD" />
          <TextInput style={styles.input} placeholder="GRIND" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 50,
    marginVertical: 50,
    textAlign: "center",
  },
  threeAndFour: {
    marginBottom: 100,
  },
  furnaceTitle: {
    fontSize: 25,
    textAlign: "center",
  },
  input: {
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
    textAlign: "center"
  },
});

export default TechTimes;
