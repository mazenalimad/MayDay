import { connect } from "react-redux";
import Animated from "react-native-reanimated";
import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Styles } from "../Styles";

import WifiAvaliableListItems from "../components/WifiAvaliableListItems";
import { useNavigationState } from "@react-navigation/native";
import wifiDetails from "../Dev-Data/WifiData";

const { width, height } = Dimensions.get("window");

const {
  container,
  scroll_container,
  song_artist_image_container,
  song_artist_name,
} = Styles;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RelatedSongs = ({ route, position }) => {
  const state = useNavigationState((s) => s);
  const songs = [];
  wifiDetails.forEach((val, index) => {
    songs.push(index);
  });
  

  const nav_index = state.routeNames.indexOf(route.name);

  // console.log("Nav State", state);
  // console.log("Route Params", route.params);
  // console.log("Nav Index", nav_index);

  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundColor = Animated.interpolateColors(scrollY, {
    inputRange: [0, 20],
    outputColorRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"],
    extrapolate: "clamp",
  });

  const translateX = Animated.interpolateNode(position, {
    inputRange: state.routeNames.map((_, i) => i),
    outputRange: state.routeNames.map((_, i) => (i - nav_index) * width),
    extrapolate: "clamp",
  });

  const opacity = Animated.interpolateNode(position, {
    inputRange: [nav_index - 0.8, nav_index, nav_index + 0.8],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <AnimatedFlatList
        style={{ minHeight: height }}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{ marginBottom: 25, marginTop: 110 }}>
                <TouchableOpacity style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      width: width * 0.7,
                      backgroundColor: "rgba(200,200,200,0.3)",
                      borderRadius: 8,
                    }}
                  >
                    جميع الشبكات المتاحه
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
        data={wifiDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <WifiAvaliableListItems
            SSID={item.SSID}
            Distence={item.Distence}
            index={index}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <Animated.View
        style={{
          height: 95,
          width,
          /* left: -20, */ position: "absolute",
          backgroundColor,
          transform: [{ translateX }],
          opacity,
        }}
      />
    </>
  );
};

function map_state_to_props({ app, songDetails }) {
  return {
    song: songDetails.song,
    loading_song: app.loading_song,
    playing_song: app.playing_song,
  };
}

export default connect(map_state_to_props)(RelatedSongs);
