
import {updateAvailableVoices} from '../../../redux/slices/speechSlice'
import * as Speech from 'expo-speech';

export const handleUpdateVoices = (dispatch) => {  
    Speech.getAvailableVoicesAsync().then(
        (speakers)=>{
            if (speakers){ // check that speakers is not an empty list
                speakers.forEach(element => {  
                    if(element["language"]=="en-GB" || element["language"]=="en-US"){
                       dispatch(updateAvailableVoices(element["identifier"])); 
                    } 
                });
            }
        },
        (error)=>{
            // do nothing
        }
    );     
}; 

export default handleUpdateVoices;