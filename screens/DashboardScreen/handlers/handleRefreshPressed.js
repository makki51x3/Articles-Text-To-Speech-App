import * as Speech from 'expo-speech';
import {resetArticles, resetPageNumber} from '../../../redux/slices/articlesSlice'
import {updateRefresh, updateStopFetching} from '../../../redux/slices/dashBoardPageSlice'

export const handleRefreshPressed = (dispatch,refresh)=>{
    dispatch(resetArticles()); // reset articles in store
    dispatch(resetPageNumber()); // reset page number
    Speech.stop();  // stop speech if in play
    dispatch(updateStopFetching(false));
    dispatch(updateRefresh(!refresh));
};

export default handleRefreshPressed;