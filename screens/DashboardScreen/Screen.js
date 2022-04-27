import { Dimensions, ActivityIndicator, StyleSheet,ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { useState } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import axios from "axios";

const ScreenHeight = Dimensions.get("window").height;

export default function DashboardScreen() {

  const [loading, setloading] = useState(false);
  const authentication = useSelector((state) => state.authenticationReducer.accessToken);
  // console.log("authentication in store:\t",authentication);

  const fetchNextPage = () => {
    setloading(true);
    // const pageNumber = 0;
    
    // Setup required http headers
    const config = { headers: {'accept': 'application/json', "Authorization": "Bearer " + authentication}};

    // Initiate a post request with username and password to Login API
    axios.get("http://34.245.213.76:3000" + "/articles?page=0", config)
    .then((response) => { 
      // reset LoginFailed and Loading flags
      setloading(false);
      console.log(response);
      // if (response.status >= 200 && response.status <= 299){ //check for successful status code
      //   handleUpdateAccessToken(response.data.accessToken); // save login response in redux store
      //   navigation.navigate("DashboardScreen"); // navigate to dashboard
      // }
    },
    (error) => { // display login failed and reset placeholders
      setloading(false);
    });
  };

  return (
    <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>DISPLAY SEARCH HEREEEEEEEEEEEEEEEEEEEEEEEEE</Text>
        {loading?<ActivityIndicator size="small" color="white" style={{marginLeft:15}} />:<></>}
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              fetchNextPage();
            }}
            underlayColor='#fff'>
            <Text style={styles.text}>FETCH DATA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  btn:{
    marginVertical:10,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:'#112031',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
  },
  text:{
    color:"white",
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius:10,
  },
});
