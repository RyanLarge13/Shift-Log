import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PouchDB from "pouchdb-react-native";
import Toast from "react-native-toast-message";
import EditLogModal from "./EditLogModal";
import DeleteItemModal from "./DeleteItemModal";

const LogList = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [itemId, setItemId] = useState("");
  const [defaultText, setDefaultText] = useState("");

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

  const deleteItem = async () => {
    DB.get(itemId)
      .then((doc) => DB.remove(doc))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setConfirm(false);
    showToast("error", "Successfully deleted log:", itemId);
  };

  const bringUpModal = (id, text) => {
    setDefaultText(text);
    setItemId(id);
    setEdit(true);
  };

  const setConfirmation = (id) => {
    setConfirm(true);
    setItemId(id);
  };

  const editItem = () => {
    DB.get(itemId)
      .then((doc) => {
        return DB.put({
          _id: itemId,
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
              <Text>{log.doc.Text}</Text>

              <Pressable
                style={styles.close}
                onPress={() => setConfirmation(log.doc._id)}
              >
                <Icon style={styles.closeIcon} name="close" />
              </Pressable>
              <Pressable
                onPress={() => bringUpModal(log.doc._id, log.doc.Text)}
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
      <EditLogModal
        updateText={(text) => setNewText(text)}
        text={defaultText}
        submit={editItem}
        modalView={edit}
        closeModal={() => setEdit(false)}
      />
      <DeleteItemModal
        confirm={confirm}
        deleteItem={deleteItem}
        closeModal={() => setConfirm(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "33%",
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
    backgroundColor: "#f00",
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
    backgroundColor: "#000",
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
    color: "#fff",
  },
});

export default LogList;
