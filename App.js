import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CameraCapture from './screens/CameraCapture';
import Seemore from './screens/Seemore';
import Splash from './components/Splash';
import Limit from './screens/Limit';

import RegisterScreen from './screens/RegisterScreen';
import AddScreen from './screens/AddScreen';
import UpdateScreen from './screens/UpdateScreen';
import AllTransactions from './screens/AllTransactions';
import Offline from './screens/Offline';
import { View, Text, Image, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: '#bbdefb',
      // backgroundColor: '#51A3B1',
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: 'black',
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Limit"
          component={Limit}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Seemore"
          component={Seemore}
        />
        <Stack.Screen name="CameraCapture" component={CameraCapture} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Off" component={Offline} />

        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="All" component={AllTransactions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
