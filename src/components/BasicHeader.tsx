import React from "react";
import { View, Text } from "react-native";
import { Styles } from "../Styles";

const { basic_header_container, basic_header_text } = Styles;

const BasicHeader = ({ title = "Title" }) => {
  //controals the header of both charts and library
  return (
    <View style={basic_header_container}>
      <Text style={basic_header_text}>{"صفحة ألتعليمات "}</Text>
    </View>
  );
};

export default BasicHeader;
