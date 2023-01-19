import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import PouchDB from "pouchdb-react-native";
import Five from "./components/Five";
import ThreeAndFour from "./components/ThreeAndFour";

const TechTimes = () => {
  const [fiveLength, setFiveLength] = useState(null);
  const [grind34, setGrind34] = useState("");
  const [grind5, setGrind5] = useState("");
  const [cd3, setCd3] = useState("");
  const [cd4, setCd4] = useState("");
  const [cd5, setCd5] = useState("");
  const [mgo, setMgo] = useState("");
  const [screens, setScreens] = useState("");

  const DBThreeFour = new PouchDB("furnaceThreeFour");
  const DBFive = new PouchDB("furnaceFive");
  const DBmgo = new PouchDB("mgo");
  const DBScreens = new PouchDB("screens");

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  useEffect(() => {
    DBFive.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((res) => setFiveLength(res.rows))
      .catch((err) => console.log(err));
  }, []);

  const add34 = () => {
    const new34 = {
      _id: Math.floor(Math.random(794678) * 46752).toString(),
      Cd3: cd3,
      Cd4: cd4,
      Grind: grind34,
    };
    DBThreeFour.put(new34)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));

    showToast("success", "Added 3&4 Tech Times", null);
  };

  const addMgo = () => {
    if (mgo === "") return showToast("error", "You Must Add an MgO", null);
    const newMgo = {
      _id: Math.floor(Math.random(590274) * 835).toString(),
      Mgo: mgo,
    };
    DBmgo.put(newMgo)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));

    showToast("success", "Added MgO", null);
  };

  const add5Furnace = () => {
    const new5 = {
      _id: Math.floor(Math.random(85337) * 2063777).toString(),
      Grind: grind5,
      Cd: cd5,
      Place: fiveLength.length,
    };
    DBFive.put(new5)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));

    showToast("success", "Successfully Added 5F Tech Times", null);
  };

  const addScreens = () => {
    const newScreen = {
      _id: Math.floor(Math.random(7592747) * 75522384).toString(),
      Text: screens,
    };
    DBScreens.put(newScreen)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));

    showToast("success", "Successfully Added Screens", null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tech Times</Text>
      <View style={styles.threeAndFour}>
        <Text style={styles.furnaceTitle}> 3 & 4 Furnace</Text>
        <View style={styles.cd}>
          <TextInput
            onChangeText={(text) => setCd3(text)}
            style={styles.input}
            placeholder="3F CD"
          />
          <TextInput
            onChangeText={(text) => setCd4(text)}
            style={styles.input}
            placeholder="4F CD"
          />
          <TextInput
            onChangeText={(text) => setGrind34(text)}
            style={styles.input}
            placeholder="GRIND"
          />
          <Pressable onPress={add34} style={styles.add}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
          <TextInput
            onChangeText={(text) => setMgo(text)}
            style={styles.input}
            placeholder="MgO %"
          />
          <Pressable onPress={addMgo} style={styles.add}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.five}>
        <Text style={styles.furnaceTitle}>5 Furnace</Text>
        <View style={styles.fiveCdGrind}>
          <TextInput
            onChangeText={(text) => setCd5(text)}
            style={styles.input}
            placeholder="CD"
          />
          <TextInput
            onChangeText={(text) => setGrind5(text)}
            style={styles.input}
            placeholder="GRIND"
          />
          <Pressable onPress={add5Furnace} style={styles.add}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
          <TextInput
            onChangeText={(text) => setScreens(text)}
            style={styles.input}
            placeholder="SCREENS"
          />
          <Pressable style={styles.add} onPress={addScreens}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      </View>
      <ThreeAndFour />
      <Five />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "25%",
  },
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
    textAlign: "center",
    alignSelf: "center",
    width: "90%",
  },
  add: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#000",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 25,
    marginTop: 5,
  },
  addText: {
    color: "#fff",
  },
});

export default TechTimes;
