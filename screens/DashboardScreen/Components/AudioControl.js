import { useSelector, useDispatch } from "react-redux";
import {React} from 'react';
import { Dimensions, Platform,Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {handleSpeechPressed} from "../handlers/handleSpeechPressed";
import {updateSpeechSpeed, updateSelectedVoice} from "../../../redux/slices/cardSlice";
import * as Speech from 'expo-speech';

const ScreenHeight = Dimensions.get("window").height;

export const AudioControl = ({thingToSay,id})=> {
    const dispatch = useDispatch();
    const viewContent = useSelector((state) => state.cardReducer.viewContent);
    const speechIcon = useSelector((state) => state.cardReducer.speechIcon);
    const speechSpeed = useSelector((state) => state.cardReducer.speechSpeed);
    // const selectedVoice = useSelector((state) => state.cardReducer.selectedVoice);

    return (
        <View style={{flexDirection:"row", justifyContent:"flex-end" }}>
            {/* <TouchableOpacity 
                style={styles.speechBtn} 
                onPress={()=>{}}
                >
                <Text>Choose Speaker: </Text>
                <Picker
                    style={{fontSize:14}}
                    selectedValue={selectedVoice}
                    onValueChange={
                        (speaker) => {
                            Speech.stop();
                            dispatch(updateSelectedVoice(speaker));
                        }
                    }>
                    <VoicesList/>
                </Picker>
            </TouchableOpacity>   */}
            <View style={{ flexDirection:"row"}}>
                <TouchableOpacity 
                    style={styles.speechBtn} 
                    onPress={()=>{
                        dispatch(updateSpeechSpeed(speechSpeed));
                        Speech.stop();
                    }}
                    >
                    <Text> {"x "+(speechSpeed).toString()} Audio Speed</Text>
                </TouchableOpacity>    
                <TouchableOpacity 
                    style={styles.speechBtn} 
                    onPress={()=>{
                        handleSpeechPressed(dispatch,thingToSay,id,viewContent,speechSpeed);
                    }}
                    >
                    <Ionicons name={speechIcon} size={20} color="black" />
                    <Text> {speechIcon=="play-circle-outline"?"Play":"Stop"} Audio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    speechBtn: {
        margin:ScreenHeight*0.01,
        marginBottom:ScreenHeight*0.03,
        flexDirection:"row",
    }
});


export default AudioControl;