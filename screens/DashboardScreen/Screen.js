import { StyleSheet, TextInput, View, Button } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
        <TextInput
        value={this.state.username}
        onChangeText={(username) => this.setState({ username })}
        placeholder={'Username'}
        style={styles.input}
        />
        <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
        />
        
        <Button
        title={'Login'}
        style={styles.input}
        onPress={this.onLogin.bind(this)}
        />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
