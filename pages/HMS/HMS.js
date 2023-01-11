import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import PouchDB from "pouchdb-react-native";

const HMS = () => {
  const [sinks, setSinks] = useState("");
  const [floats, setFloats] = useState("");
  const [cone, setCone] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HMS</Text>
      <View style={styles.form}>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Sinks"
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Floats"
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Cone"
        />
        <Pressable style={styles.add}>
          <Text>Add</Text>
        </Pressable>
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
  input: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    textAlign: "center",
  },
  add: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 25,
    borderRadius: 10,
    backgroundColor: "#29f",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default HMS;
