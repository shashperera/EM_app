<<<<<<< HEAD
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, StyleSheet, Button,View } from "react-native";


const App: () => Node = () => {
return(
  <View>
  <Text>Hi</Text>
  <Button title="OK"/>
  </View>

);
};

export default App;
=======
import React, { Component } from "react";
import { View, StyleSheet, Button, Alert,TextInput } from "react-native";
import Inputs from './Inputs.js'


const App = () => {

return (
      <Inputs />
   )
};

export default App;
>>>>>>> 7124c8d2a8292535ccd66172806f2adacbdab2d1
