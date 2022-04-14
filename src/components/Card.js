import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    return (
        <View style={{...style.card,...props.style}}>
            {props.children}
        </View>
    );
}


const style = StyleSheet.create({
    card: {
        marginVertical: 5,
        marginHorizontal: 8,
        backgroundColor:'white'
    }
})

export default Card;