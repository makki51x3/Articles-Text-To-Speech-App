import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import { useSelector, useDispatch } from "react-redux";
import { TextInput } from 'react-native-paper';
import {updateUserName, updatePassword} from "../../redux/slices/authenticationSlice"
import {LoginBtn} from "./Components/LoginBtn"
import {updatePasswordVisible} from "../../redux/slices/loginPageSlice"

export default function LoginScreen({navigation}) {

  const dispatch = useDispatch();
  const passwordVisible =  useSelector((state) => state.loginPageReducer.passwordVisible);

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.container}>
          <TextInput
            hidePlaceholder={true} 
            onChangeText={(user) => {dispatch(updateUserName(user));}}
            placeholder={"User Name"}
            style={styles.input}
          />
          <TextInput
            onChangeText={(pass) => {dispatch(updatePassword(pass));}}
            placeholder={"Password"}
            secureTextEntry={!passwordVisible}
            style={styles.input}
            right={
              <TextInput.Icon 
                style={{marginHorizontal:"auto", backgroundColor:"white"}} 
                name={passwordVisible ? "eye-off":"eye"} 
                size={20} 
                onPress={() => dispatch(updatePasswordVisible(!passwordVisible))} 
              />}
          />
          <LoginBtn navigation={navigation}/>
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
    marginBottom: 20,
    backgroundColor:  "white"
  },
});
