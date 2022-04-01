import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { Paragraph, Title } from 'react-native-paper'
import { useEffect, useState } from 'react/cjs/react.development'
import { Color } from '../utils/Themes'
import { Button } from '../components/Button'


const SplashScreen = ({navigation}) => {
    useEffect(() => {
        // setTimeout(() => {
        //     navigation.navigate('Login');
        // }, 5000);
    },[])
    return (
      <Screen isLoad={false}>
          <View style={style.container}>
                <Image source={require('../../asset/motor.png')} style={{width:400,height:500,}} resizeMode='contain'/>
                
                <View style={{ position: 'absolute',height:70, bottom: 200,  paddingHorizontal: 70 }}>
                        <Title style={{fontSize:30}}>Tourmo</Title>    
                        <Paragraph style={{fontSize:20,color:'white'}}>Tourmo para sa Tourista</Paragraph>
                </View>
                
                <View style={style.btnContainer}>
                    <View style={style.grid}>
                        <Button
                            name="LOGIN"
                            color={'black'}
                            mode='contained'
                            onPress={()=>navigation.navigate('Login')}
                        />     
                    </View>
                      <View style={style.grid}>
                        <Button name='REGISTER'
                            onPress={()=>navigation.navigate('Register')}
                            color={'black'} mode='outlined' />     
                    </View>
                </View>
                
               
            </View>
            
    </Screen>
  )
}

export default SplashScreen

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.primary
    },
    grid: {
        flex: 1,
        paddingHorizontal:5
    },
    btnContainer: {
        height: 100,
        width: '100%',
        display: 'flex',
        flexDirection:'row'
    }

})