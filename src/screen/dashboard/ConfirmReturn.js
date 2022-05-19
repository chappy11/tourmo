import React from 'react';
import RNscreen from '../../components/RNscreen';
import {View,StyleSheet,Image,Alert} from 'react-native'
import { Color } from '../../utils/Themes';
import { Headline, Subheading } from 'react-native-paper';
import API, { ip } from '../../endpoints/API';
import { List } from '../../components/List';
import { Pbutton } from '../../components/Rbutton';
import { Func } from '../../utils/Func';
const ConfirmReturn = ({navigation,route}) =>{
    const data = route.params.item;
    const [isloading,setisloading] = React.useState(false);
    const [booking, setbooking] = React.useState({});
    
    React.useEffect(() => {
         
         viewbooking();
     
    },[route])

    
    const viewbooking = async() => {
        let resp = await API.getbookingbyuser(data.user_id);
        
        console.log("RESPONSE",resp.data);
        if (resp.status == 1) {
            // setcount(calculate(resp.data[0].end_date));
            // sethasbooking(true)
            setbooking(resp.data[0]);
            //setonStart(resp.data[0].onStart);
     
     
        } else {
            sethasbooking(false);
        }
        
    }

    const handlereturn = async() =>{
            setisloading(true);
            let resp = await API.confirmReturn(data.booking_id);
            if(resp.status == 1){
                setisloading(false);
                Alert.alert("Success",resp.message);
                navigation.push("On Going")
            }else{
                Alert.alert("Error",resp.message);
                setisloading(false);
            }
    }

    const cancelbooking = async() =>{
        setisloading(true);
        try{
            let resp = await API.mcancelbooking(data.booking_id);
            if(resp.status == 1){
                setisloading(false);
                viewbooking();
                Alert.alert("Success",resp.message);
            }else{
                setisloading(false);
                Alert.alert("Error",resp.message);
            }
        }catch(e){
            setisloading(false)
            console.log(e);
        }
    }

    const startbooking = async()=>{
        setisloading(true)
        try{
            let resp = await API.startbooking(data.booking_id);
            if(resp.status == 1){
                setisloading(false)
                Alert.alert("Success",resp.message);
                viewbooking();
            }else{
                Alert.alert("Error",resp.message);
                setisloading(false);
            }
        }catch(err){
            console.log("ERROR",err)
            setisloading(false)
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
                        <Image source={{uri:ip+booking.pic2}} style={{height:200,width:200,margin:20}}/>
                    </View>
                    <View style={style.container3}>
                        <Headline style={{color:Color.color1,fontWeight:'bold'}}>{booking.name}</Headline>
                        <Subheading style={style.text3}>{booking.brand}</Subheading>
                        <View style={{marginVertical:10}}>
                            <List title="Start Date" value={booking.end_date}/>
                            <List title="End Date" value={booking.end_date}/>
                            <List title="Tourista" value={booking.firstname+" "+booking.middlename+" "+booking.lastname}/>
                            <List title="Total Amount" value={"Php "+booking.total_amount}/>
                        </View>
                        <View>
                            {booking.booking_status == 2 &&
                                     <Pbutton name="Confirm Return" disabled={isloading ?true : false} onPress={handlereturn}/>
                            }
                            {booking.booking_status == 1 && Func.datebetween(booking.start_date, booking.end_date).includes(Func.dateformat(new Date)) &&
                               <>
                               {booking.onStart == 0   &&
                                        <Pbutton name="Start Now" onPress={startbooking} disabled={isloading ?true : false} />
                                }
                                {booking.onStart == 0 && Func.addDate(booking.start_date) == Func.dateformat(new Date) && 
                                        <Pbutton name="Cancel Booking" onPress={cancelbooking} disabled={isloading ?true : false}/>
                                }
                                </>
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

