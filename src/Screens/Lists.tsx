import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Styles } from "../Styles";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

import Animated from "react-native-reanimated";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import WifiAvaliableListItems from "../components/WifiAvaliableListItems";
import wifiDetails, { clearWifiList } from "../Dev-Data/WifiData";
import { wifiScan } from "../external/WifiScan";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get("window");
const { song_artist_name } = Styles;

const SEARCH_BUTTON_SIZE = width * 0.175;

const { search_button_container, search_button_background } = Styles;

export interface wifiProps {
  items: {
    SSID: string;
    Distence: number;
  };
}

const Lists = ({ translateY, route }) => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [count, setcount] = useState(0);
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setcount(count + 1);
    }, 9000);
  }, [Loading]);

  const state = useNavigationState((s) => s);

  const songs: Array<number> = [];
  wifiDetails.forEach((val, index) => {
    songs.push(index);
  });
  console.log(songs);

  const scrollY = useRef(new Animated.Value(0)).current;

  const nav_index = state.routeNames.indexOf(route.name);

  return (
    <>
      <AnimatedFlatList
        style={{ minHeight: height, overflow: "visible" }}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{ marginBottom: 25, marginTop: 110 }}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={song_artist_name}>MayDay / اغاثة</Text>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                      console.log("pressed");
                    }}
                  >
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
                      اقرب الشبكات المتاحه
                    </Text>
                  </TouchableOpacity>

                  <View style={search_button_container}>
                    <View style={[search_button_background]} />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        clearWifiList();
                        setcount(count + 1);
                        ToastAndroid.showWithGravity(
                          "Wait 3 seconed for the refresh",
                          2000,
                          200
                        );
                        setTimeout(() => {
                          nav.navigate("Listening");
                        }, 3000);
                      }}
                    >
                      <IonIcons
                        name="ios-search-circle"
                        color="rgb(20, 150, 255)"
                        size={SEARCH_BUTTON_SIZE}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      marginTop: 30,
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
                    {" "}
                    All avalabile wifi list
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
        data={wifiDetails}
        keyExtractor={(items, index) => index.toString()}
        renderItem={({ item, index }) => (
          <WifiAvaliableListItems
            SSID={item.SSID}
            Distence={item.Distence}
            index={index}
            state={Loading}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <Animated.View style={{ transform: [{ translateY }] }} />
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

export default connect(map_state_to_props)(Lists);
