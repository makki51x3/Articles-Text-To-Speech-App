import * as Speech from 'expo-speech';
import {updateSpeechIcon} from "../../../redux/slices/speechSlice"

export const handleSpeechPressed = (dispatch,thingToSay,id,viewContent,speechSpeed,speaker)=>{
    Speech.isSpeakingAsync().then(
        (speaking)=>{
            if(speaking && viewContent==id){
                Speech.stop();
            }
            else{
                if(thingToSay.length<=Speech.maxSpeechInputLength){
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
                else{
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
            } 
        }
    );
}
export default handleSpeechPressed;