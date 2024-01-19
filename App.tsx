/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./src/Reducers";
import { StatusBar, PixelRatio, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import ListDetailsNavigator from "./src/Navigation/ListDetailsNavigator";
import HomeNavgation from "./src/Navigation/HomeNavgation";
import { requestLocationPermission } from "./src/external/Permissions";
import { wifiScan } from "./src/external/WifiScan";
import wifiDetails from "./src/Dev-Data/WifiData";
import {
  setUpdateIntervalForType,
  SensorTypes,
  gyroscope,
  accelerometer,
} from "react-native-sensors";
import {
  HostoptCheckStatus,
  setHotspotEnable,
  setHotspotDisable,
} from "./src/external/HotsoptControler";

console.log("Pixel Ratio", PixelRatio.get());

const Stack = createStackNavigator();

const App = () => {
  setUpdateIntervalForType(SensorTypes.gyroscope, 100);
  useEffect(() => {
    const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
      if (x > 12   || x < -12 || y > 12 || y < -12 || z > 12 || z < -12)
        HostoptCheckStatus().then(
          (res) => {5
            setHotspotEnable();
          },
          (rej) => {}
        );
      //console.log({x, y, z, timestamp});
    });
  });

  useEffect(() => {
    requestLocationPermission().then(
      (res) => {},
      (rej) => {
        Alert.alert(
          "",
          "This could effect the preformence of the app , " + rej
        );
        requestLocationPermission();
      }
    );
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
          initialRouteName="Home"
          headerMode="none"
        >
          <Stack.Screen name="Home" component={HomeNavgation} />
          <Stack.Screen name="SongDetails" component={ListDetailsNavigator} />
        </Stack.Navigator>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0,0,0,0.2)"
        />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
