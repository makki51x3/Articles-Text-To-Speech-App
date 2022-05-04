import { SafeAreaView, ActivityIndicator, StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import { useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { handleUpdateUserName, handleUpdatePassword, handleUpdateAccessToken } from '../DashboardScreen/handlers/authentication';
import { TextInput } from 'react-native-paper';

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
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.container}>
          <TextInput
            hidePlaceholder={true} 
            onChangeText={(username) => {handleUpdateUserName(username,dispatch);}}
            placeholder={userplaceholder}
            style={styles.input}
          />
            <TextInput
              onChangeText={(password) => {handleUpdatePassword(password,dispatch);}}
              placeholder={passplaceholder}
              secureTextEntry={passwordVisible}
              style={styles.input}
              right={<TextInput.Icon style={{marginHorizontal:"auto", backgroundColor:"white"}} name={passwordVisible ? "eye" : "eye-off"} size={20} onPress={() => setPasswordVisible(!passwordVisible)} />}
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
    height: 40,
    // padding: 3,
    // borderWidth: 1,
    // borderColor: 'black',
    marginBottom: 20,
    backgroundColor:  "white"
    // color: 'white',
    // borderRadius:7,
  },
});
