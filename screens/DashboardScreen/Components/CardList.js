import React from 'react';
import { Dimensions, SafeAreaView, Text, View, RefreshControl, Image, Platform, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Subheading, Card, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import {resetArticles, resetPageNumber} from "../../../redux/slices/articlesSlice"
import { Ionicons } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech';
import {handleSpeechPressed} from "../handlers/handleSpeechPressed"
import {handleViewContent} from "../handlers/handleViewContent"

import { useSelector, useDispatch } from "react-redux";
import {handleRefreshPressed} from "../handlers/handleRefreshPressed"
import {fetchNextPage} from "../handlers/fetchNextPage"

import renderBlogCard from './BlogCard';

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

export const  CardList = () => {
    const dispatch = useDispatch();

    const viewContent = useSelector((state) => state.cardReducer.viewContent);
    const speechIcon = useSelector((state) => state.cardReducer.speechIcon);

    const searchBarVisible = useSelector((state) => state.dashBoardPageReducer.searchBarVisible);
    const loading = useSelector((state) => state.dashBoardPageReducer.loading);

    const filteredArticles = useSelector((state) => state.articlesReducer.filteredArticles);
    const articles = useSelector((state) => state.articlesReducer.articles);
    const articlesList = searchBarVisible ? filteredArticles : articles;
    const stopFetching = useSelector((state) => state.dashBoardPageReducer.stopFetching);
    const accessToken = useSelector((state) => state.authenticationReducer.accessToken);
    const pageNumber = useSelector((state) => state.articlesReducer.currentPageNumber);

    if (articlesList.length){   
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
                renderItem={
                   ({item})=> renderBlogCard(item, viewContent, dispatch,speechIcon)
                }
                keyExtractor={(item) => item["_id"]}                
                onEndReachedThreshold={0}
                onEndReached={
                    ()=>{
                        if(!searchBarVisible && !stopFetching && !loading){
                            fetchNextPage(dispatch,pageNumber,articles,accessToken);  
                        }
                    }
                }
            />
            </SafeAreaView>
        );
    }
    else{
        return null;
    }
}

const styles = StyleSheet.create({
    image: {
        height: ScreenHeight*0.3, 
        width: (Platform.OS == "ios"|| Platform.OS =="android")?ScreenWidth*0.9:ScreenWidth*0.4, 
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
        flex:1,
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

export default CardList;