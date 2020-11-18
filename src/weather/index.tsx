import Axios from "axios";
import React from "react";
import { ActivityIndicator, Text, View, ViewStyle } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import moment from "moment";

const API_KEY = Constants.manifest.extra.openWeatherApiKey;

interface IProps {
  style?: ViewStyle;
}

const Weather: React.FunctionComponent<IProps> = ({ style }) => {
  const [
    location,
    setLocation,
  ] = React.useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [currentWeather, setCurrentWeather] = React.useState<any>(undefined);
  const [forecast, setForecast] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  React.useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await Axios.request({
          method: "GET",
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${API_KEY}`,
        });
        setCurrentWeather(response?.data?.current);
        setForecast(response?.data?.daily);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return loading ? (
    <ActivityIndicator color="#000" size={72} />
  ) : (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        ...style,
      }}
    >
      <Text style={{ fontFamily: "casio", fontSize: 72 }}>
        {typeof currentWeather?.temp === "number" &&
          Math.round(currentWeather?.temp)}
      </Text>
      {forecast?.slice(0, 4)?.map((day, index) => (
        <View key={day.dt} style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "casio",
              fontSize: 32,
            }}
          >
            {moment.unix(day?.dt).format("dddd").substring(0, 2).toUpperCase()}
          </Text>
          <Text
            key={index}
            style={{
              marginTop: 8,
              fontFamily: "casio",
              fontSize: 32,
            }}
          >
            {typeof day?.temp?.day === "number" && Math.round(day?.temp?.day)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Weather;
