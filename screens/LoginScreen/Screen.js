import { Dimensions, ActivityIndicator, StyleSheet, TextInput, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import {updateAccessToken} from '../../redux/feature/authenticationSlice'

const ScreenHeight = Dimensions.get("window").height;

export default function LoginScreen({navigation}) {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [userplaceholder, setUserPlaceholder] = useState("User Name");
  const [passplaceholder, setPassPlaceholder] = useState("Password");
  const [loginFailed, setLoginFailed] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateAccessToken = (tkn) => {
    if (!tkn) return;
    dispatch(updateAccessToken(tkn));
  };  

  const login = (username, password) => {
    setloading(true);

    const config = { headers: {'Content-Type': 'application/json', 'accept': 'application/json'}}
    axios.post("http://34.245.213.76:3000" + "/auth/signin", {
      "username":username,
      "password":password
    },config)
    .then((response) => {
      setLoginFailed(false);
      setloading(false);
      navigation.navigate("DashboardScreen");
      // save login response in store
      handleUpdateAccessToken(response.data.accessToken);

    },
    (error) => {
      setloading(false);
      setUserPlaceholder("User");
      setPassPlaceholder("Password");
      setLoginFailed(true);
    });

  };

  return (
    <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
      <View style={styles.container}>
        <TextInput
        onChangeText={(username) => {setUserName(username);}}
        placeholder={userplaceholder}
        style={[styles.input,{marginTop:0.07*ScreenHeight}]}
        />
        <TextInput
        onChangeText={(password) => {setPassword(password);}}
        placeholder={passplaceholder}
        secureTextEntry={true}
        style={styles.input}
        />
        {loginFailed?<Text style={{color:"red", fontWeight:"700"}}> Invalid username or password!</Text>:<></>}
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            style={styles.btn}
            disabled={username=="" || password=="" || loading==true?true:false}
            onPress={()=>{
              login(username,password);
            }}
            underlayColor='#fff'>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          {loading?<ActivityIndicator size="small" color="white" style={{marginLeft:15}} />:<></>}
        </View>
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
