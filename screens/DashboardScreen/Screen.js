import { StyleSheet, Text, View, Button } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
        <Text>username: {"uname"} password: {"pwd"}</Text>
        <Button
        title={'Back'}
        style={styles.input}
        disabled
        />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
