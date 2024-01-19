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

const Home = ({ navigation, set_listening }) => {
  useEffect(() => {
    pusle_animation.start();
  }, []);

  const onPressShazam = () => {
    console.log("Shazam Pressed");
    navigation.navigate("Listening");
    set_listening(true);
  };

  const onPressInShazam = () => {
    console.log("Shazam Pressed In");
    pusle_animation.stop();
    press_in_animation.reset();
    press_in_animation.start();
  };

  const onPressOutShazam = () => {
    console.log("Shazam Pressed Out");
    press_in_animation.stop();
    pusle_animation.reset();
    pusle_animation.start();
  };

  return (
    <ScrollView style={[container]} contentContainerStyle={scroll_container}>
      <LinearGradient
        style={[container, home_gradient]}
        /* colors={["white", "white"]} */ colors={[
          "rgba(169,41,41,0.9)",
          "rgba(107,13,13,1)",
          "rgba(0,0,0,1)",
        ]}
      >
        <Text style={[home_text, action_text]}>اضغط للبحث</Text>

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
              name="search"
              color="white"
              size={120}
              style={{ transform: [{ scale }] }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            top: 60,
            left: 25,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Library");
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color="white"
              size={NAV_BUTTONS_SIZE}
            />
          </TouchableOpacity>
          <Text style={{ color: "white" }}>حولنا</Text>
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
                navigation.navigate("Charts");
              }}
            >
              <MaterialIcons
                name="info"
                color="white"
                size={NAV_BUTTONS_SIZE - 5}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white" }}>التعليمات</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default connect(null, { set_listening })(Home);
