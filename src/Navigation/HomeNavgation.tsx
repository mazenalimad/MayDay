import React from "react";
import { View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { connect } from "react-redux";

import DistressNav from "./Home/SearchNavigator";
import HomeTabBar from "../components/HomeTabBart";
import Charts from "../Screens/Support";
import { Styles } from "../Styles";
import AboutUs from "../Screens/AboutUs";
import ManuleHotspot from "../Screens/ManuleHotspot";

const { width, height } = Dimensions.get("window");

const { container } = Styles;

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = ({
  listening,
  playing = null,
  loading = null,
  navigation,
}) => {
  return (
    <View style={container}>
      <Tab.Navigator
        lazy
        lazyPreloadDistance={1}
        initialLayout={{ width, height }}
        initialRouteName="Shazam"
        swipeEnabled={!listening}
        tabBar={(props) => <HomeTabBar {...props} />}
      >
        <Tab.Screen name="Library" component={ManuleHotspot} />
        <Tab.Screen name="Shazam" component={DistressNav} />
        <Tab.Screen name="Charts" component={Charts} />
      </Tab.Navigator>
    </View>
  );
};

function map_state_to_props({ shazam, app }) {
  return {
    listening: shazam.listening,
    loading_song: app.loading_song,
    playing_song: app.playing_song,
  };
}

export default connect(map_state_to_props)(HomeNavigator);
