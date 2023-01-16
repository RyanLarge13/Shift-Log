import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PouchDB from "pouchdb-react-native";

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

  return (
    <View>
      {list.length > 0 ? 
        list.map((item, index) => (
          <View key={item.doc._id}>
            <Text>{item.doc.Cd3}</Text>
            <Text>{item.doc.Cd4}</Text>
            <Text>{item.doc.Grind}</Text>
            <Text>{mgos[index] ? mgos[index].doc.Mgo : "MgO - "}</Text>
          </View>
        )) : null}
    </View>
  );
};

export default ThreeAndFour;
