import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Home from "../../Screens/Home";
import Listening from "../../Screens/Listening";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Main" headerMode="none">
      <Stack.Screen name="Main" component={Home} />
      <Stack.Screen name="Listening" component={Listening} />
    </Stack.Navigator>
  );
};
