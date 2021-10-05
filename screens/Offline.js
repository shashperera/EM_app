import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../firebase';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { NetworkProvider, NetworkConsumer } from 'react-native-offline';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem';

const html = `
<html>
<body>
<h1>Page 1</h1>
<div class="pagebreak"></div>
<h1>Page 2</h1>
<div class="pagebreak"></div>
<h1>Page 3</h1>
<div class="pagebreak"></div>
</body>
<style>
@page print {
    .pagebreak { break-before: page; }
}
@media print {
    .pagebreak { break-before: page; }
}
@page print {
    .pagebreak { page-break-before: always; }
}
@media print {
    .pagebreak { break-before: always; }
}
</style>
</html>
`;

const Offline = ({ navigation }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offline Data',
    });
  }, []);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, []);
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
   db().goOffline();


  return (
    <View style={styles.container}>
      <NetworkProvider shouldPing={true} pingInterval={100}>
        <NetworkConsumer>
          {({ isConnected }) =>
            isConnected ? (
              <Text style={styles.text}>Hello World!</Text>
            ) : (
              ((<Text> No Network</Text>),
              (
                <>
                  {filter?.length > 0 ? (
                    <SafeAreaView style={styles.container}>
                      <Text> No Network</Text>
                      <Button
                        title="Print your transactions while you are Offline"
                        onPress={() => Print.printAsync({ html })}
                      />

                      <ScrollView>
                        {filter?.map((info) => (
                          <View key={info.id}>
                            <CustomListItem
                              info={info.data}
                              navigation={navigation}
                              id={info.id}
                            />
                          </View>
                        ))}
                      </ScrollView>
                    </SafeAreaView>
                  ) : (
                    <View style={styles.containerNull}>
                      <FontAwesome5 name="list-alt" size={24} color="#EF8A76" />
                      <Text h4 style={{ color: '#4A2D5D' }}>
                        No Transactions
                      </Text>
                    </View>
                  )}
                </>
              ))
            )
          }
        </NetworkConsumer>
      </NetworkProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    marginTop: 20,
  },
  text: {
    flex: 1,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});
export default Offline;
