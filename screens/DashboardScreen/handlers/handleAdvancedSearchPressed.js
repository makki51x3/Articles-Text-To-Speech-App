
import {updateAdvancedSearchVisible} from '../../../redux/slices/searchSlice'

export const handleAdvancedSearchPressed = (dispatch,advancedSearchVisible)=>{
    dispatch(updateAdvancedSearchVisible(!advancedSearchVisible));
}

export default handleAdvancedSearchPressed;