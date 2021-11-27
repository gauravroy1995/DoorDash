import React,{useEffect,useState} from 'react';

import {View,Text,FlatList,StyleSheet,SafeAreaView , ActivityIndicator, TouchableOpacity} from 'react-native';
import { getPosts, getUsers } from '../api/posts';



const UserView  = (props) => {

    const [posts,setPosts] = useState([]);

    const [loading,setLoader] = useState(true)

    const {username,email,address,website,company} = props.route.params.user ?? {}

    const companyName = company.name;

    const city = address.city;

   

    return(
        <SafeAreaView style={styles.container} >
            <Text style={styles.eachSize} >UserName: {username}</Text>
            <Text style={styles.eachSize} >Email: {email}</Text>
            <Text style={styles.eachSize} >city: {city}</Text>
            <Text style={styles.eachSize} >webiste: {website}</Text>
            <Text style={styles.eachSize}>company name: {companyName}</Text>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:50
    },
    eachCard:{
        marginHorizontal:20,
        borderRadius:10,
        marginVertical:10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    eachSize:{
        fontSize:16,
        color:'rgba(222,22,220,1)',
        marginVertical:5
    },
    secondText:{
        fontSize:18,
        color:'blue',
        marginVertical:8
    },

})

export default UserView;