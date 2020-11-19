import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AppProvider } from "./src/contexts/app";
import { Ip } from "./src/ip";
import { Location } from "./src/location";
import { Top } from "./src/top";
import { Weather } from "./src/weather";

export default function App() {
  const [fontsLoaded] = useFonts({
    casio: require("./assets/fonts/casio.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000" />
        <Top />
        <Weather />
        <Ip />
        <Location />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 48,
    paddingHorizontal: 8,
  },
});
