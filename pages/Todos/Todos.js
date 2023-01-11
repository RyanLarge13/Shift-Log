import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import PouchDB from "pouchdb-react-native";
import Toast from "react-native-toast-message";
import TodoList from "./components/TodoList";

const Todos = () => {
  const [text, setText] = useState("");
  const DB = new PouchDB("todos");

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  const addTodo = () => {
    if (text === "") return showToast("error", "You Must Give Context!", "📃");
    const id = Math.floor(Math.random(628) * 2648).toString();
    const newTodo = {
      _id: id,
      Text: text,
    };
    DB.put(newTodo)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));

    showToast("success", "Successfully Added Todo", null);
    setText("")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo's</Text>
      <TextInput
        style={styles.input}
        placeholder="Todo"
        defaultValue={text}
        onChangeText={(text) => setText(text)}
      />
      <Pressable style={styles.add} onPress={addTodo}>
        <Text>Add</Text>
      </Pressable>
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    marginVertical: 50,
  },
  input: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  add: {
    alignSelf: "center",
    marginVertical: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#f0f",
  },
});

export default Todos;
