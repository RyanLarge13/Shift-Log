import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
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
    <View>
      {reminders ? (
        reminders.map((item, index) => (
          <View key={index}>
            <Text>{item.reminder}</Text>
          </View>
        ))
      ) : (
        <ActivityIndicator color="f0f" size="large" />
      )}
    </View>
  );
};

export default GetDone;
