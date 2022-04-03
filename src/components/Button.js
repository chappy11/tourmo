import { Button as Btn } from 'react-native-paper';
import { Color } from '../utils/Themes';
import { StyleSheet } from 'react-native';
import React from 'react'
export const Button = (props) => {
  
   
        return (
         <Btn
         {...props}
         style={style.btnstyle}
         
         >
             {props.name}
         </Btn>
        )
    


  
}




const style = StyleSheet.create({
    btnstyle: {
        padding: 5,
        borderRadius:20
    }
})