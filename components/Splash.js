import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { Input, Button, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../services/firebase';

export default class Splash extends React.Component {
  componentDidMount() {
    this.anim.play();

    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <StatusBar barStyle="light-content" backgroundColor="#161f3d" />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.Heading}> Expense Tracker</Text>
          <LottieView
            source={require('../assets/splash.json')}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              height: '80%',
              width: '80%',
            }}
            autoPlay={false}
            loop={false}
            speed={1}
            ref={(animation) => {
              this.anim = animation;
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    color: '#3490dc',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
