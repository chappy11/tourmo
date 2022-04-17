import React from 'react'
import Swiper from "react-native-swiper";
import Card from "../../components/Card";
import {Image,View,Text,ScrollView} from 'react-native'
import RNscreen from "../../components/RNscreen";
import API from '../../endpoints/API';
import { Caption, Subheading, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';
import { useEffect } from 'react';

const ViewVehicle = ({navigation,route}) =>{
    
    const params = route.params;
    const [motor,setmotor] = React.useState({});

    useEffect(()=>{
        getdata();
    },[route])

    const getdata = async()=>{
        let resp = await API.getmotorbyid(params.motor_id);
        console.log("MYRESPONSE",resp)
        setmotor(resp.data)
    }
 
  //  console.log("Params",params);
    return(
        <RNscreen>
            <ScrollView>
                <FromProfile data={motor} navigation={navigation}/>
            </ScrollView>           
        </RNscreen>
    );
}

export default ViewVehicle;

const FromProfile = ({data,navigation}) =>{
    
    return(
       <>
   <Swiper style={{height:300}}>
            <Image source={{uri:API.baseUrl+data.pic1}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.pic2}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.pic3}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.offRec}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.certReg}} style={{width:'100%',height:300}} resizeMode='contain'/>
         
    </Swiper>
    
    <Card style={{flex:1,paddingHorizontal:15}}>
    <Title>Information</Title>
        <Caption>Model</Caption>
        <Subheading style={{marginLeft:15}}>
            {data.name}
        </Subheading>
        <Caption>Brand</Caption>
        <Subheading style={{marginLeft:15}}>
            {data.brand}
        </Subheading>
        <Caption>Transmission</Caption>
        <Subheading style={{marginLeft:15}}>
            {data.transmission}
        </Subheading>
        <Caption>Tourmopoints</Caption>
        <Subheading style={{marginLeft:15}}>
            {data.tourmopoints}
        </Subheading>
 
    </Card>
    <Card>
        {data.isVerified == 1 &&
             <Button name="Top up" mode='contained' onPress={()=>navigation.navigate("Top up",{motor_id:data.motor_id})} color={Color.primary}/>
        }
       
       <Button name="Update"/>
    </Card>
    </> 
    )
}