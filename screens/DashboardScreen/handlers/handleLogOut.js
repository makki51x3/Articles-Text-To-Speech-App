import * as Speech from 'expo-speech';
import {resetArticles, resetPageNumber} from '../../../redux/slices/articlesSlice'
import { updateAccessToken } from '../../../redux/slices/authenticationSlice';
import { resetAvailableVoices } from '../../../redux/slices/speechSlice';
import {updateViewContent} from "../../../redux/slices/dashBoardPageSlice"

export const handleLogOut = (navigation,dispatch) => {        
    dispatch(updateAccessToken("")); // reset access token in redux store
    dispatch(resetPageNumber()); // reset page number
    dispatch(resetArticles()); // reset articles in store
    dispatch(resetAvailableVoices()); // reset voices in store
    dispatch(updateViewContent("")); // reset opened view in store
    Speech.stop();  // stop speech if in play
    navigation.navigate("LoginScreen"); // navigate to Login Screen
};

export default handleLogOut;