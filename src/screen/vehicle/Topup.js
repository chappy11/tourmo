import React from 'react'
import {Text,Alert,FlatList,View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import { Caption, Headline} from 'react-native-paper';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import Card from '../../components/Card';
import RNscreen from "../../components/RNscreen";
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';
import {Pbutton} from "../../components/Rbutton";

const Topop = ({navigation,route}) =>{
    const {motor_id} = route.params;
    const [amnt,setamnt] = React.useState(0);
    const [input,setinput] = React.useState({
        cardNumber:"",
        amount:0
    });

    const onChange = (name,val) =>{
        setinput({...input,[name]:val})
    }

    const pay = () =>{
        if(input.cardNumber === "" ){
            Alert.alert("Warning","Please Enter your Card Number")
        }else if(input.amount < 500){
            Alert.alert("Warning","The Minimum top up is 500")
        }else{
            const payload = {
                motor_id:motor_id,
                points:input.amount
            }
            API.addpoints(payload).then(res=>{
                if(res.data.status == 1){
                    Alert.alert("Success",res.data.message,[{text:"Okay",onPress:()=>navigation.pop()}]);
                }else{
                    Alert.alert("Error",res.data.message);
                }
            })
        }
    }

    const handleselect = (amount) =>{
        if(amount == amnt){
            setamnt(0)
        }else{
            setamnt(amount)
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
            <View style={style.container}>
                <Image source={require("../../../asset/strip.png")} style={{width:100,height:50,margin:10}}/>
                <View style={style.container2}>
                    <TextInput style={{width:300,backgroundColor:'white'}} disabled placeholder={"Php "+amnt.toString()+".00"} value={amnt}/>
                     <FlatList
                        data={dat}
                        keyExtractor={(val,i) => i.toString()}
                        renderItem={renderItem}
                        numColumns={3}
                    />
                    <View style={{marginTop:20,width:300}}>
                        <Button name="Top Up" color={Color.color1} mode='contained' />       
                    </View>
                    <View>
                        <Image source={require("../../../asset/visa.png")} style={{width:300,height:100}}/>
                    </View>
                </View>
            </View>
           
           {/* <Card style={{flex:1,padding:20,justifyContent:'center'}}>
                <Caption style={{padding:20,textAlign:'center'}}>Note: Minimum of Top up is 500</Caption>
               <Caption>Card Number</Caption>
               <TextInput placeholder="Card number" onChangeText={(e)=>onChange("cardNumber",e)}/>
                <Caption>Php</Caption>
                <TextInput placeholder="Php" keyboardType="numeric" onChangeText={(e)=>onChange("amount",e)}/>
               
                <Button name="Payment" mode='contai111ned' onPress={pay} color={Color.primary}/>
           </Card> */}
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
    {amount:20},
    {amount:50},
    {amount:100},
    {amount:200},
    {amount:500},
    {amount:1000}
];