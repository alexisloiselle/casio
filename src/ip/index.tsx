import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../components/Text";
import * as Network from "expo-network";
import Axios from "axios";
import { Wrapper } from "../wrapper";

export const Ip: React.FunctionComponent = () => {
  const [publicIp, setPublicIp] = React.useState<string | null>(null);
  const [localIp, setLocalIp] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      setLocalIp(await Network.getIpAddressAsync());
    })();
    (async () => {
      setPublicIp((await Axios.get("https://api.ipify.org")).data);
    })();
  }, []);

  return (
    <Wrapper>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, flex: 1 }}>{localIp}</Text>
        <Text style={{ fontSize: 32, flex: 1 }}>{publicIp}</Text>
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
  },
});
