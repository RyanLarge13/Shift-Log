import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import PouchDB from "pouchdb-react-native";

const HMSList = () => {
  const [list, setList] = useState([]);

  const DB = new PouchDB("hms");

  useEffect(() => {
    DB.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((res) => {
        const sortedRows = res.rows.sort((a, b) => a.doc.Place > b.doc.Place);
        return setList(sortedRows);
      })
      .catch((err) => console.log(err));
  }, [list]);

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  const deleteItem = (id) => {
    DB.get(id)
      .then((doc) => DB.remove(doc))
      .catch((err) => console.log(err));

    showToast("error", "Successfully Deleted ", `HMS Grab: ${id}`);
  };

  return (
    <View>
      {list.length < 1 ? (
        <Text style={styles.addGrab}>Add Grabs</Text>
      ) : (
        <View>
          {list.map((item) => (
            <View style={styles.listItem} key={item.doc._id}>
              <Text style={styles.time}>{`${item.doc.Time}`}</Text>
              <Text>Sinks: {item.doc.Sinks}</Text>
              <Text style={styles.floats}>
                {item.doc.Floats === ""
                  ? "- No Floats"
                  : "Floats:" + item.doc.Floats}
              </Text>
              <Text>
                {item.doc.Cone === "" ? "- No Cone" : "Cone" + item.doc.Cone}
              </Text>
              <Pressable
                onPress={() => deleteItem(item.doc._id)}
                style={styles.close}
              >
                <Icon name="close" style={styles.closeIcon} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addGrab: {
    textAlign: "center",
    fontSize: 25,
    marginVertical: 25,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  close: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#29f",
    elevation: 5,
  },
  closeIcon: {
    fontSize: 15,
  },
  time: {
    position: "absolute",
    top: -10,
    left: -10,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    elevation: 5,
    backgroundColor: "#29f",
  },
  floats: {
    marginVertical: 5,
  },
});

export default HMSList;
