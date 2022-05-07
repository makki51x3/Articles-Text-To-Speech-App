import React from 'react';
import { SafeAreaView, Text, View, RefreshControl, Image, Platform, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Subheading, Card, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import {resetArticles, resetPageNumber} from "../../../redux/slices/articlesSlice"
import { Ionicons } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech';

import { useSelector, useDispatch } from "react-redux";
import {handleRefreshPressed} from "../handlers/handleRefreshPressed"
import {fetchNextPage} from "../handlers/fetchNextPage"


export const  Cards = () => {
    const dispatch = useDispatch();
    const [viewContent, setViewContent] = useState("");
    const [speechIcon, setSpeechIcon] = useState("play-circle-outline");
    
    const searchBarVisible = useSelector((state) => state.dashBoardPageReducer.searchBarVisible);
    const loading = useSelector((state) => state.dashBoardPageReducer.loading);

    const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
    const articles = useSelector((state) => state.articlesReducer.articles);
    const articlesList=searchBarVisible?filteredArticles:articles;
    const stopFetching = useSelector((state) => state.dashBoardPageReducer.stopFetching);
    const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
    const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);

    const handleSpeechPressed = (thingToSay,id)=>{
        Speech.isSpeakingAsync().then(
            (speaking)=>{
                if(speaking && viewContent==id){
                    Speech.stop();
                }
                else{
                    Speech.speak(
                        thingToSay,
                        {
                            onStart:()=>{setSpeechIcon("stop-circle-outline")},
                            onStopped:()=>{setSpeechIcon("play-circle-outline")},
                            onDone:()=>{setSpeechIcon("play-circle-outline")},
                            onError:()=>{setSpeechIcon("play-circle-outline")},
                        }
                        );
                }
            }
        );
    }
      
    const handleViewContent = (id)=>{
        if(viewContent!=""){ // if a view is opened close it and stop speech
            setViewContent("");
            Speech.stop();
        }
        else{  // else, view what was pressed
            setViewContent(id);
        }
    }
    const Item = ({ title, subtitle, abstract, id, content, media, thingToSay }) => (
            <Card onPress={()=>{handleViewContent(id)}} style={styles.card}>
                <Card.Title title={title} subtitle={subtitle} titleNumberOfLines={2}></Card.Title>
                <Card.Content>
                    {media==""?null:<Image source={{ uri: "https://static01.nyt.com/"+media }} style = {styles.image} />}  
                    <Paragraph >{abstract}</Paragraph> 
                    {viewContent==id?
                    <View>
                        <View style={{margin:5}}>
                            <TouchableOpacity style={{justifyContent:"flex-end",flexDirection:"row"}} onPress={()=>{handleSpeechPressed(thingToSay,id)}}>
                                <Ionicons name={speechIcon} size={20} color="black" />
                                <Text> {speechIcon=="play-circle-outline"?"Play":"Stop"} Audio</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subheading}>
                            <Subheading>{content}</Subheading>
                        </View>
                    </View>:<></>}
                </Card.Content>
            </Card>
        );

    // every 130 words is about 1 minute of speech according to what I googled. ..
    const timeToRead = (wordCount)=>{return Math.floor(wordCount/130).toString()};     
    const renderItem = ({ item,index }) => (
        <Item 
        id = {item["_id"]}
        thingToSay = {
            articlesList[index]["headline"]["main"]
            +", "+
            (articlesList[index]["byline"]["original"]==null?"":articlesList[index]["byline"]["original"])
            +", "+
            articlesList[index]["abstract"]
            +", "+
            articlesList[index]["lead_paragraph"]
        }
        title={articlesList[index]["headline"]["main"]}
        subtitle={
            (timeToRead(articlesList[index]["word_count"])==0?"1":timeToRead(articlesList[index]["word_count"]))
            + 
            " minute read\t\t"
            +
            (articlesList[index]["byline"]["original"]==null?"":articlesList[index]["byline"]["original"])
        } 
        abstract={articlesList[index]["abstract"]} 
        content={articlesList[index]["lead_paragraph"]}
        media={(articlesList[index]["multimedia"]).length!=0?articlesList[index]["multimedia"][0]["url"]:""}
        />
    );    

    if (articlesList.length==0){
        return (<></>);
      }
    else{      
        return (
            <SafeAreaView style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl
                    onRefresh={()=>{handleRefreshPressed(dispatch,refresh)}}
                    />
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={articlesList}
                renderItem={renderItem}
                keyExtractor={(_,index) => index}
                onEndReachedThreshold={0}
                onEndReached={()=>{
                    if(!searchBarVisible && !stopFetching && !loading){
                        fetchNextPage(dispatch,pageNumber,articles,accessToken);  
                    }
                }}
            />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: (Platform.OS == "ios"|| Platform.OS =="android")?"30%":"40%", 
        width: (Platform.OS == "ios"|| Platform.OS =="android")?"90%":"50%", 
        margin: 3, 
        resizeMode:"contain",
        borderRadius:7,
        alignSelf:"center",
    },
    subheading:{
        backgroundColor:"rgb(240,240,240)",
        borderRadius:10, 
        padding:10
    },
    card:{
        marginVertical:10,
        marginHorizontal:15,
        borderRadius:15,
        backgroundColor:"rgb(200,200,200)"
    },
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        margin: 15,
    },
    title: {
        fontSize: 32,
    },
});

export default Cards;