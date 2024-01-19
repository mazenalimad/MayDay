import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicHeader from "../components/BasicHeader";
import { Styles } from "../Styles";
import SupportList from "../components/SupportList";
import CHARTS from "../Dev-Data/charts";

const {
  container,
  scroll_container,
  charts_image_background,
  chart_button_container,
  chart_button,
  chart_button_text,
} = Styles;

const Support = () => {
  return (
    <SafeAreaView edges={["top"]} style={container}>
      <BasicHeader title="Support" />
      <ScrollView style={container} contentContainerStyle={scroll_container}>
        <Image
          source={require("../Assets/Images/purple-world-map.png")}
          style={charts_image_background}
        />
        <View style={chart_button_container}>
          <TouchableOpacity style={chart_button}>
            <Text style={chart_button_text}>
              All the World stand with PALESTINE
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: chart_button_container.color,
              fontSize: chart_button_container.fontSize,
              fontWeight: chart_button_container.fontWeight,
            }}
          >
            FROM YEMEN
          </Text>
        </View>
        {CHARTS.map((chart, i) => {
          return (
            <SupportList
              chartName={chart.name}
              chartEntries={chart.entries}
              chartTarget={chart.target}
              key={i.toString()}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Support;
