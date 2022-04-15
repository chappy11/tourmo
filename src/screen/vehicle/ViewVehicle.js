import React from 'react'
import Swiper from "react-native-swiper";
import Card from "../../components/Card";
import {Image,View,Text} from 'react-native'
import RNscreen from "../../components/RNscreen";
import API from '../../endpoints/API';
import { Caption, Subheading, Title } from 'react-native-paper';

const ViewVehicle = ({navigation,route}) =>{
    
    const params = route.params
 
    console.log("Params",params);
    return(
        <RNscreen>
            
            <FromProfile data={params}/>
        </RNscreen>
    );
}

export default ViewVehicle;

const FromProfile = ({data}) =>{
    
    return(
       <>
   <Swiper>
         
            <Image source={{uri:API.baseUrl+data.pic1}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.pic2}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.pic3}} style={{width:'100%',height:300}} resizeMode='contain'/>
         
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
    </Card>
    </> 
    )
}