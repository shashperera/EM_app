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

const SignUp = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}></View>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/logo3.jpg')}
      />
      <ScrollView style={styles.BottomView}>
              <Text style={styles.Heading}>Create{'\n'} Account</Text>

        <View style={styles.FormView}>
        <TextInput
            style={styles.TextInput}
            placeholder={'Full Name*'}
            placeholderTextColor={'#fff'}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={'Email Address*'}
            keyboardType={"email-address"}
            placeholderTextColor={'#fff'}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={'Mobile*'}
            keyboardType={"numeric"}
            placeholderTextColor={'#fff'}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={'Password*'}
            secureTextEntry={true}
            placeholderTextColor={'#fff'}
          />
            <TextInput
            style={styles.TextInput}
            placeholder={'Confirm Password*'}
            secureTextEntry={true}
            placeholderTextColor={'#fff'}
          />
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 2,
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
    height: '10%',
    resizeMode: 'contain',
        marginTop:5,

    marginBottom:20,
  },
  TopView: {
    width: '100%',
    height: '0.5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '98%',
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
  
});

export default SignUp;
