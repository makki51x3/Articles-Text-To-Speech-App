import { Dimensions, ActivityIndicator, StyleSheet,ImageBackground, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import axios from "axios";
import { Appbar } from 'react-native-paper';
import {handleUpdateArticles,handleUpdateAccessToken} from "../DashboardScreen/handlers/accessToken" 

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

export default function DashboardScreen({navigation}) {
  const [loading, setloading] = useState(false);
  const [filter, setFilter] = useState("this is the filter");
  const [pageNumber, setPageNumber] = useState(0);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const authentication = useSelector((state) => state.authenticationReducer.accessToken);
  const articles = useSelector((state) => state.articlesReducer);
  const dispatch = useDispatch();

  const fetchNextPage = () => {
    setloading(true);
    // Setup required http headers
    const config = { headers: {'accept': 'application/json', "Authorization": "Bearer " + authentication}};
    // Initiate a post request with username and password to Login API
    axios.get("http://34.245.213.76:3000" + "/articles?page="+pageNumber, config)
    .then((response) => { 
      // reset LoginFailed and Loading flags
      setloading(false);
      console.log(response);
      if (response.status >= 200 && response.status <= 299){ //check for successful status code
        handleUpdateArticles(response.data.response.docs,dispatch); // save articles response in redux store
        setPageNumber(pageNumber+1); // increment page number
      }
    },
    (error) => { // display login failed and reset placeholders
      setloading(false);
    });
  };

  useEffect(() => {
    fetchNextPage(); // load data only once on startup
    }, []);

    const _goBack = () => {        
      handleUpdateAccessToken("",dispatch); // save login response in redux store
      navigation.navigate("LoginScreen"); // navigate to Login Screen
    }

    const _handleSearch = () => {
      if (searchBarVisible==true){console.log("Filter:\t"+filter);}
      setSearchBarVisible(!searchBarVisible);
    }
  
    const _handleMore = () => console.log('Shown more');

  return (
    <ImageBackground source= {background}  resizeMode="cover" style={{flex:1,flexDirection:'row'}}>
      <View style={{width:ScreenWidth/2,  flex:1}}> 
        <Appbar.Header style={{backgroundColor:"rgb(31, 20, 99)",justifyContent:"space-between"}}>
          <Appbar.BackAction onPress={_goBack} />
          {/* <Appbar.Content title="Title" subtitle="Subtitle" /> */}
          {searchBarVisible?<TextInput 
          onChangeText={(filter) => {setFilter(filter);}} 
          placeholder="Search Articles"
          style={styles.searchInput}
          />:<></>}
          <Appbar.Action icon="magnify" onPress={()=>{_handleSearch();}} />
          {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
        </Appbar.Header>
        <View style={[styles.container,{backgroundColor:"black", opacity:0.77}]}>
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
            <TouchableOpacity
              style={[styles.btn,{width:"50%"}]}
              onPress={()=>{
                console.log(articles);
              }}
              underlayColor='#fff'>
              <Text style={styles.text}>print articles in console</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.container,{width:ScreenWidth/2,  flex:1}]}></View>
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
  searchInput: {
    flex:1,
    textAlign: 'center',
    padding:5,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius:5,
  },
});
