import React from 'react'
import RNscreen from '../../components/RNscreen';
import { Text,StyleSheet,ScrollView,View,Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Card from '../../components/Card';
import { Avatar, Caption, Headline, Subheading } from 'react-native-paper';
import API, { ip } from '../../endpoints/API';
import {Button} from '../../components/Button'
import { Color } from '../../utils/Themes';
import { NavigationContainer } from '@react-navigation/native';
const ViewBooking = ({route,navigation}) => {
    const data = route.params;
    const popAction = StackActions.pop(1);
    const accept = () =>{
        API.acceptbooking(data.booking_id).then(res=>{
            if(res.status == 1){
                Alert.alert("Success",res.message,[{text:"Okay",onPress:()=>navigation.push("List of Bookings")}]);
                navigation.dispatch(popAction);
            }else{
                Alert.alert("Error",res.message)
            }
        })
    }
    
    return (
        <RNscreen>
            <ScrollView style={{ flex:1}}>
            <Card style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Avatar.Image source={{ uri: ip + data.user_pic }} size={100}/>
                <Headline>{data.firstname+" "+data.middlename+" "+data.lastname}</Headline>
                <Subheading>{data.email}</Subheading>
                <Subheading>{data.contact}</Subheading>
            </Card>
            <Card style={{ flex: 1,padding:20 }}>
                <Caption>NO. of Days</Caption>
                <Text style={style.textData}>{data.no_days}</Text>
                <Caption>Date Start</Caption>
                <Text style={style.textData}>{data.start_date}</Text>
                <Caption>Date End</Caption>
                <Text style={style.textData}>{data.end_date}</Text>
                <Caption>Date Start</Caption>
                <Text style={style.textData}>{data.start_date}</Text>
                <View style={{marginTop:20}}>
                    <Button name="Accept" color={Color.primary} mode='contained' onPress={accept}/>
                </View>
            </Card>
            </ScrollView>
        </RNscreen>
    );
}

export default ViewBooking;

const style = StyleSheet.create({
    textData: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
        color:'black'
    }
})