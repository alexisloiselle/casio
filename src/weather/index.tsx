import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";
import moment from "moment";
import { Text } from "../components/Text";
import { Sun } from "../sun";
import { Wrapper } from "../wrapper";
import { useWeather } from "../contexts/app";

interface IProps {
  style?: ViewStyle;
}

export const Weather: React.FunctionComponent<IProps> = ({ style }) => {
  const { loading, current, daily } = useWeather();

  return (
    <Wrapper>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color="#000" size={72} />
        ) : (
          <>
            <View style={[styles.contentWrapper, style]}>
              <View style={styles.row}>
                <Text style={styles.currentWeather}>
                  {typeof current?.temp === "number" &&
                    Math.round(current?.temp)}
                </Text>
                <Text style={styles.font24}>
                  {typeof current?.temp === "number" &&
                    Math.round(current?.feels_like)}
                </Text>
              </View>
              {daily?.slice(0, 4)?.map((day) => (
                <View key={day.dt} style={styles.dailyWrapper}>
                  <Text style={styles.font32}>
                    {moment
                      .unix(day?.dt)
                      .format("dddd")
                      .substring(0, 2)
                      .toUpperCase()}
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.dayTemp}>
                      {typeof day?.temp?.day === "number" &&
                        Math.round(day?.temp?.day)}
                    </Text>
                    <Text style={styles.dayFeels}>
                      {typeof day?.temp?.day === "number" &&
                        Math.round(day?.feels_like?.day)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <Sun />
          </>
        )}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#979F91",
    padding: 24,
    borderRadius: 12,
    height: 130.7,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  row: { flexDirection: "row" },
  currentWeather: { fontSize: 72, marginRight: 4 },
  font24: { fontSize: 24 },
  dailyWrapper: { alignItems: "center" },
  font32: { fontSize: 32 },
  dayTemp: {
    marginTop: 8,
    fontSize: 32,
    marginRight: 4,
  },
  dayFeels: {
    marginTop: 8,
    fontSize: 16,
  },
});
