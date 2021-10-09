import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Avatar, ListItem } from 'react-native-elements';
import { auth, db } from '../services/firebase';
import { StatusBar } from 'expo-status-bar';
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem';

const Seemore = ({ navigation }) => {
  const signOutUser = () => {
    auth
      .signOut()
      .then(() => navigation.replace('Login'))
      .catch((error) => alert(error.message));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Expense Tracker',
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Text style={{ fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  // transactions
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) =>
          setTransactions(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ) &
          setTotalIncome(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == 'income'
                ? doc.data().price
                : 0
            )
          ) &
          setTotalExpense(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == 'expense'
                ? doc.data().price
                : 0
            )
          )
      );

    return unsubscribe;
  }, []);

  // stufff
  const [totalIncome, setTotalIncome] = useState([]);
  const [income, setIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState([]);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    if (totalIncome) {
      if (totalIncome?.length == 0) {
        setIncome(0);
      } else {
        setIncome(totalIncome?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
    if (totalExpense) {
      if (totalExpense?.length == 0) {
        setExpense(0);
      } else {
        setExpense(totalExpense?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
  }, [totalIncome, totalExpense, income, expense]);

  useEffect(() => {
    if (income || expense) {
      setTotalBalance(income - expense);
    } else {
      setTotalBalance(0);
    }
  }, [totalIncome, totalExpense, income, expense]);

  const [filter, setFilter] = useState([]);
  useEffect(() => {
    if (transactions) {
      setFilter(
        transactions.filter(
          (transaction) => transaction.data.email === auth.currentUser.email
        )
      );
    }
  }, [transactions]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.BottomView}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 5, flexDirection: 'row' }}>
              <View style={styles.tile}>
                <TouchableOpacity
                  style={styles.Button2}
                  onPress={() => navigation.navigate('All')}>
                  <FontAwesome5 name="list-alt" size={80} color="#3490dc" />
                  <Text color="#3490dc"> Transactions </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tile}>
                <TouchableOpacity
                  style={styles.Button2}
                  onPress={() => navigation.navigate('Profile')}>
                  <MaterialCommunityIcons
                    name="face-profile"
                    size={80}
                    color="pink"
                  />
                  <Text color="pink"> Profile </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 5, flexDirection: 'row', marginBottom: 20 }}>
              <View style={styles.tile}>
                <TouchableOpacity
                  style={styles.Button2}
                  onPress={() => navigation.navigate('Support')}>
                  <MaterialIcons name="support-agent" size={80} color="black" />
                  <Text color="yellow"> Support </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tile}>
                <TouchableOpacity
                  style={styles.Button2}
                  onPress={() => navigation.navigate('About')}>
                  <FontAwesome5 name="info-circle" size={80} color="green" />
                  <Text> About </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.addButton}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Home')}>
          <FontAwesome5 name="home" size={24} color="#00509d" />
          <Text style={{ color: 'grey', fontSize: 8 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Limit')}
          activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="clipboard-flow-outline"
            size={24}
            color="#00509d"
          />
          <Text style={{ color: 'grey', fontSize: 8 }}> Limit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add')}
          activeOpacity={0.5}>
          <MaterialIcons name="add-circle" size={55} color="#3bdefb" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Off')}
          activeOpacity={0.5}>
          <Ionicons name="cash-outline" size={24} color="#00509d" />
          <Text style={{ color: 'grey', fontSize: 8 }}> List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Seemore')}>
          <MaterialIcons name="read-more" size={26} color="#00509d" />
          <Text style={{ color: '#00509d', fontSize: 8 }}>More</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Seemore;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    height: '80%',
  },

  Button2: {
    width: '80%',
    height: 150,
    display: 'flex',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tile: {
    width: '45%',
    height: '25%',
    marginRight: 20,
    borderRadius: 13,
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  addButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  plusButton: {
    backgroundColor: '#00296b',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  BottomView: {
    width: '100%',
    height: '90%',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
