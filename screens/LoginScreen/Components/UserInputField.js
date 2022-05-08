
import {StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import {updateUserName} from "../../../redux/slices/authenticationSlice"

export const UserInputField = ({dispatch})=>{
    return(
        <TextInput
            hidePlaceholder={true} 
            onChangeText={(user) => {dispatch(updateUserName(user));}}
            placeholder={"User Name"}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 40,
        marginBottom: 20,
        backgroundColor:  "#e8f0fe"
    },
});

export default UserInputField;
