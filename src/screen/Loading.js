import React from 'react'
import {View,Image} from 'react-native'
import { Color } from '../utils/Themes';


const Loading = () =>{
    return (
        <View style={{flex:1,backgroundColor:Color.primary,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../../asset/motor.png')} style={{width:400,height:500,}} resizeMode='contain'/>
        </View>
    );
}

export default Loading;