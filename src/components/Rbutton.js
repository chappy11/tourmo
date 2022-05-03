import React from 'react';
import {Button} from 'react-native-paper'
import {Color} from '../utils/Themes'
import {StyleSheet} from 'react-native';


export const Pbutton = (props) =>(
    <Button mode='contained' {...props} onPress={props.onPress} contentStyle={style.button} color={Color.color1} labelStyle={{color:'white'}} >{props.name}</Button>
)

export const Sbutton = () =>{
    <Button mode='contained' {...props} onPress={props.onPress} contentStyle={style.button} color={Color.color2} labelStyle={{color:'white'}} >{props.name}</Button>
}

const style = StyleSheet.create({
    button:{
        padding:10
    }
})