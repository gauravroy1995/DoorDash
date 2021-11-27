
import React,{useEffect,useState} from 'react';

import {View,Text,FlatList,StyleSheet,SafeAreaView , ActivityIndicator, TouchableOpacity} from 'react-native';


export const PostCard = (props) => {
    return(
        <TouchableOpacity style={styles.eachCard} 
        onPress={props.onCardPress}
        >
            <Text style={styles.eachSize}>Title : {props.item?.title ?? ''}</Text>
            <Text style={styles.secondText}
            onPress={props.onUserNamePress}
            
            >Username : {props.item?.user?.username ?? ''}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    eachCard:{
        marginHorizontal:20,
        borderRadius:10,
        marginVertical:10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    eachSize:{
        fontSize:14,
        color:'rgba(222,22,220,1)'
    },
    secondText:{
        fontSize:18,
        color:'blue',
        marginVertical:8
    }
})
