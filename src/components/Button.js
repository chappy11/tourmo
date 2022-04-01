import { Button as Btn } from 'react-native-paper';
import { Color } from '../utils/Themes';
import { StyleSheet } from 'react-native';
import React from 'react'
export const Button = (props) => {
  
    if (props.mode === 'outlined') {
        return (
            <Btn
                onPress={props.onPress}
                mode='outlined'
                color={props.color}
                style={{...style.btnstyle,padding:5,borderWidth:2,borderColor:'black'}}
            >
                {props.name}
            </Btn>
        )
    }
    if (props.mode === 'contained') {
        return (
            <Btn
                onPress={props.onPress}
                mode='contained'
                color={props.color}
                style={{...style.btnstyle,padding:7}}
            >
            
                {props.name}    
            </Btn>
        )
    }


  
}




const style = StyleSheet.create({
    btnstyle: {
        padding: 5,
        borderRadius:20
    }
})