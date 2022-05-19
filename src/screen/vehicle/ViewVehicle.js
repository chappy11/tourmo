import React from 'react'
import Swiper from "react-native-swiper";
import Card from "../../components/Card";
import {Image,View,Text,ScrollView,Alert,StyleSheet,FlatList} from 'react-native'
import RNscreen from "../../components/RNscreen";
import API from '../../endpoints/API';
import { Caption, Subheading, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';
import { useEffect } from 'react';
import { Pbutton, Sbutton } from '../../components/Rbutton';
import { List } from '../../components/List';
import { useIsFocused } from '@react-navigation/native';

const ViewVehicle = ({navigation,route}) =>{
    const isFocus = useIsFocused();
    const params = route.params;
    const [motor,setmotor] = React.useState({});
    const [earning,setearning] = React.useState(0);
    const [list,setlist] = React.useState([]);
    useEffect(()=>{
        getdata();
    },[route,isFocus])

    useEffect(()=>{
        getearning();
    },[route,isFocus])
    const getdata = async()=>{
        let resp = await API.getmotorbyid(params.motor_id);
        console.log("MYRESPONSE",resp)
        setmotor(resp.data)
    }

    const getearning = async() =>{
        try{
            let resp = await API.getearning(params.motor_id);
            if(resp.status == 1){
                setlist(resp.data);
                setearning(resp.count)
            }
        }catch(e){
            console.log(e)
        }
    }

    const activated = async()=>{
        let resp = await API.activate(motor.motor_id);
        if(resp.status == 1){
            getdata();
            Alert.alert("Success",resp.message);
        }else{
            Alert.alert("Error",resp.message);
        }
    }

    const deactivated = async() =>{
        let resp = await API.deactivate(motor.motor_id);
        if(resp.status == 1){
            getdata();
            Alert.alert("Success",resp.message);
        }else{
            Alert.alert("Error",resp.message);
        }
    }
 

    //  console.log("Params",params);
    return(
        <RNscreen>
            <View style={style.contaner}>
                <Title style={{padding:20,color:'white'}}>
                    View Vehicle
                </Title>

                <View style={style.container2}>
                    <ScrollView>
                            <FromProfile list={list} earning={earning} data={motor} activated={activated} deactivated={deactivated} navigation={navigation}/>
                    </ScrollView>
                    <Card>
        {motor.isActive == 0 ? 
            (
                <View style={{padding:10}}>
                    <Pbutton name="Activate Motorbike" onPress={activated}/>
                </View>
              
            ):(
                <View style={{padding:10}}>
                    <Pbutton name="Deactivate Motorbike" onPress={deactivated}/>
                </View>
            )
        }
        {motor.isVerified == 1 &&
            <View style={{padding:10}}>
                <Sbutton name="Top up" mode='contained' onPress={()=>navigation.navigate("Top up",{motor_id:motor.motor_id})} color={Color.primary}/>
            </View>
        }
        
            <Button name="Update" onPress={()=>navigation.navigate("Update Vehicle",{motor_id:motor.motor_id})}/>
    </Card>

                </View>
            </View>
                      
        </RNscreen>
    );
}

export default ViewVehicle;

const FromProfile = ({data,navigation,activated,deactivated,list,earning}) =>{
    
    return(
       <>
   <Swiper style={{height:300,marginTop:15}}>
            <Image source={{uri:API.baseUrl+data.pic1}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.pic2}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.pic3}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.offRec}} style={{width:'100%',height:300}} resizeMode='contain'/>
            <Image source={{uri:API.baseUrl+data.certReg}} style={{width:'100%',height:300}} resizeMode='contain'/>
         
    </Swiper>
    
    <Card style={{flex:1,paddingHorizontal:15}}>
    <Title>Information</Title>
       <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                 <List color="black" title="Name" value={data.name}/>
         </View>
         <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                 <List color="black" title="Brand" value={data.brand}/>
         </View>
         <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                 <List color="black" title="Transmission" value={data.transmission}/>
         </View>
         <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                 <List color="black" title="Tourmo Points" value={data.tourmopoints}/>
         </View>     
         <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                 <List color="black" title="Rate per Hour" value={"Php "+data.rate}/>
         </View>
         <View style={{flexDirection:'row',marginTop:20}}>
            <View style={{flex:1,alignItems:'flex-start'}}>
                <Title>Total Earning</Title>
            </View>
            <View style={{flex:1,alignItems:'flex-end'}}>   
                <Title>{"Php "+earning+".00"}</Title>
            </View>
         </View>
        {list.map((item,i)=>(
              <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                 <List color="black" title={item.book_date} value={"Php " +item.total_amount}/>
             </View>
        )) }
       
         

            <Text style={{padding:10,marginBottom:10,color:Color.danger,textAlign:"center"}}>{data.isVerified == 0 ? "This Motorcycle is not verified yet please wait for the admin to response" : ""}</Text>
    </Card>
       </> 
    )
}

const style = StyleSheet.create({
    contaner:{
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