import { Dimensions, ActivityIndicator, StyleSheet,ImageBackground, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import axios from "axios";
import { Appbar } from 'react-native-paper';
import handleUpdateAccessToken from "../DashboardScreen/handlers/accessToken" 
import handleUpdateArticles from "../DashboardScreen/handlers/articles"

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Cards} from './Components/ArticleCard';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

export default function DashboardScreen({navigation}) {
  const [loading, setloading] = useState(false);
  const [filter, setFilter] = useState("this is the filter");
  const [pageNumber, setPageNumber] = useState(0);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const authentication = useSelector((state) => state.authenticationReducer.accessToken);
  const articles = useSelector((state) => state.articlesReducer.articles);
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

    const logOut = () => {        
      handleUpdateAccessToken("",dispatch); // reset access token in redux store
      navigation.navigate("LoginScreen"); // navigate to Login Screen
    }

    const handleSearch = () => {
      if (searchBarVisible==true){console.log("Filter:\t"+filter);}
      setSearchBarVisible(!searchBarVisible);
    }
  
  return (
    <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
      <View style={{width:"70%",  flex:1}}> 
        <Appbar.Header style={{backgroundColor:"rgb(31, 20, 99)",justifyContent:"space-between"}}>
          <Appbar.BackAction onPress={()=>{logOut()}} />
          {searchBarVisible?
          <View style={{width:"50%"}}>
            <TextInput 
            onChangeText={(filter) => {setFilter(filter);}} 
            placeholder="Search Articles"
            style={styles.searchInput} 
            />
          </View>:<></>}
          <Appbar.Action icon="magnify" onPress={()=>{handleSearch()}} />
        </Appbar.Header>
        <View style={[styles.container,{backgroundColor:"rgba(0, 0, 0,0.77)", }]}>
          <Cards fetchNextPage={()=>{fetchNextPage()}}></Cards>
          {loading?<View style={{height:50}}><ActivityIndicator size="large" color="white" /></View>:<></>}
        </View>
      </View>
    </ImageBackground>      
  );
}
          


const styles = StyleSheet.create({
  temp:{
    marginHorizontal:"3%",
    padding:"1%",
    backgroundColor:'#112031',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
  },
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
