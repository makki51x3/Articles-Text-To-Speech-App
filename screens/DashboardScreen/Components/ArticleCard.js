import React from 'react';
import { Dimensions, SafeAreaView, View, RefreshControl, Image, Platform, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Subheading, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import {handleUpdateArticles, handleUpdatePageNumber} from "../../DashboardScreen/handlers/articles"

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

export const  Cards = ({fetchNextPage, searchBarVisible, articlesList}) => {
    
    useEffect(() => { // load data only once on mount
        fetchNextPage(); 
    }, []);

    const dispatch = useDispatch();
    const [viewContent, setViewContent] = useState("");
    const [ref, setRef] = useState(null);
    
    const callRefreshControl = () => {
        handleUpdateArticles("",dispatch); // reset list of articles in redux store
        handleUpdatePageNumber(0,dispatch); // reset page number
        fetchNextPage();   //fetch page 0
        }
    
    const Item = ({ title, subtitle, abstract, id, content, media }) => (
            <Card onPress={()=>{viewContent==id?setViewContent(""):setViewContent(id)}} style={styles.card}>
                <Card.Title title={title} subtitle={subtitle} ></Card.Title>
                <Card.Content>
                    <Paragraph >{abstract}</Paragraph> 
                    {media==""?null:<Image source={{ uri: "https://static01.nyt.com/"+media }} style = {styles.image} />}  
                    {viewContent==id?
                    <View style={styles.subheading}>
                        <Subheading>{content}</Subheading>
                    </View>:<></>}
                </Card.Content>
            </Card>
        );

    // every 130 words is about 1 minute of speech according to what I googled. ..
    const timeToRead = (wordCount)=>{return Math.floor(wordCount/130).toString()};     
    const renderItem = ({ item,index }) => (
        <Item 
        id = {item["_id"]}
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
                    onRefresh={()=>{callRefreshControl()}}
                    />
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={articlesList}
                renderItem={renderItem}
                keyExtractor={(article,index) => index}
                ref={(ref) => {
                    setRef(ref);
                  }}
                onEndReachedThreshold={0}
                onEndReached={()=>{
                    if(!searchBarVisible){
                    ref.scrollToIndex({
                        animated: true,
                        index: 0,
                        viewPosition: 1
                      });
                    fetchNextPage();}
                }}
            />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: (Platform.OS == "ios"|| Platform.OS =="android")?ScreenHeight*0.3:ScreenHeight*0.4, 
        width: (Platform.OS == "ios"|| Platform.OS =="android")?ScreenWidth*0.9:ScreenWidth*0.5, 
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