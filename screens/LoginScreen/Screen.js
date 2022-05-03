import { Dimensions, SafeAreaView, ActivityIndicator, StyleSheet, TextInput, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import { useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { handleUpdateUserName, handleUpdatePassword, handleUpdateAccessToken } from '../DashboardScreen/handlers/authentication';

const ScreenHeight = Dimensions.get("window").height;

export default function LoginScreen({navigation}) {

  const [loading, setloading] = useState(false);
  const [userplaceholder, setUserPlaceholder] = useState("User Name");
  const [passplaceholder, setPassPlaceholder] = useState("Password");
  const [loginFailed, setLoginFailed] = useState(false);

  const {userName, password} = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();

  const login = () => {
    setloading(true);

    // Setup required http headers
    const config = { headers: {'Content-Type': 'application/json', 'accept': 'application/json'}}
    
    // Initiate a post request with username and password to Login API
    axios.post("http://34.245.213.76:3000" + "/auth/signin", {
      "username":userName,
      "password":password
    },config)
    .then((response) => { 
      // reset LoginFailed and Loading flags
      setLoginFailed(false);
      setloading(false);

      if (response.status >= 200 && response.status <= 299){ //check for successful status code
        handleUpdateAccessToken(response.data.accessToken,dispatch); // save login response in redux store
        navigation.navigate("DashboardScreen"); // navigate to dashboard
      }
    },
    (error) => { // display login failed and reset placeholders
      setloading(false);
      setUserPlaceholder("User");
      setPassPlaceholder("Password");
      setLoginFailed(true);
    });

  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.container}>
          <TextInput
          onChangeText={(username) => {handleUpdateUserName(username,dispatch);}}
          placeholder={userplaceholder}
          style={[styles.input,{marginTop:0.07*ScreenHeight}]}
          />
          <TextInput
          onChangeText={(password) => {handleUpdatePassword(password,dispatch);}}
          placeholder={passplaceholder}
          secureTextEntry={true}
          style={styles.input}
          />
          {loginFailed?<Text style={styles.warning}> Invalid username or password!</Text>:<></>}
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity
              disabled={userName=="" || password=="" || loading}
              style={styles.btn}
              onPress={()=>{
                login(userName,password);
              }}
              underlayColor='#fff'>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            {loading?<ActivityIndicator size="small" color="white" style={styles.spinner} />:<></>}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warning:{
    color:"red", 
    fontWeight:"700"
  },
  spinner:{
    marginLeft:15,
  },
  btn:{
    opacity:1,
    marginVertical:10,
    paddingVertical:7,
    paddingHorizontal:10,
    backgroundColor:"rgb(31, 20, 99)",
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
