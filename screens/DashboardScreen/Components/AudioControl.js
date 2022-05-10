import { useSelector, useDispatch } from "react-redux";
import {React} from 'react';
import { Platform,Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {handleSpeechPressed} from "../handlers/handleSpeechPressed";
import {updateSpeechSpeed, updateSelectedVoice} from "../../../redux/slices/cardSlice";
import { VoicesList } from "./VoicesList";
import * as Speech from 'expo-speech';

export const AudioControl = ({thingToSay,id})=> {
    const dispatch = useDispatch();
    const viewContent = useSelector((state) => state.cardReducer.viewContent);
    const speechIcon = useSelector((state) => state.cardReducer.speechIcon);
    const speechSpeed = useSelector((state) => state.cardReducer.speechSpeed);
    const selectedVoice = useSelector((state) => state.cardReducer.selectedVoice);

    return (
        <View style={{flexDirection:(Platform.OS=="ios"||Platform.OS=="android")?"column":"row", justifyContent:"space-between"}}>
            <TouchableOpacity 
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