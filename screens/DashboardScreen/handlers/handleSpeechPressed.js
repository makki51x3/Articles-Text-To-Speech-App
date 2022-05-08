import * as Speech from 'expo-speech';
import {updateSpeechIcon} from "../../../redux/slices/cardSlice"

export const handleSpeechPressed = (dispatch,thingToSay,id,viewContent)=>{

    Speech.isSpeakingAsync().then(
        (speaking)=>{
            if(speaking && viewContent==id){
                Speech.stop();
            }
            else{
                Speech.speak(
                    thingToSay,
                    {
                        onStart:()=>{dispatch(updateSpeechIcon("stop-circle-outline"))},
                        onStopped:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                        onDone:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                        onError:()=>{dispatch(updateSpeechIcon("play-circle-outline"))},
                    }
                    );
            }
        }
    );
}
export default handleSpeechPressed;