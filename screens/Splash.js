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
            this.props.navigation.navigate("Login")
        }, 3000);
    }

    render() {
        return (
            <View style={styles.mainView}>
                <StatusBar barStyle="light-content" backgroundColor="#161f3d" />
                <View>
                    <LottieView
                        source={require('../assets/splash.json')}
                        style={{ justifyContent: "center", alignSelf: "center", height: "90%", width: "90%" }}
                        autoPlay={false}
                        loop={false}
                        speed={1}
                        ref={animation => { this.anim = animation; }} 
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})
