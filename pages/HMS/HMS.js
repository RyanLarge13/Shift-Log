import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import PouchDB from "pouchdb-react-native";
import HMSList from "./components/HMSList";

const HMS = () => {
  const [sinks, setSinks] = useState("");
  const [floats, setFloats] = useState("");
  const [cone, setCone] = useState("");
  const [allItems, setAllItems] = useState([]);

  const DB = new PouchDB("hms");

  useEffect(() => {
    DB.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((res) => setAllItems(res.rows))
      .catch((err) => console.log(err));
  }, [allItems]);

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  let time;
  let amPm;
  const runChecks = async () => {
    await checkDate();
    if (sinks === "") return showToast("error", "Add Sinks Grab", null);

    if (allItems.length === 5)
      return showToast("success", "You Are Done For The Day", "👍");

    if (allItems.length <= 2) {
      time = allItems.length + allItems.length + 8;
    }
    if (allItems.length >= 3) {
      time = allItems.length + allItems.length - 4;
    }
    await add();
    resetState();
  };

  const checkDate = () => {
    const date = new Date().getHours();
    if (date < 12) amPm = "AM";
    if (date >= 12) amPm = "PM";
  };

  const add = () => {
    const id = Math.floor(Math.random(345916) * 383035).toString(),
      newItem = {
        _id: id,
        Time: `${time} ${amPm}`,
        Sinks: sinks,
        Floats: floats,
        Cone: cone,
      };
    DB.put(newItem)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  };

  const resetState = () => {
    showToast("success", "Successfully Added HMS Grab", "✔️");
    setSinks("");
    setFloats("");
    setCone("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HMS</Text>
      <View style={styles.form}>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Sinks"
          defaultValue={sinks}
          onChangeText={(text) => setSinks(text)}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Floats"
          defaultValue={floats}
          onChangeText={(text) => setFloats(text)}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Cone"
          defaultValue={cone}
          onChangeText={(text) => setCone(text)}
        />
        <Pressable style={styles.add} onPress={runChecks}>
          <Text>Add</Text>
        </Pressable>
      </View>
      <HMSList />
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
