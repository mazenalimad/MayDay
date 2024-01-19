import { ToastAndroid } from "react-native";
import HotspotManager, {
  Device,
  TetheringError,
} from "@react-native-tethering/hotspot";

export const HostoptCheckStatus = async () => {
  try {
    const state = await HotspotManager.isHotspotEnabled();
    ToastAndroid.show(`Hotspot state: ${state}`, ToastAndroid.SHORT);
    return true;
  } catch (error) {
    if (error instanceof TetheringError) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
    console.log(error);
    return false;
  }
};

export const setHotspotEnable = async () => {
  try {
    await HotspotManager.setHotspotEnabled(true);
    ToastAndroid.show("Hotspot Enabled", ToastAndroid.SHORT);
  } catch (error: any) {
    if (error instanceof TetheringError) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
    console.log(error);
  }
};

export const setHotspotDisable = async () => {
  try {
    await HotspotManager.setHotspotEnabled(false);
    ToastAndroid.show("Hotspot Disabled", ToastAndroid.SHORT);
  } catch (error: any) {
    if (error instanceof TetheringError) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
    console.log(error);
  }
};
