import { Platform, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {handleRefreshPressed} from "../handlers/handleRefreshPressed"
import { Ionicons } from '@expo/vector-icons';

export const RefreshBtn = ()=>{

    const dispatch = useDispatch();

    // Get data from the redux store
    const refresh = useSelector((state) => state.dashBoardPageReducer.refresh);

    if(Platform.OS!="android" && Platform.OS!="ios"){ // don't display on mobile
        return (
            <TouchableOpacity onPress={()=>{
                handleRefreshPressed(dispatch,refresh);
              }}>
              <Ionicons name="reload" size={20} color="white"/>
            </TouchableOpacity>
        );
    }
    else{
        return <></>;
    }
}

export default RefreshBtn;
  