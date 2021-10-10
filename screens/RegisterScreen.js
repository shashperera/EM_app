import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Input, Button, Text, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import { db, auth } from '../services/firebase';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const signUp = () => {
    if (fullName && email && password) {
      setSubmitLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          clearInputFields() &
            authUser.user.updateProfile({
              displayName: fullName,
              photoURL:
                imageUrl ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
            });
        })
        .catch((err) => alert(err.message) & setSubmitLoading(false));
    } else {
      alert('All fields are mandatory');
      setSubmitLoading(false);
    }
  };
  const clearInputFields = () => {
    alert('Successfully Created Account');
    navigation.replace('Home');
    setSubmitLoading(false);
    setFullName('');
    setEmail('');
    setPassword('');
    setImageUrl('');
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.BottomView}>
        <TouchableOpacity
          style={styles.tc}
          onPress={() => navigation.navigate('Login')}>
          <Button
            icon={<Icon name="arrow-left" size={15} color="white" />}
          />
        </TouchableOpacity>
        <Text style={styles.Heading}>Create your {'\n'} Account</Text>
        <View style={styles.FormView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Full Name"
            placeholderTextColor={'#fff'}
            autoFocus
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.TextInput}
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
          />
          <TouchableOpacity style={styles.Button2} onPress={pickImage}>
            <Text> Profile picture </Text>
            <FontAwesome5 name="camera" size={50} color="black" />
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 30,
                  alignSelf: 'right',
                }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Button}
            onPress={signUp}
            loading={submitLoading}>
            <Text style={styles.ButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  Button2: {
    width: '50%',
    color: '#000',
    height: 150,
    display: 'flex',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tc: {
    width: '30%',
    color: '#000',
    height: 30,
    display: 'flex',
    marginLeft: 10,
    marginTop: 20,
    justifyContent: 'left',
    alignItems: 'left',
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  BottomView: {
    width: '100%',
    height: '94%',
    backgroundColor: '#3490dc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  Heading: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  FormView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30',
  },
});
