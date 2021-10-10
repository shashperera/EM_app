import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../services/firebase';
import firebase from 'firebase';

const Limit = ({ navigation }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Daily Limit',
    });
  }, [navigation]);
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const createLimit = () => {
    if (input && amount && selDate && selectedLanguage && auth) {
      setSubmitLoading(true);
      db.collection('limit')
        .add({
          email: auth.currentUser.email,
          limit: amount,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message));
    } else {
      alert('All fields are mandatory');
      setSubmitLoading(false);
    }
  };

  const clearInputFields = () => {
    alert('Limit added Successfully');
    setAmount('');
    navigation.navigate('Home');
    setSubmitLoading(false);
  };
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        

        <TextInput
          style={styles.input}
          //keyboardType="numeric"
          placeholder="Add Transaction Limit"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        

        <Button
          containerStyle={styles.button}
          title="Submit"
          onPress={createLimit}
          loading={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Limit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor:'red',
    width: 300,
    marginTop: 30,
    borderRadius: 15,
  },
});
