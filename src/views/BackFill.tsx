    import React from "react"
    import {  View,Text, StyleSheet, Image} from "react-native";

  export const BackFill = (props) => {
    return(
      <View style={styles.backFill} >
          <Image 
          source={props.image}
          height={100}
          width={100}
          />
        <Text style={styles.textST} >{props.text}</Text>
      </View>
    )
  }


  const styles = StyleSheet.create({
    backFill:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
      },
      textST:{
          fontSize:16,
          marginTop:20,
          letterSpacing:0.5
      }
  })