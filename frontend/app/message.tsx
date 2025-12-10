import React, {useState, useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView, Image} from 'react-native';
const {width} = Dimensions.get('window');

interface Message  {

    id : string;
    text : string;
    sender : string;
    timestamp : string;
    isCurrentUser : boolean;
}

interface FloatingChatMessageProps {

    message : Message;
    currentUserId : string;
    currentUserName : string;
}

export default function FloatingMessageProps ({message, currentUserId, currentUserName} : FloatingChatMessageProps) 

{
    const formatTimestamp = (timestamp : string) => {

        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}: ${formattedMinutes} ${ampm}`;
        
    }

    return (

        <View style = {[styles.container, message.isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}
        >
           {!message.isCurrentUser && (<Text style = {styles.senderName} > {message.sender} </Text>)}
           <View style = {[styles.bubble, message.isCurrentUser ? styles.currentUserBubble: styles.otherUserBubble]} >
            <Text style = {[styles.messageText, message.isCurrentUser ? styles.currentUserText : styles.otherUserText]} > {message.text} 
            </Text>
           </View>
           <Text style = {styles.timestamp} > {formatTimestamp(message.timestamp)}</Text>

           </View>

    );
    
}  


    const styles = StyleSheet.create ({

        container : {
            
            margin : 8,
            paddingHorizontal : 4,

        },

        currentUserMessage : {

            alignSelf : 'flex-end',
            alignItems : 'flex-end'

        },

        otherUserMessage : {

            alignSelf : 'flex-start',
            alignItems : 'flex-start',

        },

        bubble : {

            paddingHorizontal : 12,
            paddingVertical : 8,
            borderRadius : 16,
            maxWidth : width * 0.7,
            shadowColor : "#000",
            shadowOffset : {

                width : 0,
                height : 2, 

            },

            shadowOpacity : 0.25,
            shadowRadius : 3.84,
            elevation : 5,


        },

        currentUserBubble : {

            backgroundColor : '#DCF8C6',
            borderBottomRightRadius : 0,

        },

        otherUserBubble : {

            backgroundColor : "#FFFFFF",
            borderBottomLeftRadius : 0,

        },

        messageText : {
            
            fontSize : 16,
            lineHeight : 22,

        },

        currentUserText : {

            color : "#000000",

        },

        otherUserText : {

            color : "#000000",

        },

        timestamp : {

            fontSize : 10,
            color : "#808080",
            marginTop : 4,

        },

        senderName : {

            fontSize : 12,
            color : "#555555",
            marginBottom : 2,

        },

    });

      
