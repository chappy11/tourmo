import { View, Text, StyleSheet, Image,ToastAndroid } from 'react-native'
import React,{useState} from 'react'
import { Button } from '../components/Button';
import { Button as Btn } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { Color } from '../utils/Themes';
import Screen from '../components/Screen';
import { Headline } from 'react-native-paper';
import { TextInput } from '../components/TextInput';
import API from '../endpoints/API';


const Login = ({navigation}) => {
  
    const [input,setinput] = useState({
        email:"",
        password:""
    })

    const onChange = (name,val) =>{
        setinput({...input,[name]:val})
    }

    const submit = () =>{
       
        if(input.email === "" || input.password === ""){
            ToastAndroid.show("Fillout all fields",ToastAndroid.LONG);
        }else{
            const payload = {
                email:input.email,
                password:input.password
            }
            API.login(payload).then(res=>{
              
                console.log(res.data);
                const {message,status} = res.data;
                if(status == 1){
                    ToastAndroid.show(message,ToastAndroid.LONG);
                }else{
                    ToastAndroid.show("Wrong Credential",ToastAndroid.LONG)
                }
            })
        }
    }


    const toRegister = () => {
        navigation.navigate('Register');
    }

    return (
    <Screen style={{backgroundColor:Color.primary}}>
        <View style={{flex:1}}>
            <View style={style.headers}>
                <Image source={require('../../asset/dowload.png')} style={{width:'80%',height:'80%'}} resizeMode='contain' />
            </View>
            <View style={style.content}>
                    <View style={style.body}>
                        <Headline>Login</Headline>       
                    </View>
                    <View style={{paddingVertical:5,paddingHorizontal:15}}>
                        <Text style={style.label}>Email</Text>
                        <TextInput placeholder='Email' onChangeText={(e)=>onChange("email",e)} />
                    </View>
                      <View style={{paddingVertical:5,paddingHorizontal:15}}>
                        <Text style={style.label}>Password</Text>
                        <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(e)=>onChange("password",e)}/>
                    </View>
                     <View style={{paddingVertical:10,paddingHorizontal:15}}>
                        <Button color={Color.primary} mode='contained' name="Sign in" onPress={submit}/>
                    </View>
                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent:'center',alignItems:'center'}}>
                        <Text>Not Registered yet? </Text>
                        <Btn
                            onPress={toRegister}
                            color={Color.secondary}>Sign Up</Btn>
                    </View>
                    
            </View>
        </View>
    </Screen>
  )
}

export default Login


const style = StyleSheet.create({
    headers: {
        flex: 1,
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        backgroundColor: Color.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    body: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 15
    },
   
    label: {
        color: 'gray',
        marginBottom: 5,
        marginLeft:10
    }
})