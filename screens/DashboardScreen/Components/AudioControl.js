import { useSelector, useDispatch } from "react-redux";
import {React} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {handleSpeechPressed} from "../handlers/handleSpeechPressed"
import {updateSpeechSpeed} from "../../../redux/slices/cardSlice"

import * as Speech from 'expo-speech';

export const AudioControl = ({thingToSay,id})=> {
    const dispatch = useDispatch();
    const viewContent = useSelector((state) => state.cardReducer.viewContent);
    const speechIcon = useSelector((state) => state.cardReducer.speechIcon);
    const speechSpeed = useSelector((state) => state.cardReducer.speechSpeed);
    const selectedVoice = useSelector((state) => state.cardReducer.selectedVoice);

    return (
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity 
                style={styles.speechBtn} 
                onPress={()=>{
                    Speech.stop();
                }}
                >
                <Text>Choose Speaker: {selectedVoice}</Text>
            </TouchableOpacity>  
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
                        handleSpeechPressed(dispatch,thingToSay,id,viewContent,speechSpeed,selectedVoice);
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
        margin:5,
        justifyContent:"flex-end",
        flexDirection:"row"
    }
});


export default AudioControl;