import moment from "moment";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../components/Text";
import { Wrapper } from "../wrapper";

export const Top: React.FunctionComponent = () => {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <View style={styles.container}>
        <View>
          <View style={styles.topRow}>
            <Text style={styles.topRowItem}>
              {moment(time).format("dddd").substring(0, 2).toUpperCase()}
            </Text>
            <Text style={styles.topRowItem}>
              {moment(time).format("DD").substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.hoursMinutes}>
              {moment(time).format("HH:mm")}
            </Text>
            <Text style={styles.seconds}>{moment(time).format("ss")}</Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#979F91",
    padding: 24,
    borderRadius: 12,
    flexDirection: "row",
    width: "100%",
  },
  topRow: { flexDirection: "row", marginBottom: 12 },
  topRowItem: {
    fontSize: 36,
    flex: 1,
    textAlign: "right",
  },
  bottomRow: { flexDirection: "row", alignItems: "baseline" },
  hoursMinutes: { fontSize: 104, marginRight: 4 },
  seconds: { fontSize: 72 },
});
