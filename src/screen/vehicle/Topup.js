import React from 'react'
import {Text,Alert} from 'react-native'
import { Caption } from 'react-native-paper';
import { Button } from '../../components/Button';
import Card from '../../components/Card';
import RNscreen from "../../components/RNscreen";
import { TextInput } from '../../components/TextInput';
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';
const Topop = ({navigation,route}) =>{
    const {motor_id} = route.params;
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

    return(
        <RNscreen>
           <Card style={{flex:1,padding:20,justifyContent:'center'}}>
                <Caption style={{padding:20,textAlign:'center'}}>Note: Minimum of Top up is 500</Caption>
               <Caption>Card Number</Caption>
               <TextInput placeholder="Card number" onChangeText={(e)=>onChange("cardNumber",e)}/>
                <Caption>Php</Caption>
                <TextInput placeholder="Php" keyboardType="numeric" onChangeText={(e)=>onChange("amount",e)}/>
               
                <Button name="Payment" mode='contained' onPress={pay} color={Color.primary}/>
           </Card>
        </RNscreen>
    );
}

export default Topop;