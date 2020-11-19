import moment from "moment";
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Text } from "../components/Text";
import { useWeather } from "../contexts/app";

interface IProps {}

export const Sun: React.FunctionComponent<IProps> = (props) => {
  const { current } = useWeather();

  return (
    <View style={styles.container}>
      {current && (
        <View style={styles.currentWrapper}>
          <View style={styles.sunWrapper}>
            <Image
              style={styles.arrow}
              source={require("../../assets/up.png")}
            />

            <Text style={styles.time}>
              {moment.unix(current.sunrise).format("HH:mm")}
            </Text>
          </View>
          <View style={styles.sunWrapper}>
            <Image
              style={styles.arrow}
              source={require("../../assets/down.png")}
            />
            <Text style={styles.time}>
              {moment.unix(current.sunset).format("HH:mm")}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  currentWrapper: { width: "100%", flexDirection: "row", marginTop: 16 },
  sunWrapper: { flex: 1, flexDirection: "row", alignItems: "center" },
  arrow: {
    width: 8,
    height: 8,
    aspectRatio: 479 / 850,
    marginRight: 4,
  },
  time: { fontSize: 24 },
});
