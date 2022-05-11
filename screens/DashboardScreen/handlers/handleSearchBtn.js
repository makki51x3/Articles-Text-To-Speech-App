
import * as Speech from 'expo-speech';
import {updateSearchBarVisible} from '../../../redux/slices/searchSlice'

export const handleSearchBtn = (dispatch,searchBarVisible)=>{
    Speech.stop();  // stop speech if in play
    dispatch(updateSearchBarVisible(!searchBarVisible));
}

export default handleSearchBtn;