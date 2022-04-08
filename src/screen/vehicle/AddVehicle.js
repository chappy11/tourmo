import React from 'react'
import {View,StyleSheet,ImageBackground,Text} from 'react-native'
import Screen from '../../components/Screen';

const AddVehicle = () => {
    return (
        <Screen>
            <View style={{ flex: 1 }}>
                 <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <ImageBackground style={style.imagebackground}>
                    <Text>Front View</Text>
                </ImageBackground>
                <ImageBackground style={style.imagebackground}>
                    <Text>Side View</Text>
                </ImageBackground>
            </View>
            </View>
        </Screen>
    );
}

export default AddVehicle;

const style = StyleSheet.create({
      imagebackground: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        margin:10
    }
})