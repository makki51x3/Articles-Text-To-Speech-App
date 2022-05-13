
import * as Speech from 'expo-speech';
import {updateSearchBarVisible,updateAdvancedSearchVisible} from '../../../redux/slices/searchSlice'

export const handleSearchBtn = (dispatch,searchBarVisible)=>{
    Speech.stop();  // stop speech if in play
    dispatch(updateSearchBarVisible(!searchBarVisible));
    if (searchBarVisible){     // on exiting search mode hide advanced search if opened
        dispatch(updateAdvancedSearchVisible(false));
    }
}

export default handleSearchBtn;