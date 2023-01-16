import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import PouchDB from "pouchdb-react-native";

const Home = () => {
  const [user, setUser] = useState(false);
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [displaySeconds, setDisplaySeconds] = useState("");

  const userDB = new PouchDB("user");
  const id = (8352729).toString();
  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const hours = new Date().getHours();
  const amPm = hours > 11 ? "PM" : "AM";

  useEffect(() => {
    userDB
      .get(id)
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
    getMinutes();
    getSeconds();
  }, []);

  const getMinutes = () => {
    const newMinute = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    setMinutes(newMinute);
    setSeconds(seconds);
  };

  const getSeconds = () => {
    const newDisplaySeconds = new Date().getSeconds();
    setDisplaySeconds(newDisplaySeconds);
  };

  setInterval(() => {
    getMinutes();
  }, 60000 - seconds * 1000);

  setInterval(() => {
    getSeconds();
  }, 1000);

  const addUser = () => {
    const newUser = {
      _id: id,
      Name: name,
    };
    userDB
      .put(newUser)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  };

  return (
    <View>
      {user ? (
        <View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.name}>{user.Name}</Text>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{`${hours % 12 || 12}:${
              minutes.toString().length < 2 ? "0" + minutes : minutes
            }:${
              displaySeconds.toString().length < 2
                ? "0" + displaySeconds
                : displaySeconds
            }`}</Text>
            <Text style={styles.amPM}>{amPm}</Text>
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Name?"
            onChangeText={(text) => setName(text)}
          />
          <Pressable onPress={addUser}>
            <Text>Add Name</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 50,
  },
  name: {
    textAlign: "center",
    fontSize: 60,
    marginVertical: 25,
  },
  date: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 50,
    marginBottom: 20,
  },
  timeContainer: {
    justifyContent: "center",
  },
  time: {
    textAlign: "center",
    fontSize: 45,
  },
  amPM: {
    textAlign: "center",
    fontSize: 25,
  },
});

export default Home;
