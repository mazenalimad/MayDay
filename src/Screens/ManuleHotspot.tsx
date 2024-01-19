import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Styles } from "../Styles";
import { set_listening } from "../Actions";
import { connect } from "react-redux";
import { wifiScan } from "../external/WifiScan";
import {
  HostoptCheckStatus,
  setHotspotEnable,
  setHotspotDisable,
} from "../external/HotsoptControler";

const {
  container,
  shazam_button_container,
  shazam_button_hole,
  shazam_button_background,

  scroll_container,
  home_gradient,
  home_text,
  action_text,
} = Styles;

const NAV_BUTTONS_SIZE = 30;

const AnimatedFontistoIcons = Animated.createAnimatedComponent(FontistoIcons);

const scale = new Animated.Value(1);

const pusle_animation = Animated.loop(
  Animated.sequence([
    Animated.timing(scale, {
      toValue: 1.05,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
  ])
);

const press_in_animation = Animated.loop(
  Animated.sequence([
    Animated.timing(scale, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 0.75,
      duration: 1000,
      useNativeDriver: true,
    }),
  ])
);

const MnauelHotpost = ({ navigation, set_listening }) => {
  useEffect(() => {
    pusle_animation.start();
  }, []);

  const onPressShazam = () => {
    HostoptCheckStatus().then(
      (res) => {
        setHotspotEnable();
      },
      (rej) => {
        setHotspotDisable();
      }
    );
    console.log("Hotspot");
  };
  
  const onPressInShazam = () => {
    pusle_animation.stop();
    press_in_animation.reset();
    press_in_animation.start();
  };

  const onPressOutShazam = () => {
    press_in_animation.stop();
    pusle_animation.reset();
    pusle_animation.start();
  };

  return (
    <ScrollView style={[container]} contentContainerStyle={scroll_container}>
      <LinearGradient
        style={[container, home_gradient]}
        /* colors={["white", "white"]} */ colors={[
          "rgba(5,40,45,0.9866071428571429)",
          "rgba(13,121,96,1) ",
          "rgba(11,103,66,1)",
        ]}
      >
        <Text style={[home_text, action_text]}>اضغط لتشغيل HotSpot يدوياَ</Text>

        <View style={shazam_button_container}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 40,
            }}
            activeOpacity={1}
            onPress={onPressShazam}
            onPressIn={onPressInShazam}
            onPressOut={onPressOutShazam}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.1)"]}
              locations={[0, 0.001, 0.5]}
              style={shazam_button_hole}
            />
            <Animated.View
              style={[shazam_button_background, { transform: [{ scale }] }]}
            />

            <AnimatedFontistoIcons
              name="wifi"
              color="white"
              size={120}
              style={{ transform: [{ scale }] }}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              color: "white",
              marginTop: 200,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            {
              " لكي يعمل ال HOTSPOT يجب عليك منحه الاذون التاليه من ادارة التطبيقات ثم اختيار التطبيق و اختيار التعديل على اعدادات النظام ثم سماح "
            }
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            top: 60,
            right: 25,
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: NAV_BUTTONS_SIZE,
              width: NAV_BUTTONS_SIZE,
              height: NAV_BUTTONS_SIZE,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Main");
              }}
            >
              <MaterialIcons
                name="arrow-right-alt"
                color="white"
                size={NAV_BUTTONS_SIZE - 5}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white" }}>الرئيسيه</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default connect(null, { set_listening })(MnauelHotpost);
