import { View, Text, StyleSheet, Pressable, Modal } from "react-native";

const DeleteItemModal = ({ confirm, deleteItem, closeModal }) => {
  return (
    <Modal visible={confirm} animatiomType="slide" transparent={true}>
      <View style={styles.container}>
        <Text>Are You Sure?</Text>
        <View style={styles.btnContainer}>
          <Pressable style={styles.delete} onPress={deleteItem}>
            <Text>Yes</Text>
          </Pressable>
          <Pressable style={styles.cancel} onPress={closeModal}>
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "33%",
    borderRadius: 10,
    marginTop: "auto",
    backgroundColor: "#f0f",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  delete: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    marginRight: 15,
  },
  cancel: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
  },
});

export default DeleteItemModal;
