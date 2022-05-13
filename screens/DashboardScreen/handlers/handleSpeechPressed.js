import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import {updateSpeechIcon} from "../../../redux/slices/speechSlice"

export const handleSpeechPressed = (dispatch,thingToSay,id,viewContent,speechSpeed,speaker)=>{
    Speech.isSpeakingAsync().then(
        (speaking)=>{
            if(speaking && viewContent==id){
                Speech.stop();
            }
            else{
                if(thingToSay.length<=Speech.maxSpeechInputLength){
                    if(Platform.OS!="ios"){ 
                        Speech.speak(
                            thingToSay,
                            {
                                rate:speechSpeed,
                                voice:speaker,
                                onStart:()=>{dispatch(updateSpeechIcon("stop-circle-outline"))},
                                onStopped:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onDone:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onError:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                            }
                        );
                    }
                    else{ // Quick fixing IOS speech bug
                        Speech.speak(
                            thingToSay,
                            {
                                rate:speechSpeed,
                                // voice:speaker,  // deleted line
                                onStart:()=>{dispatch(updateSpeechIcon("stop-circle-outline"))},
                                onStopped:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onDone:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onError:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                            }
                        );
                    }
                }
                else{
                    if(Platform.OS!="ios"){
                        Speech.speak(
                            thingToSay.slice(0,Speech.maxSpeechInputLength),
                            {
                                rate:speechSpeed,
                                voice:speaker,
                                onStart:()=>{dispatch(updateSpeechIcon("stop-circle-outline"))},
                                onStopped:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onDone:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onError:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                            }
                        );
                    }
                    else{
                        Speech.speak( // Quick fixing IOS speech bug
                            thingToSay.slice(0,Speech.maxSpeechInputLength),
                            {
                                rate:speechSpeed,
                                // voice:speaker,  // deleted line
                                onStart:()=>{dispatch(updateSpeechIcon("stop-circle-outline"))},
                                onStopped:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onDone:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                                onError:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                            }
                        );
                    }
                }
            } 
        },
        (error)=>{
            console.log("Speech interrupted",error);// do nothing
        }
    );
}
export default handleSpeechPressed;