import { Picker } from '@react-native-picker/picker';
import React from 'react'
import {View,StyleSheet,ImageBackground,Text,ScrollView,TouchableOpacity} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Caption } from 'react-native-paper';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';

const AddVehicle = ({ navigation, route }) => {
    const [data, setdata] = React.useState({
        pic1: "",
        pic2: "",
        pic3: "",
        brand: "",
        name: "",
        transmission: "",
        or: "",
        cr:""
    });

    const onChange = (name,value) => {
        setdata({...data,[name]:value})
    }

    const frontImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
        }).then(res => {
            onChange("pic1", res.path);
        })
    }

    const sideImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
        }).then(res => {
            onChange("pic2",res.path)
        })
    }

    const backImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality: 0.7
        }).then(res => {
            onChange("pic3",res.path)
        })
    }

    const orImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
        }).then(res => {
            onChange("or",res.path)
        })
    }

    const crImage = () => { 
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
        }).then(res => {
            onChange("cr",res.path)
        })
    }

    console.log(route.params.m_id)
    return (
        <RNscreen style={{backgroundColor:'white'}}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <ImageBackground source={{uri:data.pic1}} style={style.imagebackground}>
                                    <Text>Front View</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <ImageBackground style={style.imagebackground} source={{uri:data.pic2}}>
                                    <Text>Side View</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                 </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity>
                        <ImageBackground style={style.imagebackground} source={{ uri: data.pic3 }}>
                            <Text>Back View</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={style.pickerContainer}>
                    <Caption>Motor brand</Caption>
                    <Picker
                        style={style.pickerStyle}
                        selectedValue={data.brand}
                        onValueChange={(val,i)=>onChange("brand",val)}
                    >
                        <Picker.Item label='Please choose' />
                        <Picker.Item label="Suzuki" value="Suzuki" />
                        <Picker.Item label="Yamaha" value="Yamaha" />
                        <Picker.Item label='Kawasaki' value='Kawasaki'/>
                    </Picker>
                </View>
                 <View style={style.pickerContainer}>
                    <Caption>Model Name</Caption>
                    <Picker
                        style={style.pickerStyle}
                        selectedValue={data.name}
                        onValueChange={(val,i)=>onChange("name",val)}
                    >
                        <Picker.Item label='Please choose' />
                        <Picker.Item label="MIO 125" value="MIO 125" />
                        <Picker.Item label="Click 150" value="Click 150" />
                        <Picker.Item label='Raider 150' value='Raider 150'/>
                    </Picker>
                </View>
                 <View style={style.pickerContainer}>
                    <Caption>Transmission</Caption>
                    <Picker
                        style={style.pickerStyle}
                        onValueChange={(val,i)=>onChange("transmission",val)}
                    >
                        <Picker.Item label='Please choose' />
                        <Picker.Item label="AT" value="AT" />
                        <Picker.Item label='MT' value='MT'/>
                    </Picker>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity>
                        <ImageBackground style={style.imagebackground}>
                            <Text>Official Reciept Photo</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity>
                            <ImageBackground style={style.imagebackground}>
                                <Text>Certifition of Registration</Text>
                            </ImageBackground>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </RNscreen>
    );
}

export default AddVehicle;

const style = StyleSheet.create({
      imagebackground: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        margin:10
    },
    pickerStyle: {
        backgroundColor: 'whitesmoke',
        padding: 5,
    },
    pickerContainer: {
        paddingHorizontal: 10,
        paddingVertical:5
    }
})