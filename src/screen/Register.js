import {ScrollView,View,Image, TouchableOpacity, Text,StyleSheet,ToastAndroid } from 'react-native'
import React,{useState} from 'react'
import Screen from '../components/Screen'
import { Color } from '../utils/Themes'
import {Func} from '../utils/Func'
import { Caption,  Dialog, Headline, Title,Checkbox } from 'react-native-paper'
import ImageCropPicker from 'react-native-image-crop-picker'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'
import API from '../endpoints/API'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { NavigationContainer } from '@react-navigation/native'

const Register = ({navigation}) => {

  const [read, setread] = useState(false);
  const [vcode,setvcode] = useState("");
  const [isSend,setisSend] = useState(false);
  const [isprocess,setisprocess] = useState(false);
  const [isConfirm,setisConfirm] = useState(false);
  const [isAccept, setisAccept] = useState(false);
  const [img, setimg] = useState("");   
  const [data, setdata] = useState({
    code:"",
    image: "none",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    pass: "",
    cpass: "",
    contact: "",
    license:"none",
  });

  const getYourImg = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      compressImageQuality:0.7
    }).then(image => {
        setdata({...data,image:image.path})
    })
  }

  const getLicenseImg = () => {
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            compressImageQuality:0.7
        }).then(image => {
       
          setdata({...data,license:image.path})
        });
  }
  

  const onChange = (name, val) => {
    setdata({
      ...data,[name]:val
    })
  }

  const verify = () =>{
    setisprocess(true)
    if(vcode == data.code){
      setisConfirm(true)
      setisprocess(false);
    }else{
      ToastAndroid.show("Invalid Code please check your email again",ToastAndroid.LONG);
      setisprocess(false)  
    }
  }

  const sendCode = () =>{
    setisprocess(true)
    code = Math.floor(100000 + Math.random() * 900000)
    console.log(code);
    const payload = {
      email:data.email,
      code: code
    }
   
    API.sendEmail(payload).then(res=>{
      if(res.data.status === 1){
        setisSend(true);
        setvcode(code)
        ToastAndroid.show(res.data.message,ToastAndroid.LONG);
        setisprocess(false)
      }else{
        ToastAndroid.show(res.data.message,ToastAndroid.LONG);
        setisprocess(false);
      }
    })
  }

  const onSubmit = () => {
    setisprocess(true)
    if (data.email === "" || data.pass === "" || data.cpass === "" || data.fname === "" || data.mname === "" || data.lname === "" || data.contact === "") {
      ToastAndroid.show("Fill Please Fill out all fields", ToastAndroid.SHORT);
    }
    else if (!Func.isEmail(data.email)) {
      ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
    }
    else if (data.pass !== data.cpass) {
      ToastAndroid.show("Password do not match", ToastAndroid.SHORT);
    } else if (Func.isValidPhone(data.contact)) {
      ToastAndroid.show("Invalid Phone Number", ToastAndroid.SHORT);
    } else if (!isAccept) {
      ToastAndroid.show("Please Accept and Read Tourmo Terms and Regulation", ToastAndroid.SHORT);
    } else if (data.image === "none") {
      ToastAndroid.show("Please put your picture",ToastAndroid.SHORT)
    } else if (data.license === "none") {
      ToastAndroid.show("Please put your Driver's License")
    }else {
      let formData = new FormData(); 
      formData.append("fname",data.fname);
      formData.append("mname",data.mname);
      formData.append("lname",data.lname);
      formData.append("contact",data.contact);
      formData.append("email",data.email);
      formData.append("password",data.pass);
      formData.append("user_pic",{
        uri:data.image,
        type:'image/png',
        name:Func.filename(data.image)           
     })
     formData.append("license",{
       uri:data.license,
       type:'image/png',
       name:Func.filename(data.license)
     })
  

     API.register(formData).then(res=>{
      const {message,data,status} = res.data 
      if(status == 1){
        ToastAndroid.show(message,ToastAndroid.LONG)
        setisprocess(false)
        navigation.navigate("Login");
      }else{
        ToastAndroid.show(message,ToastAndroid.LONG)
        setisprocess(false)
      }
     })

   
    }
  }
  return (
    <Screen style={{backgroundColor:Color.primary}}>
      <Headline style={style.headline}>Tourmo</Headline>
      
      {!isConfirm &&

          <View style={{...style.container,marginTop:200}}>
            {isSend ? (
              <>
              <Title style={{padding:20}}>Verify Email</Title>
               <View style={style.inputView}>
               <Text>Please check your email we send you your verification code</Text>
          </View>
          <View style={style.inputView}>
             <Caption style={style.label}>Code</Caption>
             <TextInput placeholder="6-digin code" onChangeText={(val)=>onChange('code',val)}/>
           </View>
           <View style={style.inputView}>
               <Button name="Verify" color={Color.primary} disabled={isprocess ? true : false} onPress={verify} mode='contained'/>
           </View>
           </>
            ):(
              <>
              <Title style={{padding:20}}>Verify Email</Title>
              <View style={style.inputView}>
                  <Text>We will send you and email</Text>
              </View>
            <View style={style.inputView}>
              <Caption style={style.label}>Email</Caption>
              <TextInput placeholder="Email" onChangeText={(val)=>onChange('email',val)}/>
            </View>
            <View style={style.inputView}>
                <Button name="Send" color={Color.primary} disabled={isprocess ? true : false}  onPress={sendCode} mode='contained'/>
            </View>
     </>
            
            )}
            
          </View> 
         
      }
      {isConfirm &&
         <View style={style.container}>
              <ScrollView>
                <Headline style={{...style.headline,fontSize:20}}>Register</Headline>
                  <Title style={{paddingHorizontal:30}}>Account Information</Title>
              <View style={style.inputView}>
                  <Caption style={style.label}>Email</Caption>
                  <TextInput editable={false} value={data.email}/>
              </View>
              <View style={style.inputView}>
                    <Caption style={style.label}>Password</Caption>
                    <TextInput placeholder="Password" onChangeText={(val)=>onChange('pass',val)} secureTextEntry={true}/>
              </View>
              <View style={style.inputView}>
                    <Caption style={style.label}>Confirm Password</Caption>
                    <TextInput placeholder="Confirm Password" onChangeText={(val)=>onChange('cpass',val)} secureTextEntry={true}/>
              </View> 
               <View style={ style.line}/>
              <Title style={{ paddingHorizontal: 30 }}>Account Information</Title>
              <View style={style.inputView}>
                    <Caption style={style.label}>Firstname</Caption>
                    <TextInput placeholder="Firstname" onChangeText={(val)=>onChange('fname',val)}/>
              </View>
                <View style={style.inputView}>
                    <Caption style={style.label}>Middlename</Caption>
                    <TextInput placeholder="Middlename" onChangeText={(val)=>onChange('mname',val)}/>
              </View>
                <View style={style.inputView}>
                    <Caption style={style.label}>Lastname</Caption>
                    <TextInput placeholder="Lastname" onChangeText={(val)=>onChange('lname',val)}/>
              </View>
              <View style={style.inputView}>
                    <Caption style={style.label}>Contact Number</Caption>
                    <TextInput placeholder="+63" onChangeText={(val)=>onChange('contact',val)}/>
              </View>  
              
            
               <View style={style.inputView}>
                <Caption style={style.label}>Your Picture</Caption>
                <TouchableOpacity onPress={getYourImg} style={style.image}>
                  {data.image !== "none" &&
                    <Image source={{ uri: data.image }} style={style.image} />
                  }
                </TouchableOpacity>
              </View>
              <View style={style.inputView}>
                <Caption style={style.label}>Driver License Picture</Caption>
                <TouchableOpacity onPress={getLicenseImg} style={style.image }>
                  {data.license !== "none" &&
                      <Image source={{ uri: data.license }} style={style.image} />
                  }
                  
                </TouchableOpacity>
              </View>
                
              <TouchableOpacity style={{
                display: 'flex', flexDirection: "row", ...style.inputView, height: 200, alignItems: 'center'
              }}
                onPress={()=>setread(!read)}
              >
                {isAccept ? (  <BouncyCheckbox isChecked={true}  disableBuiltInState/>) : (  <BouncyCheckbox isChecked={false}  disableBuiltInState/>)}
              
                <Text>Accept Terms and Agreement</Text>
              </TouchableOpacity>
              <View  style={{...style.inputView,marginTop:15}}>
                <Button name="Sign Up" mode='contained' disabled={isprocess} onPress={onSubmit} color={ Color.primary}/>
              </View>
            </ScrollView>
          </View>
      }
    
         
      
      <Dialog onDismiss={() => setread(!read)} visible={read}>
            <Dialog.Title>Terms and Agreement</Dialog.Title>
            <Dialog.ScrollArea>
              <Text>Terms and Condition bla bla</Text>
            </Dialog.ScrollArea>
        <Dialog.Actions>
          <View style={{display:'flex',flexDirection:'row'}}>
            <View style={{marginHorizontal:2}}>
              <Button name={isAccept ? "Unaccept" : "Accept"} mode='contained' color={Color.primary}
                onPress={() => {
                  setisAccept(!isAccept)
                  setread(!read)
                }} />
            </View>       
            <View>
              <Button name="Close" mode='contained' color={Color.danger} onPress={()=>setread(!read)}/>
            </View>
           
              
          </View>
        
            </Dialog.Actions>
          </Dialog>

    </Screen>
  )
}

export default Register


const style = StyleSheet.create({
  headline: {
    padding:20,
    fontSize: 40,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    marginHorizontal:5,
  },
  srollview: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical:10,
  },
  inputView: {
    paddingHorizontal:15,
    paddingVertical:5,
  },
  label: {
    paddingVertical:3,
    paddingHorizontal: 10,
    fontSize: 15,
    color:'black'
  },
  image: {
    backgroundColor: 'whitesmoke',
    width: 200,
    height: 250,
    alignSelf:'center'
  },
  line: {
    borderWidth: 1,
    borderColor:Color.primary,
    marginVertical:10
  }
})