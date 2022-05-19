import React from 'react'
import RNscreen from '../../components/RNscreen';
import { Text,StyleSheet,ScrollView,View,Alert,Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Card from '../../components/Card';
import { Avatar, Caption, Headline, Subheading, Title } from 'react-native-paper';
import API, { ip } from '../../endpoints/API';
import {Button} from '../../components/Button'
import { Color } from '../../utils/Themes';
import { NavigationContainer } from '@react-navigation/native';
import { List } from '../../components/List';
import { Pbutton } from '../../components/Rbutton';


const ViewBookingHistory = ({route,navigation}) => {
    const data = route.params.item;
    const popAction = StackActions.pop(1);
    console.log(data);
    
    return (
        <RNscreen>
            <View style={style.container}>
                <Title style={{padding:15,color:'white'}}>History</Title>
                <View style={style.container2}>
                  <ScrollView style={{ flex:1}}>
                    <Card style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image source={{ uri: ip + data.user_pic }} size={100}/>
                        <Headline>{data.firstname+" "+data.middlename+" "+data.lastname}</Headline>
                        <Subheading>{data.email}</Subheading>
                        <Subheading>{data.contact}</Subheading>
                    </Card>
                    <Title style={{paddingVertical:10}}>Booking Data</Title>
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                          <List color="black" title="Number of Days" value={data.no_days == 1 ? data.no_days+" day" : data.no_days+" days"}/>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                          <List color="black" title="Start Date" value={data.start_date}/>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                          <List color="black" title="End Date" value={data.end_date}/>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                          <List color="black" title="Deducted Tourmopoints" value={data.deducted}/>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                          <List color="black" title="Booking Stauts" value={data.booking_status == 5 ? "Completed" : "Canceled"}/>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                          <List color="black" title="Total" value={"Php "+data.total_amount}/>
                    </View>
                    <View style={{height:300,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Image source={{uri:ip+data.license_pic}} style={{width:200,height:200}}/>
                    </View>

            </ScrollView>
                   
                </View>
            </View>
        </RNscreen>
    );
}

export default ViewBookingHistory;

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
    },
    textData: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
        color:'black'
    }
})