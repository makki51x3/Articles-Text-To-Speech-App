
import {updateAvailableVoices,updateSelectedVoice} from '../../../redux/slices/cardSlice'
import * as Speech from 'expo-speech';

export const handleUpdateVoices = (dispatch) => {  
    // var defaultSpeaker;
    Speech.getAvailableVoicesAsync().then(
        (speakers)=>{
            if (speakers!=[]){ // check that speakers is not an empty list
                speakers.forEach(element => {      
                        dispatch(updateAvailableVoices(element["identifier"]));
                });
                // console.log("speakers should not be empty brackets",speakers);
                // defaultSpeaker=speakers[0]["identifier"];
            }
        }
    );     
    // return defaultSpeaker;
}; 

export default handleUpdateVoices;