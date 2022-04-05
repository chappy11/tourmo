import React,{useState} from 'react'
import { StyleSheet,View,Text} from 'react-native';
import Swiper from "react-native-swiper";
import {Title} from 'react-native-paper'
import { Button } from '../../components/Button';
import Screen from '../../components/Screen';
import { TextInput } from '../../components/TextInput';
import { Color } from '../../utils/Themes';



const CreateMoutorista = () => {
    const [isView, setisView] = React.useState(true);
    console.log(isView)
    return (
        <Screen>
            {isView ? (
                <Slide onPress={()=>setisView(false)}/>
            ): (
                <View>
                  <TextInput/>      
                </View>
            )}
            
        </Screen>
    );
}

export default CreateMoutorista;


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
        
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center'
    }
})


export const Slide = () => {
    return (
        <Swiper horizontal={true} style={{flex:1}} index={0}>
        <View style={style.item}>
            <View>
                <Title>
                    Create Moutorista
                </Title>
                <Text>
                    How Its works blba bal
                </Text>
            </View>
        </View>
         <View>
                <Title>
                    Terms and Condition balbal    
                </Title>
                <Text>
                    bal bal bal bal bal
                </Text>
                <Button name="Okay" color={Color.primary} />
        </View>
    </Swiper>
    )
}
