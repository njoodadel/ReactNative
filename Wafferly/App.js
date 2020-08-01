import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationComp from './component/NavigationComp';
export default function App() {
  console.disableYellowBox = true;
  return (

    <View style={styles.container}>
      {/* <Nav /> */}
      <NavigationComp></NavigationComp>
      {/* <Test></Test> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
