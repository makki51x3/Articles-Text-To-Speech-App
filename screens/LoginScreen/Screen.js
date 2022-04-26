import { Dimensions, StyleSheet, TextInput, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import { configStore } from 'redux'
import { useState } from 'react';
import axios from "axios";

const ScreenHeight = Dimensions.get("window").height;

const login = (username, password) => {
  if (username=="" || password==""){
    alert("Missing username or password!");
  }
  else{
    const config = { headers: {'Content-Type': 'application/json', 'accept': 'application/json'}}
    axios.post("http://34.245.213.76:3000" + "/auth/signin", {
      "username":username,
      "password":password
    },config)
    .then((response) => {
      alert("Success!");
      if (response.statusCode==200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    },
    (error) => {
      alert("Invalid username or password!");
    });
  }
};

export default function LoginScreen({navigation}) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
      <View style={styles.container}>
        <TextInput
        onChangeText={(username) => {setUserName(username);}}
        placeholder={'Username'}
        style={[styles.input,{marginTop:0.07*ScreenHeight}]}
        />
        <TextInput
        onChangeText={(password) => {setPassword(password);}}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
        />
        <TouchableOpacity
          style={styles.btn}
          disabled={false}
          onPress={()=>{login(username,password)}}
          underlayColor='#fff'>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  btn:{
    marginVertical:10,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:'#112031',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
  },
  text:{
    color:"white",
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius:10,
  },
});
