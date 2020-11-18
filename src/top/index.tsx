import moment from "moment";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

interface IProps {
  style?: ViewStyle;
}

const Top: React.FunctionComponent<IProps> = ({ style }) => {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <View style={style}>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <Text
          style={{
            fontFamily: "digi",
            fontSize: 36,
            flex: 1,
            textAlign: "right",
          }}
        >
          {moment(time).format("dddd").substring(0, 2).toUpperCase()}
        </Text>
        <Text
          style={{
            fontFamily: "digi",
            fontSize: 36,
            flex: 1,
            textAlign: "right",
          }}
        >
          {moment(time).format("DD").substring(0, 2).toUpperCase()}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text style={{ fontSize: 104, fontFamily: "digi", marginRight: 4 }}>
          {moment(time).format("HH:mm")}
        </Text>
        <Text style={{ fontSize: 72, fontFamily: "digi" }}>
          {moment(time).format("ss")}
        </Text>
      </View>
    </View>
  );
};

export default Top;
