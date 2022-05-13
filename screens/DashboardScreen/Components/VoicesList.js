import { useSelector } from "react-redux";
import { Picker } from '@react-native-picker/picker';

export const VoicesList = ()=>{
    
    // Get data from the redux store
    const availableVoices = useSelector((state) => state.speechReducer.availableVoices);

    let done = [];
    availableVoices.forEach(
        (element,index)=>{
            done.push(<Picker.Item key={index}  label={element} value={element} />);
        }
    );
    return (done);
}

export default VoicesList;
  