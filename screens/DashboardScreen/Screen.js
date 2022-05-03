import {  StatusBar, SafeAreaView, ActivityIndicator, StyleSheet,ImageBackground, Platform, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import axios from "axios";
import { Appbar } from 'react-native-paper';
import {handleUpdateAccessToken} from "./handlers/authentication" 
import {handleUpdateArticles, handleResetArticles, handleUpdateFilteredArticles, handleResetPageNumber} from "../DashboardScreen/handlers/articles"
import {Cards} from './Components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({navigation}) {

  // useState Hooks for UI interactions
  const [loading, setloading] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // useSelector hook to get data from the redux store
  const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
  const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);
  const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
  const articles = useSelector((state) => state.articlesReducer.articles);

  const dispatch = useDispatch();

  useEffect(() => { // load data on mount and refresh
    fetchNextPage(); 
  }, [refresh]);

  const logOut = () => {        
    handleUpdateAccessToken("",dispatch); // reset access token in redux store
    handleResetPageNumber(dispatch); // reset page number
    handleResetArticles(dispatch);           // reset articles in store
    navigation.navigate("LoginScreen"); // navigate to Login Screen
  }

  const fetchNextPage = () => {
    setloading(true);
    // Setup required http headers
    const config = { 
      headers: {
      'accept': 'application/json', 
      "Authorization": "Bearer " + accessToken
      }
    };
    // Initiate a post request with username and password to Login API
    axios.get("http://34.245.213.76:3000" + "/articles?page="+pageNumber, config)
    .then((response) => { 
      // reset LoginFailed and Loading flags
      setloading(false);
      if (response.status >= 200 && response.status <= 299){ //check for successful status code
        handleUpdateArticles(response.data.response.docs,dispatch); // save articles response in redux store
      }
    },
    (error) => { // catch error and stop loading indicator
      setloading(false);
    });
  };

  const refreshPressed = ()=>{
    handleResetArticles(dispatch);           // reset articles in store
    handleResetPageNumber(dispatch); // reset page number
    setRefresh(!refresh);
  };
  
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar hidden={false} /> 
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={styles.AppContainer}> 
          <Appbar.Header style={styles.AppBarHeader}>
            <Appbar.BackAction onPress={()=>{logOut()}} />
              {
              searchBarVisible?
                <View style={{width:"70%"}}>
                  <TextInput 
                  onChangeText={(filter) => {     
                    handleUpdateFilteredArticles(filter, articles, dispatch);
                  }} 
                  placeholder="Search articles"
                  style={styles.searchInput} 
                  />
                </View>:<Appbar.Content></Appbar.Content>
              }
              {
              (Platform.OS!="android" && Platform.OS!="ios")?
              <TouchableOpacity onPress={()=>{refreshPressed()}}>
                <Ionicons name="reload" size={20} color="white"/>
              </TouchableOpacity>:null
              }
              <Appbar.Action icon="magnify" onPress={()=>{setSearchBarVisible(!searchBarVisible)}} />
          </Appbar.Header>
          <View style={styles.containerOpacity}>
            <Cards 
              articlesList={searchBarVisible?filteredArticles:articles} 
              searchBarVisible={searchBarVisible} 
              fetchNextPage={()=>{fetchNextPage()}}>
            </Cards>
            {loading?
            <View style={{height:45}}>
              <ActivityIndicator size="large" color="white" />
            </View>
            :<></>}
          </View>
        </View>
      </ImageBackground>    
    </SafeAreaView>
  );
}
          


const styles = StyleSheet.create({
  containerOpacity:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(0, 0, 0,0.77)"
    },
  AppBarHeader:{
    backgroundColor:"rgb(31, 20, 99)",  
    justifyContent:"space-between"
  },
  AppContainer:{
    width: (Platform.OS == "ios"||Platform.OS =="android")?"100%":"60%", 
    flex:1
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
    padding:(Platform.OS=="ios"||Platform.OS=="android")?1:4,
    margin:10,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius:5,
  },
});
