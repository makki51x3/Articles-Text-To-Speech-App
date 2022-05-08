import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import background from '../../assets/background.png' // relative path to image 
import {LoginBtn} from "./Components/LoginBtn"
import {PasswordInputField} from "./Components/PasswordInputField"
import {UserInputField} from "./Components/UserInputField"

export const LoginScreen = ({navigation}) => {

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.container}>
          <UserInputField />
          <PasswordInputField />
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