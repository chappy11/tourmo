import {ScrollView,View,Image, TouchableOpacity, Text,StyleSheet,ToastAndroid } from 'react-native'
import React,{useState} from 'react'
import Screen from '../components/Screen'
import { Color } from '../utils/Themes'
import {Func} from '../utils/Func'
import { Caption, Checkbox, Dialog, Headline, Title } from 'react-native-paper'
import ImageCropPicker from 'react-native-image-crop-picker'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'

const Register = () => {
  const [read, setread] = useState(false);
  const [isAccept, setisAccept] = useState(false);
  const [img, setimg] = useState("");   
  const [data, setdata] = useState({
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

  const onSubmit = () => {
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
      ToastAndroid.show("Succesfully Registered", ToastAndroid.SHORT);
    }
  }
  return (
    <Screen style={{backgroundColor:Color.primary}}>
      <Headline style={style.headline}>Tourmo</Headline>
      <View style={style.container}>
          <ScrollView>
            <Headline style={{...style.headline,fontSize:20}}>Register</Headline>
              <Title style={{paddingHorizontal:30}}>Account Information</Title>
          <View style={style.inputView}>
                <Caption style={style.label}>Email</Caption>
            <TextInput placeholder="Email" onChangeText={(val)=>onChange('email',val)}/>
          </View>
          <View style={style.inputView}>
                <Caption style={style.label}>Password</Caption>
                <TextInput placeholder="Password" onChangeText={(val)=>onChange('pass',val)}/>
          </View>
          <View style={style.inputView}>
                <Caption style={style.label}>Confirm Password</Caption>
                <TextInput placeholder="Confirm Password" onChangeText={(val)=>onChange('cpass',val)}/>
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
            display: 'flex', flexDirection: "row", ...style.inputView, height: 100, alignItems: 'center'
          }}
            onPress={()=>setread(!read)}
          >
            <Checkbox status={isAccept ? 'checked' : 'unchecked'} /> 
            <Text>Accept Terms and Agreement</Text>
          </TouchableOpacity>
          <View  style={{...style.inputView,marginTop:15}}>
            <Button name="Sign Up" mode='contained' onPress={onSubmit} color={ Color.primary}/>
          </View>
        </ScrollView>
      </View>
         
      
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