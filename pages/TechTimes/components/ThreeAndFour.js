import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PouchDB from "pouchdb-react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

const ThreeAndFour = () => {
  const [list, setList] = useState([]);
  const [mgos, setMgos] = useState([]);

  const threeAndFourDB = new PouchDB("furnaceThreeFour");
  const mgoDB = new PouchDB("mgo");

  useEffect(() => {
    threeAndFourDB
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then((res) => setList(res.rows))
      .catch((err) => console.log(err));

    mgoDB
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then((res) => setMgos(res.rows))
      .catch((err) => console.log(err));
  }, [mgos]);

  const showToast = (type, message, message2) => {
    Toast.show({
      type: type,
      text1: message,
      text2: message2,
    });
  };

  const deleteItem = (mgoId, furnaceId) => {
    mgoDB
      .get(mgoId)
      .then((doc) => mgoDB.remove(doc))
      .catch((err) => console.log(err));

    threeAndFourDB
      .get(furnaceId)
      .then((doc) => threeAndFourDB.remove(doc))
      .catch((err) => console.log(err));
      
      showToast("error", "Successfully deleted 3&4 Furnace Tech Times and MgO", `MgO: ${mgoId}, Tech Time: ${furnaceId}`)
  };

  return (
    <View style={styles.container}>
      {list.length > 0
        ? list.map((item, index) => (
            <View style={styles.item} key={item.doc._id}>
              <Text>{item.doc.Cd3}</Text>
              <Text>{item.doc.Cd4}</Text>
              <Text>{item.doc.Grind}</Text>
              <Text>{mgos[index] ? mgos[index].doc.Mgo : "MgO - "}</Text>
              <Pressable
                onPress={() => {
                  deleteItem(
                    mgos[index] ? mgos[index].doc._id : null,
                    item.doc._id
                  );
                }}
                style={styles.close}
              >
                <Icon name="close" />
              </Pressable>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "80%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginVertical: 15,
    width: "90%",
  },
  close: {
    backgroundColor: "#f00",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    position: "absolute",
    right: -5,
    top: -5,
    elevation: 5,
  },
});

export default ThreeAndFour;
