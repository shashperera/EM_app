import React from 'react';
import {
  Text,
  StyleSheet,
  Button,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const SignIn = ({ navigation }) => {
  function navigate() {
    navigation.navigate('Sign Up');
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}></View>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/logo3.jpg')}
      />
      <View style={styles.BottomView}>
        <Text style={styles.Heading}>Welcome{'\n'} Back</Text>
        <View style={styles.FormView}>
          <TextInput
            style={styles.TextInput}
            placeholder={'Email Address'}
            placeholderTextColor={'#fff'}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'#fff'}
          />
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.TextButton} onPress={navigate}>
          <Text style={styles.SignupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'blue',
  },
  tinyLogo: {
    width: '30%',
    height: '20%',
    resizeMode: 'contain',
  },
  TopView: {
    width: '100%',
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '80%',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  Heading: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 50,
    marginBottom: 15,
  },
  FormView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40',
  },
  TextInput: {
    width: '90%',
    height: 52,
    borderRadius: 10,
    paddingLeft: 5,
    borderWidth: 1,
    marginTop: 20,
    fontWeight: 'bold',
    borderColor: '#fff',
    color: '#fff',
  },
  Button: {
    width: '90%',
    color: '#000',
    height: 52,
    display: 'flex',
    borderRadius: 10,
    marginTop: 20,

    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  SignupText: {
    color: 'gray',
    fontWeight: 'bold',

    fontSize: 15,
  },
  TextButton: {
    width: '100%',
    display: 'flex',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
