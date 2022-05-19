import React from 'react'
import {Text,Alert,FlatList,View,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import { Caption, Headline} from 'react-native-paper';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import Card from '../../components/Card';
import RNscreen from "../../components/RNscreen";
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';
import {Pbutton} from "../../components/Rbutton";
import { UserContext } from '../../context/Context';

const Topop = ({navigation,route}) =>{
    const {id} = React.useContext(UserContext);
    const {motor_id} = route.params;
    const [amnt,setamnt] = React.useState(0);
    const [cardNumber,setcardNumber] = React.useState("");
    const [email,setemail] = React.useState("");
    const [isSelect,setisSelect] = React.useState(false) ;
    const [isloading,setisloading] = React.useState(false);
    const pay = () =>{
        setisloading(true);
        if(cardNumber === "" ){
            Alert.alert("Warning","Please Enter your Card Number")
            setisloading(false);
        }else if(cardNumber.length < 16 || cardNumber.length > 16 ){
            Alert.alert("Warning","Invalid Card Number");
            setisloading(false);
        }else{
            const payload = {
                motor_id:motor_id,
                amount:amnt,
                user_id:id
            }
            API.pay(payload).then(res=>{
                console.log(res);
                if(res.status == 1){
                    Alert.alert("Success",res.message,[{text:"Okay",onPress:()=>navigation.pop()}]);
                    setisloading(false);
                }else{
                    Alert.alert("Error",res.message);
                    setisloading(false);
                }
            })
        }
    }

    const handleselect = (amount) =>{
        if(amount == amnt){
            setamnt(0);
            setisSelect(false)
        }else{
            setamnt(amount);
            setisSelect(true)
        }
    }

    const renderItem = ({item}) =>(
        <TouchableOpacity onPress={()=>handleselect(item.amount)}>
            <View style={{borderRadius:80,width:80,height:80,justifyContent:'center',alignItems:'center',margin:10,borderWidth:1,backgroundColor:item.amount == amnt ? Color.color1 : "white"}}>
                <Text style={{fontWeight:'bold'}}>Php</Text>
                <Text style={{fontWeight:'bold'}}>{item.amount}.00</Text>
            </View>
        </TouchableOpacity>

    )
    return(
        <RNscreen>
            <ScrollView>            
            <View style={style.container}>
                <Image source={require("../../../asset/strip.png")} style={{width:100,height:50,margin:10}}/>
                <View style={style.container2}>
                    <View style={{width:300}}>
                        <Caption>Amount</Caption>
                    </View>
                    
                    <TextInput style={{width:300,backgroundColor:'white'}} onChangeText={(e)=>setamnt(e)} editable={isSelect ? false : true} placeholder={"Php "+amnt.toString()+".00"} value={amnt}/>
                     <FlatList
                        data={dat}
                        keyExtractor={(val,i) => i.toString()}
                        renderItem={renderItem}
                        numColumns={3}
                        style={{flex:1,marginTop:20}}
                    />
                    <View style={{width:300}}>
                        <Caption>Card Number</Caption>
                    </View>
                    <TextInput style={{width:300,marginVertical:5}} onChangeText={(e)=>setcardNumber(e)}/>
                    <View style={{width:300}}>
                        <Caption>Email</Caption>
                    </View>
                    <TextInput style={{width:300,marginVertical:5}} onChangeText={(e)=>setemail(e)}/>
                 
                    <View style={{marginTop:20,width:300}}>
                        <Button name="Top Up" color={Color.color1} mode='contained' disabled={isloading? true :false} onPress={pay} />       
                    </View>
                    <View>
                        <Image source={require("../../../asset/visa.png")} style={{width:300,height:100}}/>
                    </View>
                </View>
            </View>
           
         
           </ScrollView>

        </RNscreen>
    );
}

export default Topop;

const style = StyleSheet.create({
    container:{
        backgroundColor:Color.color2,
        flex:1,
    },
    container2:{
        backgroundColor:"white",
        flex:1,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        alignItems:'center',
        paddingVertical:20
    }
})

const dat = [
    {amount:50},
    {amount:100},
    {amount:200},
    {amount:500},
    {amount:1000},
    {amount:1500}
];