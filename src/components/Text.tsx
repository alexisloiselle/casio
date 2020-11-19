import React from "react";
import { TextProps, Text as RNText, StyleSheet } from "react-native";

interface IProps extends TextProps {}

export const Text: React.FunctionComponent<IProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <RNText style={[style, styles.container]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "casio",
  },
});
