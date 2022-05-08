
import {updateViewContent} from "../../../redux/slices/cardSlice"
import * as Speech from 'expo-speech';

export const handleViewContent = (dispatch,id,viewContent)=>{
    
    if(viewContent!=""){ // if a view is opened close it and stop speech
        dispatch(updateViewContent(""));
        Speech.stop();
    }
    else{  // else, view what was pressed
        dispatch(updateViewContent(id));
    }
}

export default handleViewContent;