import React from 'react';
import RNscreen from '../../components/RNscreen';
import {View,StyleSheet,Image,Alert} from 'react-native'
import { Color } from '../../utils/Themes';
import { Headline, Subheading } from 'react-native-paper';
import API, { ip } from '../../endpoints/API';
import { List } from '../../components/List';
import { Pbutton } from '../../components/Rbutton';
const ConfirmReturn = ({navigation,route}) =>{
    const data = route.params.item;
    
    const handlereturn = async() =>{
            let resp = await API.confirmReturn(data.booking_id);
            if(resp.status == 1){
              
                Alert.alert("Success",resp.message);
                navigation.push("On Going")
            }else{
                Alert.alert("Error",resp.message);
            }
    }

    console.log(data.booking_status);
    return(
        <RNscreen>
            <View style={style.container}>
                <View>
                    <Headline style={{color:'white',fontWeight:'bold',padding:10}}>On Going Booking</Headline>
                </View>
                <View style={style.container2}>
                    <View style={{alignItems:'center'}}>
                        <Image source={{uri:ip+data.pic2}} style={{height:200,width:200,margin:20}}/>
                    </View>
                    <View style={style.container3}>
                        <Headline style={{color:Color.color1,fontWeight:'bold'}}>{data.name}</Headline>
                        <Subheading style={style.text3}>{data.brand}</Subheading>
                        <View style={{marginVertical:10}}>
                            <List title="Start Date" value={data.end_date}/>
                            <List title="End Date" value={data.end_date}/>
                            <List title="Tourista" value={data.firstname+" "+data.middlename+" "+data.lastname}/>
                            <List title="Total Amount" value={"Php "+data.total_amount}/>
                        </View>
                        <View>
                            {data.booking_status == 2 &&
                                     <Pbutton name="Confirm Return" onPress={handlereturn}/>
                            }
                           
                        </View>
                    </View>
                </View>
            </View>
        </RNscreen>
    );
}

export default ConfirmReturn;

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.color2
    },
    container2:{
        flex:1,
        backgroundColor:'white',
        borderTopEndRadius:20,
        borderTopStartRadius:20
    },
    container3:{
        flex:1,
        backgroundColor:Color.color2,
        marginHorizontal:10,
        borderRadius:20,
        paddingHorizontal:20,
        paddingTop:20
    },
    text3:{
        color:Color.color1
    }
})

