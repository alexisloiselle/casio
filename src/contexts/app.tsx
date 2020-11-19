import React, { useContext } from "react";
import * as Location from "expo-location";
import Axios from "axios";
import Constants from "expo-constants";

const API_KEY = Constants.manifest.extra.openWeatherApiKey;

export type AppContextType = {
  location: {
    loading: boolean;
    object?: Location.LocationObject;
  };
  weather: {
    loading: boolean;
    current?: {
      dt: number;
      temp: number;
      feels_like: number;
      sunrise: number;
      sunset: number;
    };
    daily?: {
      dt: number;
      temp: {
        day: number;
      };
      feels_like: {
        day: number;
      };
    }[];
  };
};

const AppContext = React.createContext<AppContextType>({
  location: { loading: false },
  weather: { loading: false },
});

export const useWeather = () => {
  const { weather } = useContext(AppContext);
  return weather;
};

export const useLocation = () => {
  const { location } = useContext(AppContext);
  return location;
};

interface IProps {
  children: React.ReactNode;
}

export const AppProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [location, setLocation] = React.useState<AppContextType["location"]>({
    loading: true,
  });

  const [weather, setWeather] = React.useState<AppContextType["weather"]>({
    loading: true,
  });

  React.useEffect(() => {
    const fetchLocation = async () => {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({});
      setLocation({ loading: false, object: location });
    };

    fetchLocation();
    setInterval(fetchLocation, 10000);
  }, []);

  React.useEffect(() => {
    if (!location.object) return;

    const fetchWeather = async () => {
      try {
        const response = await Axios.request({
          method: "GET",
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.object?.coords.latitude}&lon=${location.object?.coords.longitude}&units=metric&appid=${API_KEY}`,
        });
        setWeather({ ...response.data, loading: false });
      } catch (e) {
        console.log(e);
        setWeather({ loading: false });
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        location,
        weather,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
