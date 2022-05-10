
import {updateAvailableVoices,updateSelectedVoice} from '../../../redux/slices/cardSlice'
import * as Speech from 'expo-speech';

export const handleUpdateVoices = (dispatch) => {  
    Speech.getAvailableVoicesAsync().then(
        (speakers)=>{
            if (speakers){ // check that speakers is not an empty list
                speakers.forEach(element => {      
                        dispatch(updateAvailableVoices(element["identifier"]));
                });
                dispatch(updateSelectedVoice(speakers[0]["identifier"]));
            }
        }
    );     
}; 

export default handleUpdateVoices;