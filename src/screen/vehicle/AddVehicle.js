
import React from 'react'
import {View,StyleSheet,ImageBackground,Text,ScrollView,TouchableOpacity,FlatList} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button as Rbutton, Caption, Dialog, Menu, Portal, Title } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';
import API from '../../endpoints/API';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';
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
    const [open, setopen] = React.useState(false);

    const onChange = (name,value) => {
        setdata({...data,[name]:value})
    }

    const getmotorcycle = (nam,bran,trans) => {
        setdata({
            ...data,
            name: nam,
            brand: bran,
            transmission:trans
        })
        setisSelect(false)
        
    }


    const openMenu = (x,type) => {
        setopen(true)
        if (x == "frontImage") {
            frontImage(type)
        }

    }


    const frontImage = (type) => {
        if (type == "picker") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality: 0.7
            }).then(res => {
                onChange("pic1",res.path)
            })
        }
        else if (type == "camera") {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("pic1",res.path)
            })
        }
    }
    
    

    const sideImage = (type) => {
        if (type == "picker") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("pic2",res.path)
            })
        } else if (type == "camera") {
            ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
            }).then(res => {
                onChange("pic2",res.path)
            })    
        }
    }

    const backImage = () => {
        if (type == "picker") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("pic3",res.path)
            })
        } else if (type == "camera") {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                compressImageQuality: 0.7
            }).then(res => {
                onChange("pic3",res.path)
            })    
        }
        
    }

    const orImage = () => {
        if (type == "picker") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
               onChange("or",res.path)
           })
        } else if (type == "camera") {
             ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality:0.7
            }).then(res => {
                onChange("or",res.path)
            })    
        }
        
    }

    const crImage = () => { 

        if (type == "camera") {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("cr",res.path)
            })
        } else if(type == "picker") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => { 
                onChange("cr",res.path)
            })
        }
      
    }

  console.log("Inputs",data)
    return (
        <RNscreen style={{backgroundColor:'white'}}>
            {isSelect ?
                (
                    <>
                        <Choose getmotorcycle={getmotorcycle} setisSelect={setisSelect} />
                    </>
                )
                :
                    (
                <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection:'row',padding:15,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{flex:1,fontSize:18,fontWeight:'bold'}}>Motorcycle :</Text>
                    <Rbutton onPress={()=>setisSelect(true)}>SEARCH</Rbutton>    
                </View>
                <View style={style.nameContainer}>
                    <Caption>Brand</Caption>          
                    <Text style={{marginLeft:10,fontSize:18}}>{ data.brand}</Text>                
                </View>
                <View style={style.nameContainer}>
                    <Caption>Name</Caption>          
                    <Text style={{marginLeft:10,fontSize:18}}>{ data.name}</Text>                
                </View>
                <View style={style.nameContainer}>
                    <Caption>Transmission</Caption>          
                    <Text style={{marginLeft:10,fontSize:18}}>{ data.transmission}</Text>                
                </View>        
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={frontImage}>
                            <ImageBackground source={{uri:data.pic1}} style={style.imagebackground}>
                                    <Text>Front View</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sideImage}>
                            <ImageBackground style={style.imagebackground} source={{uri:data.pic2}}>
                                    <Text>Side View</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                 </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={backImage}>
                        <ImageBackground style={style.imagebackground} source={{ uri: data.pic3 }}>
                            <Text>Back View</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity onPress={orImage}>
                                <ImageBackground style={style.imagebackground} source={{uri:data.or}}>
                            <Text>Official Reciept Photo</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity onPress={crImage}>
                            <ImageBackground style={style.imagebackground} source={{uri:data.cr}}>
                                <Text>Certifition of Registration</Text>
                            </ImageBackground>
                    </TouchableOpacity>
                    
                </View>
                        <Portal>
                            <Dialog visible={open} onDismiss={()=>setopen(false)}> 
                                <Menu.Item title="Camera" />
                                <Menu.Item title="Picker" />
                            </Dialog>
                        </Portal>        
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
        padding: 10
    },
    nameContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5
    },
})



export const Choose = ({getmotorcycle,setisSelect}) => {
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
    <TouchableOpacity onPress={()=>getmotorcycle(item.name,item.brand,item.transmission)}>
        <View style={style.renderItem}>
            <Title>{item.name}</Title>
            <Text>{item.brand}</Text>
            <Text>{item.transmission}</Text>
        </View>
    </TouchableOpacity>
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
            <Button name="Close" color={Color.danger} mode='contained' style={{ color: 'white' }} onPress={()=>setisSelect(false)}/> 
        </View>
    )
}