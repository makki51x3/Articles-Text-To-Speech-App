import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import { useSelector, useDispatch } from "react-redux";
import {LoginBtn} from "./Components/LoginBtn"
import {PasswordInputField} from "./Components/PasswordInputField"
import {UserInputField} from "./Components/UserInputField"

export const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const passwordVisible =  useSelector((state) => state.loginPageReducer.passwordVisible);

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.container}>
          <UserInputField dispatch={dispatch} ></UserInputField>
          <PasswordInputField dispatch={dispatch} passwordVisible={passwordVisible}></PasswordInputField>
          <LoginBtn navigation={navigation}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default LoginScreen;