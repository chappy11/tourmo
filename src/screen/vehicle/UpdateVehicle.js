import RNscreen from "../../components/RNscreen";
import Card from '../../components/Card';
import React from 'react'
import {Caption, Modal} from 'react-native-paper';
import {ScrollView,ImageBackground,Text,View,TouchableOpacity,Image,Alert} from 'react-native';
import ImageCropPicker from "react-native-image-crop-picker";
import { TextInput } from "../../components/TextInput";
import CalendarPicker from "react-native-calendar-picker/CalendarPicker";
import { Func } from "../../utils/Func";
import { Button } from "../../components/Button";
import { Color } from "../../utils/Themes";
import API from "../../endpoints/API";


const UpdateVehicle = ({route}) =>{
    const {motor_id} = route.params;
    const [isLoading,setisLoading] = React.useState(false);
    const [data,setdata] = React.useState({
        or:"",
        cr:"",
        date:""
    })
    console.log(motor_id)
    const [openCalendar,setopenCalendar] = React.useState(false);

    const onChange = (name,val) =>{
        setdata({...data,[name]:val})
    }

    const openOr = () =>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
        }).then(res => {
            onChange("or",res.path)
        })
    
    }

    const openCr = () =>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
        }).then(res => {
            onChange("cr",res.path)
        })
    }

    const submit = () =>{
        setisLoading(true)
        if(data.or === "" || data.cr === "" || data.date === ""){
            Alert.alert("Warning","You Should Update all Data")
        }else{
            let formdat = new FormData();
            formdat.append('offRec', {
                uri: data.or,
                type: 'image/png',
                name: Func.filename(data.or)
            });
            formdat.append('certReg', {
                uri: data.cr,
                type: 'image/png',
                name:Func.filename(data.cr)
            })
            formdat.append("motor_id",motor_id);
            formdat.append("date",data.date);
            API.updatevehicle(formdat).then(res=>{
                console.log(res.data);
                if(res.data.status == 1){
                    Alert.alert("Success",res.data.message);
                    setisLoading(false)
                }else{
                    Alert.alert("Warning",res.data.message);
                    setisLoading(false);
                }
            })
        }
      
    }

    return(
        <RNscreen style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <Card style={{alignItems:"center",flex:1}}>
                    <Text>Official Receipt</Text>
                    <TouchableOpacity onPress={openOr}>
                            <ImageBackground source={{uri:data.or}}   style={{height:150,width:150,justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',margin:20}}>
                                <Text style={{textAlign:'center'}}>Update Your Official Reciept</Text>
                            </ImageBackground>
                    </TouchableOpacity>
                    
                    <Text>Certification of Registration</Text>
                    <TouchableOpacity onPress={openCr}>
                            <ImageBackground source={{uri:data.cr}} style={{height:150,width:150,justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',margin:20}}>
                                <Text style={{textAlign:'center'}}>Update Your Official Reciept</Text>
                            </ImageBackground>
                    </TouchableOpacity>
                    <View style={{width:'80%'}}>
                            <Caption>Expiry License</Caption>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{flex:1}}>
                                <TextInput disabled placeholder={data.date} />
                                </View> 
                                <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                                <TouchableOpacity onPress={()=>setopenCalendar(true)}>
                                    <Image source={require('../../../asset/icon/calendar.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>    
                                </View>
                                </View>
                    </View>
                    
                       <View style={{width:'80%',marginVertical:20}}>
                        <Button name="Update Now" onPress={submit} color={Color.primary} mode='contained'/>
                       </View>
                </Card>
            </ScrollView>
            <Modal visible={openCalendar} onDismiss={()=>setopenCalendar(false)} style={{backgroundColor:'white'}}>
        <CalendarPicker
           startFromMonday={true}
           minDate={new Date()}
           todayBackgroundColor="#f2e6ff"
           onDateChange={(date)=>{
             onChange("date",Func.dateformat(date));
             setopenCalendar(false)
           }}
        />
      </Modal>
        </RNscreen>
    );
}

export default UpdateVehicle;