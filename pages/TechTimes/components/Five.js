import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PouchDB from "pouchdb-react-native";

const Five = () => {
  const [list, setList] = useState(false);
  const [screens, setScreens] = useState([]);
  const fiveDB = new PouchDB("furnaceFive");
  const screensDB = new PouchDB("screens");
  const timeArray = ["8", "10", "12", "2", "4"];

  useEffect(() => {
    fiveDB
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then((res) => {
        const sorted = res.rows.sort((a, b) => a.doc.Place > b.doc.Place);
        return setList(sorted);
      })
      .catch((err) => console.log(err));
    grabScreens();
  }, [screens]);

  const grabScreens = () => {
    screensDB
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then((res) => setScreens(res.rows))
      .catch((err) => console.log(err));
  };

  const deleteItem = (id, screensId) => {
    fiveDB
      .get(id)
      .then((doc) => fiveDB.remove(doc))
      .catch((err) => console.log(err));

    screensDB
      .get(screensId)
      .then((doc) => screensDB.remove(doc))
      .catch((err) => console.log(err));
  };

  return (
    <View>
      {list && (
        <View>
          {list.map((item, index) => (
            <View key={item.doc._id} style={styles.item}>
              <Text>{timeArray[item.doc.Place]})</Text>
              <Text>{item.doc.Cd} CD</Text>
              <Text>{item.doc.Grind} GR</Text>
              <Text>
                {screens[index]
                  ? "Screens: " + screens[index].doc.Text
                  : "Screens: - "}
              </Text>
              <Pressable
                style={styles.close}
                onPress={() =>
                  deleteItem(
                    item.doc._id,
                    screens[index] ? screens[index].doc._id : null
                  )
                }
              >
                <Icon name="close" />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    elevation: 5,
    marginVertical: 15,
    padding: 10,
    backgroundColor: "#fff",
  },
  close: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#f0f",
    position: "absolute",
    top: -10,
    right: -10,
  },
});

export default Five;
