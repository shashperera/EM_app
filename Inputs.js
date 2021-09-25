import React, { Component } from 'react'
import { View, TextInput, StyleSheet,Alert,Button,TouchableOpacity,Text } from 'react-native'

class Inputs extends Component {
   state = {
      name: '',

   }
   handleName = (text) => {
      this.setState({ name: text })
   }
   
   createGreeting = (name) => {
      Alert.text
      Alert.alert('Greeting ','Hello '+ name +"!",[
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ])
   }

   render() {
      return (
      
         <View style = {styles.container}>
                  
            <TextInput style = {styles.input}
               placeholder = "Enter Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>
             
               <Button style = {styles.submitButton} title={"Greet!"} 
               onPress ={ () => this.createGreeting(this.state.name)} />
       
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
    input: {
    height: 50,
      margin: 12,
    borderWidth: 1,
    padding: 30,
    borderRadius:15,
    color:"black"
  },
   submitButton: {
    color:"black",
    borderRadius: 30,
    padding: 10,
   },
   
})