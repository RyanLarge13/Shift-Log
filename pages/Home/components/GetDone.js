import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import {
  odd,
  even,
  measurementsHour,
  endOfShift,
} from "../../../constants/hourlyReminders.js";

const GetDone = () => {
  const [reminders, setReminders] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    check(hour);
  }, []);

  const check = (hour) => {
    if (hour === 4 || hour === 16) setReminders(endOfShift);
    if (hour === 2 || hour === 14) setReminders(measurementsHour);
    if (hour % 2 === 0) setReminders(even);
    if (hour % 2 !== 0) setReminders(odd);
  };

  return (
    <View style={styles.container}>
      {reminders ? (
        reminders.map((item, index) => (
          <View key={index} style={styles.reminder}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.reminder}</Text>
          </View>
        ))
      ) : (
        <ActivityIndicator color="f0f" size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  reminder: {
    marginVertical: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  desc: {},
});

export default GetDone;
