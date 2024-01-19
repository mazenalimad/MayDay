import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import FontistoIcons from "react-native-vector-icons/Fontisto";

const SearchAnimation = ({
  size,
  backgroundColor = "rgba(0,0,0,0.8)",
  song_loading = false,
  foregroundColor = "white",
  playing = false,
}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size,
          overflow: "hidden",
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {song_loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <FontistoIcons
            name={playing ? "pause" : "play"}
            color={foregroundColor}
            size={size / 2.5}
            style={{ position: "relative", left: playing ? 0 : size * 0.05 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchAnimation;
