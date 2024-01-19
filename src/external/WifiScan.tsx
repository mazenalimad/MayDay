import { requestLocationPermission } from "./Permissions";
import WifiManager from "react-native-wifi-reborn";
import RNRestart from "react-native-restart";
import { Alert, ToastAndroid } from "react-native";
import wifiDetails from "../Dev-Data/WifiData";

export function wifiScan() {
  requestLocationPermission().then(
    (res) => {
      if (res == true) {
        WifiManager.reScanAndLoadWifiList().then(
          (res) => {
            res.map((items) => {
              const name = items.SSID;
              const Distence = Math.abs(items.level);

              wifiDetails.push({ SSID: name, Distence: Distence });

              // if (Math.abs(items.level) <= 40) {
              //   console.log(
              //     "SSID: " +
              //       items.SSID +
              //       "\t distence: VERY VERY CLOSE " +
              //       "\t level: " +
              //       items.level
              //   );
              // } else if (
              //   Math.abs(items.level) > 40 &&
              //   Math.abs(items.level) < 50
              // ) {
              //   console.log(
              //     "SSID: " +
              //       items.SSID +
              //       "\t distence: Very close" +
              //       "\t level: " +
              //       items.level
              //   );
              // } else if (
              //   Math.abs(items.level) > 50 &&
              //   Math.abs(items.level) < 60
              // ) {
              //   console.log(
              //     "SSID: " +
              //       items.SSID +
              //       "\t distence: Some how close" +
              //       "\t level: " +
              //       items.level
              //   );
              // } else if (
              //   Math.abs(items.level) > 60 &&
              //   Math.abs(items.level) < 70
              // ) {
              //   console.log(
              //     "SSID: " +
              //       items.SSID +
              //       "\t distence: Medium" +
              //       "\t level: " +
              //       items.level
              //   );
              // } else if (
              //   Math.abs(items.level) > 70 &&
              //   Math.abs(items.level) < 90
              // ) {
              //   console.log(
              //     "SSID: " +
              //       items.SSID +
              //       "\t distence: Very far" +
              //       "\t level: " +
              //       items.level
              //   );
              // } else if (Math.abs(items.level) > 90) {
              //   console.log(
              //     "BSSID: " +
              //       items.BSSID +
              //       "SSID: " +
              //       items.SSID +
              //       "\t distence: Out of range move around to get a better connection" +
              //       "\t level: " +
              //       items.level
              //   );
              // }
            });
          },
          (rej) => {
            console.log(
              rej +
                "Something went Wrong please try again or close and reopen the app"
            );
          }
        );
      }
    },
    (rej) => {
      ToastAndroid.show(rej, ToastAndroid.SHORT);
      Alert.alert("No Location Permission", "Please reconnect!", [
        {
          text: "Reload App",
          onPress: () => RNRestart.restart(),
        },
      ]);
    }
  );
  // setTimeout(() => {
  //   setCount(count + 1);
  // }, 5000);
}
