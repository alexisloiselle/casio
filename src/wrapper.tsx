import React from "react";
import { View } from "react-native";

interface IProps {}

export const Wrapper: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <View
      style={{
        padding: 4,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 16,
        marginBottom: 16,
        width: "100%",
      }}
    >
      {children}
    </View>
  );
};
