import React from "react";
import { View, Text, Image, StyleSheet, Alert, Dimensions } from "react-native";
import { connect } from "react-redux";
import { show_options_sheet } from "../Actions";
import { Styles } from "../Styles";
import SearchAnimation from "./MenuSearchAnimation";

const {} = Styles;

interface Props {
  SSID: string;
  Distence: number;
  index: number;
  state: boolean;
}

const { height, width } = Dimensions.get("window");

const WifiAvaliableList = ({
  SSID = "",
  Distence,
  index,
  state = false,
}: Props) => {
  let colorState = "white";

  if (Distence < 30) {
    colorState = "rgba(136,244,24,1))";
  } else if (Distence >= 30 && Distence <= 50) {
    colorState = "rgba(91,152,27,1)";
  } else if (Distence > 50 && Distence < 60) {
    colorState = "rgba(87,123,49,1)";
  } else if (Distence > 60 && Distence < 70) {
    colorState = "rgba(120,127,113,1)";
  } else if (Distence > 70 && Distence < 80) {
    colorState = "rgba(134,57,57,1)";
  } else {
    colorState = "rgba(208,0,0,1)";
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopColor: "rgba(200,200,200,0.1)",
        borderTopWidth: index && 1,
      }}
    >
      <View
        style={{
          paddingVertical: 12,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ marginRight: 40 }}>
          <Image
            source={require("../Assets/Images/Edit.jpg")}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            {state && <SearchAnimation song_loading={state} size={25} />}
          </View>
        </View>

        <View>
          <Text
            onPress={() => {
              Alert.alert(
                "Sorry for the incovince we didn't had time to reach here",
                "on pressing this container it was supposed to keep track of this specifc SSID : " +
                  SSID,
                [{ text: "close" }]
              );
            }}
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              flex: 1,
            }}
            ellipsizeMode="head"
          >
            {SSID.length > 23 ? SSID.slice(0, 21) + "...." : SSID}
          </Text>
          <Text
            style={{
              color: "rgba(200,200,200,1)",
              fontSize: 12,
              width: width / 2,
            }}
          >
            {Distence < 30
              ? "فريب جدا جدا اقل من مترين"
              : Distence >= 30 && Distence <= 50
              ? "المسافة قريبه جدا مابين مترين الي اربعة امتار في نطاقك"
              : Distence > 50 && Distence < 60
              ? "المسافة فريبه مابين 6 و 8 امتار"
              : Distence > 60 && Distence < 70
              ? "المسافة متوسطه مابين 9 الي 10 امتار"
              : Distence > 70 && Distence < 80
              ? "المسافو بعيدة او هناك حواجز كثيره "
              : "المسافة بعيده جدا و لا يمكن رصد النقطة باستمرار او بدقة"}
          </Text>
        </View>
      </View>

      {}

      <View
        style={{ padding: 13, backgroundColor: colorState, borderRadius: 30 }}
      >
        <Text style={{ color: "white" }}>
          {Distence < 30
            ? ">2 M"
            : Distence >= 30 && Distence <= 50
            ? "4-2 M"
            : Distence > 50 && Distence < 60
            ? "6-8 M"
            : Distence > 60 && Distence < 70
            ? "9-10 M"
            : Distence >= 70 && Distence < 80
            ? "10-15M"
            : "?"}
        </Text>
      </View>
    </View>
  );
};

export default connect(null, { show_options_sheet })(WifiAvaliableList);
