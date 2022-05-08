import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {handleSpeechPressed} from "../handlers/handleSpeechPressed"


export const AudioControl = ({thingToSay,id})=> {
    const dispatch = useDispatch();
    const viewContent = useSelector((state) => state.cardReducer.viewContent);
    const speechIcon = useSelector((state) => state.cardReducer.speechIcon);

    return (
        <View>
            <TouchableOpacity 
                style={styles.speechBtn} 
                onPress={()=>{handleSpeechPressed(dispatch,thingToSay,id,viewContent)}}
                >
                <Ionicons name={speechIcon} size={20} color="black" />
                <Text> {speechIcon=="play-circle-outline"?"Play":"Stop"} Audio</Text>
            </TouchableOpacity>
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