import { PermissionsAndroid} from "react-native";


export function requestLocationPermission () : Promise<boolean> {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    )
   let status = granted.then(res=>{ return true},rej=>{return false})
   return status
};

