import React from 'react';
import RNscreen from '../../components/RNscreen';
import { Caption, Headline, Paragraph, Text, Title } from 'react-native-paper';
import {StyleSheet,View} from 'react-native';
import { Color } from '../../utils/Themes';
import { Pbutton } from '../../components/Rbutton';

const ViewNotification = ({route,navigation}) =>{
    console.log(route.params.item)
    const data = route.params.item;
    return(
        <RNscreen>
            <View style={style.container}>
                    <Headline style={{padding:20,color:'white',fontWeight:'bold'}}>View Notification</Headline>
                    <View style={style.container2}>
                        <View style={{padding:20}}>
                            <Title>{data.notif_title}</Title>
                            <Caption>{data.notif_date}</Caption>
                        </View>
                        <View style={{paddingHorizontal:20,paddingVertical:2}}>
                            <Paragraph>{data.notif_body}</Paragraph>
                        </View>
                      
                    </View>
                    <Pbutton name="Back" onPress={()=>navigation.push("notification")}/>
            </View>
        </RNscreen>
    );
}

export default ViewNotification;

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.color2
    },
    container2:{
        flex:1,
        backgroundColor:'white',
        borderTopStartRadius:20,
        borderTopEndRadius:20
    }
})