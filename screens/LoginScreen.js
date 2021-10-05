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
import { Input, Button, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const signIn = () => {
    if (email && setEmail) {
      setSubmitLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => clearInputFields())
        .catch((error) => alert(error.message) & setSubmitLoading(false));
    } else {
      alert('All fields are mandatory');
      setSubmitLoading(false);
    }
  };
  const clearInputFields = () => {
    alert('Successfully Logged in');
    navigation.replace('Home');
    setSubmitLoading(false);
    setEmail('');
    setPassword('');
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Loading...',
    });
    if (!loading) {
      navigation.setOptions({
        title: 'Login',
      });
    }
  }, [navigation, loading]);

  return (
    <>
      {!loading ? (
        <View style={styles.mainView}>
          <View style={styles.TopView}></View>
          <Image
            source={require('../assets/logo2.png')}
            style={{ width: 100, height: 105, marginBottom: 30 }}
          />

          <View style={styles.BottomView}>
            <Text style={styles.Heading}>Welcome{'\n'} Back</Text>
            <View style={styles.FormView}>
              <TextInput
                style={styles.TextInput}
                textContentType={email}
                placeholder={'Email Address'}
                keyboardType="email-address"
                placeholderTextColor={'#fff'}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.TextInput}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderTextColor={'#fff'}
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
              />
              <TouchableOpacity style={styles.Button} onPress={signIn}>
                <Text style={styles.ButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.TextButton}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.SignupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar style="light" />
          <Image
            source={{
              uri:
                'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
            }}
            style={{ width: 100, height: 100, marginBottom: 50 }}
          />
          <Text h4>Loading...</Text>
        </View>
      )}
    </>
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
    height: '10%',
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
    backgroundColor: '#01497c',
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

export default LoginScreen;
