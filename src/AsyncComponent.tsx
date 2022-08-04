import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const AsyncComponent = () => {
  const [count, setCount] = React.useState(0);

  const handlePress = () => {
    setTimeout(() => setCount((c) => c + 1), 10);
  };

  return (
    <View>
      <TouchableOpacity testID="button" onPress={handlePress}>
        <Text>Increase</Text>
      </TouchableOpacity>

      <Text testID="output">Count: {count}</Text>
    </View>
  );
};
