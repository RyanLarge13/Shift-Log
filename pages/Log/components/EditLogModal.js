import { useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";

const EditLogModal = ({ updateText, text, submit, modalView, closeModal }) => {
  return (
    <Modal animationType="slide" visible={modalView} transparent={true}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          defaultValue={text}
          onChangeText={(text) => updateText(text)}
        />
        <View style={styles.btnContainer}>
          <Pressable onPress={submit} style={styles.submit}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={closeModal} style={styles.submit}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f",
    elevation: 5,
    borderRadius: 10,
    marginTop: "auto",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    marginBottom: 25,
    elevation: 5,
  },
  btnContainer: {
    flexDirection: "row",
  },
  submit: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
    width: "35%",
    alignItems: "center",
  },
});

export default EditLogModal;
