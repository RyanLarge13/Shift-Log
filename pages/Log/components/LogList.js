import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PouchDB from "pouchdb-react-native";
import Toast from "react-native-toast-message";

const LogList = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState("");
  const [confirm, setConfirm] = useState(false);

  const DB = new PouchDB("log");
  const todaysDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
  });

  useEffect(() => {
    DB.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((res) => {
        setAllLogs(res.rows);
      })
      .catch((err) => console.log(err));
  }, [allLogs]);

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  const deleteItem = async (id) => {
    DB.get(id)
      .then((doc) => DB.remove(doc))
      .catch((err) => console.log(err));

setConfirm(false)
    showToast("error", "Successfully deleted log:", id);
  };

  const editItem = (id) => {
    DB.get(id)
      .then((doc) => {
        return DB.put({
          _id: id,
          _rev: doc._rev,
          Time: doc.Time,
          Text: newText,
        });
      })
      .catch((err) => console.log(err));
    setEdit(false);
    showToast("success", "Successfully Edited", null);
  };

  return (
    <View>
      <Text style={styles.title}>Log List</Text>
      <Text style={styles.date}>{todaysDate}</Text>
      <View style={styles.container}>
        {allLogs.length > 0 ? (
          allLogs.map((log) => (
            <View key={log.doc._id} style={styles.listItem}>
              <Text>{log.doc.Time}</Text>
              {edit ? (
                <View>
                  <TextInput
                    placeholder="Edit"
                    defaultValue={log.doc.Text}
                    onChangeText={(text) => setNewText(text)}
                  />
                  <Pressable onPress={() => editItem(log.doc._id)}>
                    <Text>Submit</Text>
                  </Pressable>
                </View>
              ) : (
                <Text>{log.doc.Text}</Text>
              )}
              {confirm ? (
                <View>
                  <Text>Are You Sure?</Text>
                  <Pressable onPress={() => deleteItem(log.doc._id)}>
                    <Text>Yes</Text>
                  </Pressable>
                  <Pressable onPress={() => setConfirm(false)}>
                    <Text>No</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={styles.close}
                  onPress={() => setConfirm(true)}
                >
                  <Icon style={styles.closeIcon} name="close" />
                </Pressable>
              )}
              <Pressable
                onPress={() => (edit ? setEdit(false) : setEdit(true))}
                style={styles.edit}
              >
                <Icon style={styles.editIcon} name="edit" />
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.listTitle}>Start Your Log</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 500,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginVertical: 15,
    marginTop: 100,
  },
  date: {
    textAlign: "center",
    fontSize: 15,
    marginVertical: 5,
    marginBottom: 50,
  },
  listTitle: {
    fontSize: 15,
    marginTop: 50,
  },
  listItem: {
    minWidth: "95%",
    maxWidth: "95%",
    marginVertical: 15,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
  close: {
    backgroundColor: "#b300f0",
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -12,
    right: -12,
    elevation: 5,
  },
  closeIcon: {
    fontSize: 15,
    color: "#fff",
  },
  edit: {
    backgroundColor: "#f0f",
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -12,
    left: -12,
    elevation: 5,
  },
  editIcon: {
    fontSize: 15,
    color: "#000",
  },
});

export default LogList;
