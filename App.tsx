import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AsyncComponent } from "./src/AsyncComponentRN";

let duration = 0;
let count = 0;
const handleRender = (id, phase, actualDuration, ...rest) => {
  console.log("onRender ", id, phase, actualDuration, ...rest);
  duration += actualDuration;
  count += 1;
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <React.Profiler id="AsyncComponent" onRender={handleRender}>
        <AsyncComponent />
      </React.Profiler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
