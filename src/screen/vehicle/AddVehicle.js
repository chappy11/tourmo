
import React from 'react'
import {View,StyleSheet,ImageBackground,Text,ScrollView,TouchableOpacity,FlatList,Alert,LogBox,Image} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import { Button as Rbutton, Caption, Dialog, Headline, Menu, Portal, Title, Modal } from 'react-native-paper';
import { TextInput } from '../../components/TextInput';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';
import API from '../../endpoints/API';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';
import Card from '../../components/Card';
import { Func } from '../../utils/Func';
import { UserContext } from '../../context/Context';
const AddVehicle = ({ navigation, route }) => {
    const {user} = React.useContext(UserContext)
    const [data, setdata] = React.useState({
        pic1: "",
        pic2: "",
        pic3: "",
        brand: "",
        name: "",
        transmission: "",
        or: "",
        cr: "",
        rate:0,
        date:"",
    });
    const [openCalendar,setopenCalendar] = React.useState(false);
    const [isSelect, setisSelect] = React.useState(false);
    const [open, setopen] = React.useState(false);
    const [selectedimage, setselectedimage] = React.useState("");
    const onChange = (name,value) => {
        setdata({...data,[name]:value})
    }

    LogBox.ignoreAllLogs();
    const [isloading, setisloading] = React.useState(false);

    const getmotorcycle = (nam,bran,trans) => {
        setdata({
            ...data,
            name: nam,
            brand: bran,
            transmission:trans
        })
        setisSelect(false)
        
    }


    const openMenu = (x) => {
        setopen(true)
        setselectedimage(x);
    }

    const pick = (type) => {
        if (selectedimage == "frontImage") {
            frontImage(type)
        }
        else if (selectedimage == "sideImage") {
            sideImage(type)
        } else if (selectedimage == "backImage") { 
            backImage(type)
        } else if (selectedimage == "orImage") {
            orImage(type)
        } else if (selectedimage == "crImage") {
            crImage(type);
        }
        setopen(false);
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

    const backImage = (type) => {
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

    const orImage = (type) => {
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

    const crImage = (type) => { 

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

    const submit =  () => {
        setisloading(true)
        try {
            if (data.brand == "" || data.name == "" || data.transmission == "") {
                Alert.alert("Error","You must indicate the Name,Brand,and Transmission of your Motorcycle")
                setisloading(false);
            }
            else if (data.rate <= 0) {
                Alert.alert("Error","Rate should be less than or equal to 0")
                setisloading(false);
            }
            else if (data.pic1 == "" || data.pic2 == "" || data.pic3 == "") {
                Alert.alert("Error", "You must put pictures of you motorcycle");
                setisloading(false);
            }
            
            else if (data.or == "" || data.cr == "") {
                Alert.alert("Error", "You must put put pictures of motorcycle documents");
                setisloading(false);
            } else {
                let formdat = new FormData();
                formdat.append("pic1", {
                    uri: data.pic1,
                    type: 'image/png',
                    name: Func.filename(data.pic1)
                });
                formdat.append("pic2", {
                    uri: data.pic2,
                    type: 'image/png',
                    name: Func.filename(data.pic2)
                });
                formdat.append("pic3", {
                    uri: data.pic3,
                    type: 'image/png',
                    name: Func.filename(data.pic3)
                });
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
                formdat.append("m_id", route.params.m_id);
                formdat.append("user_id", user.user_id);
                formdat.append("name", data.name);
                formdat.append("rate",data.rate)
                formdat.append("brand", data.brand);
                formdat.append("transmission", data.transmission);
                formdat.append("date",data.date);
                API.insertVehicle(formdat).then(res => {
                    if(res.data.status == 1){
                        Alert.alert("Success",res.data.message,[{text:"Okay",onPress:()=>navigation.push("Vehicle")}])
                        setisloading(false);
                    }else{
                        Alert("Error",res.data.message);
                    }
                }).catch(err=>{
                    Alert.alert("Error","Something went wrong")
                })
              
            }
            
         
           
        } catch (e) {
            Alert.alert("Error", "Something went wrong", [{
                text:"Okay",
                onPress: () => {
                    
                }
            }])
        }
        setisloading(false)
    }
    console.log("Inputs", data);
    return (
        <RNscreen style={{backgroundColor:'whitesmoke'}}>
            {isSelect ?
                (
                    <>
                        <Choose getmotorcycle={getmotorcycle} setisSelect={setisSelect} />
                    </>
                )
                :
                    (
                <ScrollView style={{ flex: 1 }}>
                     <Card>
                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{flex:1,fontSize:18,fontWeight:'bold'}}>Motorcycle :</Text>
                            <Rbutton onPress={()=>setisSelect(true)} color={Color.secondary} contentStyle={{color:Color.secondary}}>SEARCH</Rbutton>    
                        </View>
                        <View style={style.nameContainer}>
                            <Caption>Brand</Caption>          
                            <Text style={{marginLeft:10,fontSize:15,color:"black"}}>{ data.brand}</Text>                
                        </View>
                        <View style={style.nameContainer}>
                            <Caption>Name</Caption>          
                            <Text style={{marginLeft:10,fontSize:15,color:"black"}}>{ data.name}</Text>                
                        </View>
                            <View style={style.nameContainer}>
                            <Caption>Transmission</Caption>          
                            <Text style={{marginLeft:10,fontSize:15,marginBottom:20,color:'black'}}>{ data.transmission}</Text>                
                        </View>      
                        <View style={{...style.nameContainer, marginBottom:10 }}>
                            <Caption>Rate</Caption>
                                <TextInput placeholder="0" keyboardType="numeric" onChangeText={(e)=>onChange("rate",e)}/>        
                        </View>        
                    </Card>
                    <Card>
                       <Title style={{padding:10}}>Motorcycle Pictures</Title> 
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={()=>openMenu("frontImage")}>
                                        <ImageBackground source={{uri:data.pic1}} style={style.imagebackground}>
                                                <Text>Front View</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>openMenu("sideImage")}>
                                        <ImageBackground style={style.imagebackground} source={{uri:data.pic2}}>
                                                <Text>Side View</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>openMenu("backImage")}>
                                    <ImageBackground style={style.imagebackground} source={{ uri: data.pic3 }}>
                                        <Text>Back View</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                    </Card>
                        
                    <Card>  
                        <Title style={{padding:10}}>Motorcycle Documents</Title>        
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>openMenu("orImage")}>
                                        <ImageBackground style={style.imagebackground} source={{uri:data.or}}>
                                    <Text>Official Reciept Photo</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>openMenu("crImage")}>
                                    <ImageBackground style={style.imagebackground} source={{uri:data.cr}}>
                                        <Text>Certifition of Registration</Text>
                                    </ImageBackground>
                            </TouchableOpacity>
                        </View> 
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
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
                    </Card>
                    <Card>
                            <Button name="Add" mode='contained' onPress={submit} disabled={isloading ? true : false} color={Color.primary}/>
                    </Card>                        
                        

                    <Portal>
                       <Dialog visible={open} onDismiss={()=>setopen(false)}> 
                            <Menu.Item title="Camera" onPress={()=>pick("camera")}/>
                            <Menu.Item title="Picker" onPress={()=>pick("picker")}/>
                        </Dialog>
                    </Portal>        
            </ScrollView>)
                
            }
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
        <Card style={style.renderItem}>
            <Title>{item.name}</Title>
            <Text>{item.brand}</Text>
            <Text>{item.transmission}</Text>
        </Card>
    </TouchableOpacity>
    );
    return (
        <View style={{ flex: 1 }}>
            <Card style={{paddingVertical:10,}}>
                                <TextInput style={{backgroundColor:'white',marginHorizontal:15}} placeholder="Search" onChangeText={(e)=>onChange(e)} />

           </Card>

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