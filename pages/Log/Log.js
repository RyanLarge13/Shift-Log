import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import LogList from "./components/LogList";
import PouchDB from "pouchdb-react-native";
import Toast from "react-native-toast-message";

const Log = () => {
  const [time, setTime] = useState("");
  const [context, setContext] = useState("");

  useEffect(() => {
    createTime();
  }, [context]);

  const showToast = (message, type) => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  const createItem = () => {
    if (context === "") return showToast("Add Context Please!", "error");
    const logDB = new PouchDB("log");
    logDB
      .put({
        _id: `${time}:${new Date().getSeconds()}`,
        Time: time,
        Text: context,
      })
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));

    setContext("");
    showToast("Successfully Added Log", "success");
  };

  const createTime = () => {
    if (context === "") return;
    let morningOrNight;
    const amPm = new Date().getHours();
    const hour = new Date().getHours() % 12 || 12;
    let minutes = new Date().getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (amPm < 12) {
      morningOrNight = "AM";
    }
    if (amPm >= 12) {
      morningOrNight = "PM";
    }
    const fullTime = `${hour}:${minutes} ${morningOrNight}`;
    setTime(fullTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Context"
          onChangeText={(text) => setContext(text)}
          value={context}
        />
        <Pressable style={styles.add} onPress={createItem}>
          <Text style={{ color: "#fff" }}>Add</Text>
        </Pressable>
      </View>
      <LogList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "25%",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
  },
  form: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  add: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#000",
  },
});

export default Log;
