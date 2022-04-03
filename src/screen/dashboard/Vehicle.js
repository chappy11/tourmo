import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';

const Vehicle  = () =>{
    return( 
        <View style={{flex:1}}>
            <View style={style.card}>
                    <Title>Motorista</Title>
                    <Button name="Become Motorista" mode='contained' color={Color.primary}/>
            </View>
            
        </View>
    );
}

export default Vehicle

const style = StyleSheet.create({
    card:{
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
        backgroundColor:'white'
    }
})