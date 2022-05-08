
import React from 'react';
import { Dimensions, Text, View,Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Subheading, Card, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
import {handleSpeechPressed} from "../handlers/handleSpeechPressed"
import {handleViewContent} from "../handlers/handleViewContent"



const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

// every 130 words is about 1 minute of speech according to what I googled. ..
const timeToRead = (wordCount)=>{return Math.floor(wordCount/130)};   

const BlogCard = ({ dispatch, viewContent, title, subtitle, abstract, id, content, media, thingToSay, speechIcon }) => (
    <Card onPress={()=>{handleViewContent(dispatch,id,viewContent)}} style={styles.card}>
        <Card.Title title={title} subtitle={subtitle} titleNumberOfLines={2}></Card.Title>
        <Card.Content>
            {media!="" && <Image source={{ uri: "https://static01.nyt.com/"+media }} style = {styles.image} />}  
            <Paragraph >{abstract}</Paragraph> 
            {
            viewContent==id &&
                <View>
                    <TouchableOpacity style={{margin:5,justifyContent:"flex-end",flexDirection:"row"}} onPress={()=>{handleSpeechPressed(dispatch,thingToSay,id,viewContent)}}>
                        <Ionicons name={speechIcon} size={20} color="black" />
                        <Text> {speechIcon=="play-circle-outline"?"Play":"Stop"} Audio</Text>
                    </TouchableOpacity>
                    <View style={styles.subheading}>
                        <Subheading>{content}</Subheading>
                    </View>
                </View>
            }
        </Card.Content>
    </Card>
);  

export const renderBlogCard = (item,viewContent,dispatch,speechIcon) => (
    <BlogCard 
        speechIcon={speechIcon}
        dispatch = {dispatch}
        viewContent = {viewContent}
        id = {item["_id"]}
        thingToSay = {
            item["headline"]["main"]
            +", "+
            (item["byline"]["original"]?item["byline"]["original"]:"by Unknown Author")
            +", "+
            item["abstract"]
            +", "+
            item["lead_paragraph"]
        }
        title={item["headline"]["main"]}
        subtitle={
            (timeToRead(item["word_count"])?timeToRead(item["word_count"]).toString():"1")
            + 
            " minute read\t\t"
            +
            (item["byline"]["original"]?item["byline"]["original"]:"by Unknown Author")
        } 
        abstract={item["abstract"]} 
        content={item["lead_paragraph"]}
        media={(item["multimedia"]).length?item["multimedia"][0]["url"]:""}
    />
);    

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


export default renderBlogCard;