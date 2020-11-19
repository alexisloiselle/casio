import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Text } from "../components/Text";
import { Wrapper } from "../wrapper";
import { useLocation } from "../contexts/app";

export const Location: React.FunctionComponent = () => {
  const { object: location, loading } = useLocation();

  return (
    <Wrapper>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color="#000" size={24} />
        ) : (
          <>
            <Text style={styles.text}>{location?.coords.latitude}</Text>
            <Text style={styles.text}>{location?.coords.longitude}</Text>
          </>
        )}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#979F91",
    padding: 24,
    borderRadius: 12,
    height: 69.3,
    justifyContent: "center",
  },
  text: { fontSize: 32, flex: 1 },
});
