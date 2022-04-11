import { Picker } from '@react-native-picker/picker';
import React from 'react'
import {View,StyleSheet,ImageBackground,Text,ScrollView,TouchableOpacity,FlatList} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Caption, Title } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';
import API from '../../endpoints/API';
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
    const [isSelect, setisSelect] = React.useState(false);

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
            {isSelect ?
                (
                    <>
                    <Choose/>
                    </>
                )
                :
                    (
                <ScrollView style = {{ flex: 1 }}>
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
                <View style={{ flexDirection:'row'}}>
                    <Text>Motorcycle :</Text>
                    <Button onPress={()=>setisSelect(true)}>SEARCH</Button>    
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
            </ScrollView>)
            }
          

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
    },
    renderItem: {
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: 'whitesmoke',
        padding:10
        
    }
})



export const Choose = () => {
    const [list, setlist] = React.useState([]);
    const [backup, setbackup] = React.useState([]);
    const [isEmpty, setisEmpty] = React.useState(false);
    const [search, setsearch] = React.useState("");
    React.useEffect(() => {
        getlist();
      
    }, [])
    
    const getlist = async() => {
        let res = await API.getlistofmotorcycle();
        console.log(res.data);
        if (res.status == 1) {
            setlist(res.data);
            setbackup(res.data);
            setisEmpty(false)
        } else {
            setisEmpty(true)
        }
    }

    const onChange = (value) => {
        setsearch(value);
        filterdata(value)
    }

    const filterdata = (value) => {
          if (value== "") {
            setlist(backup);
        } else {
            let data = backup;
            value = value.toLowerCase();
            data = data.filter(val => val.name.toLowerCase().match(value));
            setlist(data);
        }
    }
    

    const renderItem = ({ item }) => (
        <View style={style.renderItem}>
            <Title>{item.name}</Title>
            <Text>{item.brand}</Text>
            <Text>{item.transmission}</Text>
        </View>
    );
    return (
        <View style={{flex:1}}>
            <TextInput style={{backgroundColor:'white',marginHorizontal:15}} placeholder="Search" onChangeText={(e)=>onChange(e)} />

            {isEmpty &&
                <Text>No Data found</Text>
            }
            
            <FlatList
                data={list}
                key={(va, i) => i.toString()}
                renderItem={renderItem}
                style={{ flex:1}}
            />
        </View>
    )
}