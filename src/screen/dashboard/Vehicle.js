import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View, Text, StyleSheet,Alert, ScrollView ,RefreshControl,FlatList,Image,TouchableOpacity} from 'react-native';
import {  Subheading, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';
import { UserContext } from '../../context/Context';
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';
import Card from '../../components/Card';

const Vehicle  = ({navigation,route}) =>{
    const { user } = React.useContext(UserContext);
    const [has,sethas] = useState(false)
    const [brand, setbrand] = useState(null);
    const [vehiclelist,setvehiclelist] = useState([]);
    const [refresh,setrefresh] = useState(true)
    useEffect(() => {
         getdata();        
    }, [])
   
    const getdata = async () => {
       try{
                let resp = await API.getmotouristabyuser(user.user_id);
                if (resp.status === 1) {
                    setbrand(resp.data[0]);
                    sethas(true);
                    let res = await API.getvehicle(resp.data[0].m_id);
                    console.log(res.data);
                    setvehiclelist(res.data);

                }else{
                    sethas(false)
                }
       }catch(e){
           Alert.alert("Error","Something went wrong")
       }
        
    }

    
    const renderItem = ({item,i}) =>(
        <TouchableOpacity onPress={()=>navigation.navigate("View Vehicle",{...item,from:"fromProfile"})}>
       <Card style={{paddingHorizontal:10,paddingVertical:10}}>
            <View style={style.render}>
                <Image source={{uri:API.baseUrl+item.pic1}} style={{width:100,height:100}}/>
                <View style={style.renderText}>
                    <Subheading>{item.name}</Subheading>
                    <Text>{item.brand}</Text>
                    <Text>{item.transmission}</Text>
                </View>   
            </View>
        </Card>
        </TouchableOpacity>
    )
        console.log(API.baseUrl)
    return ( 
       <RNscreen>
        
            <View style={style.card}>
                {has ?
                    (<>
                        <Title>{brand.motour_name ? brand.motour_name : ""}</Title>
                        <Button name="Add Motorcycle" mode='contained' color={Color.secondary} textColor={Color.white} onPress={()=>navigation.navigate("Add Motor",{m_id:brand.m_id})}/>
                    </>)                
                    :
                    (<>
                         <Title>Motorista</Title>
                        <Button name="Become Motorista" mode='contained' onPress={()=>navigation.navigate("Create Motourista")} color={Color.primary}/>
                    </>)
                }   
               
            </View>
            <View style={style.card}>
                <Title>Motorcycle List</Title>
                
            </View>
           
                <FlatList
                    data={vehiclelist}
                    keyExtractor={(val,i)=>i.toString()}
                    renderItem={renderItem}
                />              
            </RNscreen>
    );
}

export default Vehicle

const style = StyleSheet.create({
    card:{
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
        backgroundColor:'white'
    },
    render:{
        flex:1,
        flexDirection:'row'
    },
    renderImage:{
        width:100,
        height:120
    },
    renderText:{
        paddingHorizontal:15,
        paddingVertical:10
    }
})