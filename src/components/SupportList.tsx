import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Styles } from "../Styles";

const { chart_list_container, chart_entry } = Styles;

interface Props {
  chartName: string;
  chartEntries: Array<object>;
  chartTarget: string;
}

const SupportList = (props: Props) => {
  return (
    <View style={chart_list_container}>
      <TouchableOpacity>
        <Text style={{ fontSize: 13, fontStyle: "italic", fontWeight: "800" }}>
          {" " + props.chartName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 3,
            paddingVertical: 8,
          }}
        >
          {props.chartTarget && (
            <Text
              style={{
                color: chart_entry.color,
                fontSize: 14,
                marginBottom: 10,
                fontStyle: "italic",
              }}
            >
              {" " + props.chartTarget}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {props.chartEntries.map((items, index) => (
        <View style={{ marginBottom: 10 }} key={index.toString()}>
          <Text style={{ fontSize: 18 }}>{`\u2043  ${items.key}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default connect(null, {})(SupportList);
