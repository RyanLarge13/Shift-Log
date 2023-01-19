import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import PouchDB from "pouchdb-react-native";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const DB = new PouchDB("todos");

  useEffect(() => {
    DB.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((res) => setTodos(res.rows))
      .catch((err) => console.log(err));
  }, [todos]);

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  const deleteTodo = (id) => {
    DB.get(id)
      .then((doc) => DB.remove(doc))
      .catch((err) => console.log(err));

    showToast("error", "Successfully Deleted Todo: ", id);
  };

  return (
    <View style={styles.container}>
      {todos.length < 1
        ? ""
        : todos.map((todo) => (
            <View style={styles.todo} key={todo.doc._id}>
              <Text style={styles.text}>{todo.doc.Text}</Text>
              <Pressable
                style={styles.close}
                onPress={() => deleteTodo(todo.doc._id)}
              >
                <Icon style={styles.closeIcon} name="close" />
              </Pressable>
            </View>
          ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    minHeight: 200,
  },
  todo: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  close: {
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#f00",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 20,
  },
});

export default TodoList;
