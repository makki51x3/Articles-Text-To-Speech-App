import {  StatusBar, SafeAreaView, ActivityIndicator, StyleSheet,ImageBackground, Platform, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import background from '../../assets/dashBoardBG.png' // relative path to image 
import axios from "axios";
import { Appbar } from 'react-native-paper';
import {handleUpdateAccessToken} from "./handlers/authentication" 
import {handleUpdateArticles, handleUpdateFilteredArticles, handleUpdatePageNumber} from "../DashboardScreen/handlers/articles"
import {Cards} from './Components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({navigation}) {

  const [loading, setloading] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
  const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);
  const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
  const articles = useSelector((state) => state.articlesReducer.articles);


  const dispatch = useDispatch();

  const fetchNextPage = () => {
    setloading(true);
    // Setup required http headers
    // console.log("fetching next page:\n\tuser:\t"+userName+"\n\ttoken:\t"+accessToken+"\n\tpass:\t"+password);
    const config = { headers: {'accept': 'application/json', "Authorization": "Bearer " + accessToken}};
    // Initiate a post request with username and password to Login API
    axios.get("http://34.245.213.76:3000" + "/articles?page="+pageNumber, config)
    .then((response) => { 
      // reset LoginFailed and Loading flags
      setloading(false);
      // console.log(response);
      if (response.status >= 200 && response.status <= 299){ //check for successful status code
        handleUpdateArticles(response.data.response.docs,dispatch); // save articles response in redux store
        handleUpdatePageNumber(pageNumber+1, dispatch); // increment page number
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
    if (searchBarVisible==true){console.log("Filter:\t",filter,"\nfiltered articles",filteredArticles,"\narticles",articles);}
    setSearchBarVisible(!searchBarVisible);
  }

  useEffect(() => {
    return () => {
      if(searchBarVisible==false){
        console.log("filter before calling: updateFilteredArticles is\n",filter);
        handleUpdateFilteredArticles(filter, articles, dispatch);
      }
    }
  }, [filter]);
  
  
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar hidden={true} />
      <ImageBackground source= {background}  resizeMode="cover" style={styles.container}>
        <View style={{width:(Platform.OS == "ios"||Platform.OS =="android")?"100%":"60%", flex:1}}> 
          <Appbar.Header style={{backgroundColor:"rgb(31, 20, 99)",  justifyContent:"space-between"}}>
            <Appbar.BackAction onPress={()=>{logOut()}} />
              {
              searchBarVisible?
                <View style={{width:"70%"}}>
                  <TextInput 
                  onChangeText={(filter) => {     
                    console.log("onchange filter is\n",filter);
                    handleUpdateFilteredArticles(filter, articles, dispatch);
                  }} 
                  placeholder="Search articles"
                  style={styles.searchInput} 
                  />
                </View>:<Appbar.Content></Appbar.Content>
              }
              {
              (Platform.OS!="android" && Platform.OS!="ios")?
              <TouchableOpacity onPress={()=>{{/* call cards function using redux */}}}>
                <Ionicons name="reload" size={20} color="white"/>
              </TouchableOpacity>:null
              }
              <Appbar.Action icon="magnify" onPress={()=>{handleSearch()}} />
          </Appbar.Header>
          <View style={[styles.container,{backgroundColor:"rgba(0, 0, 0,0.77)"}]}>
            <Cards searchBarVisible={searchBarVisible} fetchNextPage={()=>{fetchNextPage()}}></Cards>
            {loading?<View style={{height:45}}><ActivityIndicator size="large" color="white" /></View>:<></>}
          </View>
        </View>
      </ImageBackground>    
    </SafeAreaView>
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
    padding:(Platform.OS=="ios"||Platform.OS=="android")?1:4,
    margin:10,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius:5,
  },
});
