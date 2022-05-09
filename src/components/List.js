import React from "react";
import {StyleSheet,View,Text} from 'react-native';
import { Color } from "../utils/Themes";

export const List=(props)=>(
    <View style={style.container}>
        <View style={style.titleContainer}>
                <Text style={{color:props.color == null ? Color.color1 : props.color,fontSize:15}}>{props.title}</Text>
        </View>
        <View style={style.valueContainer}>
                <Text style={{color:props.color == null ? Color.color1 : props.color,fontSize:15}}>{props.value}</Text>
        </View>
    </View>
);

const style = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        marginVertical:5
    },
    titleContainer:{
        flex:1,
        alignItems:'flex-start'
    },
    valueContainer:{
        flex:1,
        alignItems:'flex-end'
    }
})
