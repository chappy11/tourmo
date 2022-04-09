import React from 'react'
import {View} from 'react-native'

const RNscreen = (props) => {
    return (
        <View style={{flex:1,...props.style}}>
            {props.children}
        </View>
    );
} 

export default RNscreen;