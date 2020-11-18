import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import Top from "./src/top";
import Weather from "./src/weather";

export default function App() {
  const [fontsLoaded] = useFonts({
    digi: require("./assets/fonts/casio.ttf"),
    "digi-b": require("./assets/fonts/digib.ttf"),
    "digi-i": require("./assets/fonts/digii.ttf"),
    "digi-t": require("./assets/fonts/digit.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="#979F91" />
      <Top style={{ marginBottom: 32 }} />
      <Weather />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#979F91",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 48,
    paddingHorizontal: 24,
  },
});
