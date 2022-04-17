import React from 'react'
import RNscreen from '../../components/RNscreen';
import { StyleSheet,Image,View,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import Card from '../../components/Card';
import { UserContext } from '../../context/Context';
import API from '../../endpoints/API';
import { Avatar, Button, Caption,  Dialog,  List,  Menu,  Portal,  Title } from 'react-native-paper';
import { Color } from '../../utils/Themes';
import { TextInput } from '../../components/TextInput';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Func } from '../../utils/Func';

const UpdateProfile = ({navigation}) => {
    const { user } = React.useContext(UserContext); 
    const [profile, setprofile] = React.useState({});
    const [isProfileChange, setisProfileChange] = React.useState(false);
    const [isLicenseChange, setisLicenseChange] = React.useState(false);
    const [iscollapse, setiscollapse] = React.useState(false);
    const [target, settarget] = React.useState("");
    const [open, setopen] = React.useState(false);
    const [input, setinput] = React.useState({
        profilepic: "",
        fname: "",
        lname: "",
        mname: "",
        contact:"",
        password: "",
        confirm:"",
        oldpassword: "",
        license:"",
    });
    React.useEffect(() => {
        getprofile();
    }, []);

    const onChange = (name, val) => {
        setinput({...input,[name]:val})
        
    } 

    const openMenu = (target) => {
        setopen(true);
        settarget(target);
    }

    const pick = (type) => {
        if (target === "profile") {
            selectProfile(type)
        } else if(target === "license"){
            selectLicense(type)
        }

    }

    const selectProfile = (type) => {
        if (type === "picker") {
            ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("profilepic", res.path);
                setisProfileChange(true)
                settarget("")
                setopen(false)
            })
        } else if (type === "camera") {
            ImageCropPicker.openCamera({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("profilepic", res.path);
                setisProfileChange(true)
                settarget("")
                setopen(false)
            })
        }
    }
    
    const selectLicense = (type) => {
        if (type === "picker") { 
            ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("license",res.path)
                setisLicenseChange(true)
                setopen(false)
            })
        } else if (type === "camera") {
            ImageCropPicker.openCamera({
                width: 300,
                height: 400,
                compressImageQuality:0.7
            }).then(res => {
                onChange("license", res.path)
                setisLicenseChange(true)
                setopen(false)
            })
        }
    }
   
    const getprofile = async () => {
        try {
            let resp = await API.getprofile(user.user_id);
            if (resp.status == 1) { 
                setprofile(resp.data[0])
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const submitProfile = () => {
        let formdata = new FormData();
        formdata.append("profile", {
            uri: input.profilepic,
            type: 'image/png',
            name:Func.filename(input.profilepic)
        });
        formdata.append("user_id", user.user_id);
        API.updateProfilepic(formdata).then(res => {
            if (res.data.status == 1) {
                Alert.alert("Success",res.data.message,[{text:'okay',onPress:()=>{}}])
            } else {
                 Alert.alert("Error",res.data.message,[{text:'okay',onPress:()=>{}}])
            }
        })
    }

    const submitLicense = () => {
        let formdata = new FormData();
        formdata.append("license", {
            uri: input.license,
            type: 'image/png',
            name:Func.filename(input.license)
        })
        formdata.append("user_id", user.user_id);
        API.updateLicensepic(formdata).then(res => {
            if (res.data.status == 1) {
                Alert.alert("Success", res.data.message, [{ text: 'okay', onPress: () => { } }]);
            } else {
                Alert.alert("Error",res.data.message,[{text:'okay',onPress:()=>{}}])
            }
        })
    }

    const submitchangepass = () => {
        if (input.password === "" || input.confirm === "" || input.oldpassword === "") {
             Alert.alert("Warning","Fill out all fields",[{text:'okay',onPress:()=>{}}])
        } else if (input.password != input.confirm) {
             Alert.alert("Warning","Password do not match",[{text:'okay',onPress:()=>{}}])
        } else if (input.oldpassword != user.password) {
             Alert.alert("Warning","Please check you old password",[{text:'okay',onPress:()=>{}}])
        } else {
            API.updatepassword({
                password: input.password,
                user_id : user.user_id
            }).then(res => {
                if (res.data.status == 1) {
                      Alert.alert("Success", res.data.message, [{ text: 'okay', onPress: () => { } }]);
                }else{
                    Alert.alert("Error",res.data.message,[{text:'okay',onPress:()=>{}}])
                }
            })
        }
    }
    
    const submitchangedata = () =>{
        const payload = {
            fname:input.fname,
            mname:input.mname,
            lname:input.lname,
            contact:input.contact,
            user_id:user.user_id       
        }

        API.updatedata(payload).then(res=>{
            if(res.data.status == 1){
                Alert.alert("Success",res.data.message,[{text:'okay',onPress:()=>{}}])
            }else{
                Alert.alert("Error",res.data.message,[{text:'okay',onPress:()=>{}}])
            }
        })
    }

    const clear = (x) => {
        if(x === "profile"){
             ImageCropPicker.clean(res=>{
                 onChange("profilepic","");
                 setisProfileChange(false);
            })
        }else if(x === "license"){
                onChange("license","");
                setisLicenseChange(false);
        }
    }
 
    return (
        <RNscreen>
            <ScrollView>
            <Card style={style.pic}>
                {isProfileChange ?
                    (<>
                        <Avatar.Image source={{uri:input.profilepic}} size={200}/>
                        <View style={{flexDirection:'row'}}>
                            <Button color={Color.secondary} onPress={submitProfile}>Save</Button>
                            <Button color={Color.danger} onPress={()=>clear("profile")}>Cancel</Button>
                        </View>
                    </>)
                        :
                    (<>
                        <TouchableOpacity onPress={()=>openMenu("profile")}>
                               <Avatar.Image source={{ uri: API.baseUrl + profile.user_pic }} size={200}/>               
                        </TouchableOpacity>
                         <Caption>Change Profile</Caption>
                    </>)
                }
            </Card>    
            
            <Card style={style.personalInfo}>
                <TouchableOpacity onPress={()=>setiscollapse(!iscollapse)}>
                    <Title>Account Settings</Title>
                </TouchableOpacity>    
                    {iscollapse && 
                        <>
                                <View>
                                    <Caption>Password</Caption>
                            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(e)=>onChange("password",e)}/>
                                </View>
                                <View>
                                    <Caption>Confirm Password</Caption>
                                    <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(e)=>onChange("confirm",e)}/>
                                </View>
                                <View>
                                    <Caption>Old Password</Caption>
                                    <TextInput placeholder="Old Password" secureTextEntry={true} onChangeText={(e)=>onChange("oldpassword",e)}/>
                                </View>    
                                <View style={{marginTop:15}}>
                                    <Button color={Color.primary} onPress={submitchangepass} mode='contained' contentStyle={{padding:5}}>Change password</Button>
                                </View>
                        </>    
                    }
                    
                        
                
            </Card>    
            <Card style={style.personalInfo}>
                <Title>Personal Information</Title>
                <Caption>Firstname</Caption>
                    <TextInput placeholder={profile.firstname} onChangeText={(e)=>onChange("fname",e)}/>
                <Caption>Middlename</Caption>
                    <TextInput placeholder={profile.middlename} onChangeText={(e)=>onChange("mname",e)}/>
                <Caption>Lastname</Caption>
                    <TextInput placeholder={profile.lastname} onChangeText={(e) => onChange("lname", e)}/>
                <Caption>Contact No.</Caption>
                    <TextInput placeholder={profile.contact} onChangeText={(e) => onChange("contact", e)}/>
                <View style={{ marginTop: 10 }}>
                        <Button color={Color.primary} onPress={submitchangedata} mode='contained' labelStyle={{ color: 'white' }} disabled={input.fname === "" && input.mname === "" && input.lname === "" && input.contact === "" ? true :false}>Save</Button>     
                </View>
             </Card>
            <Card style={style.pic}>
                <Title>My License</Title>
                    {isLicenseChange ? 
                        (<>
                            <Image source={{ uri: input.license }} style={style.picsize}/>
                            <View style={{flexDirection:'row'}}>
                                <Button onPress={submitLicense}>Save</Button>
                                <Button onPress={()=>clear("license")}>Cancel</Button>
                            </View>
                        </>
                        ):
                        (<>
                            <TouchableOpacity onPress={()=>openMenu("license")}>
                                    <Image source={{ uri: API.baseUrl + profile.license_pic }} style={style.picsize} />
                            </TouchableOpacity>
                                    
                            <Caption>Change license Picture</Caption>
                        </>)
                    }
                          
            </Card>
                <Portal>
                    <Dialog visible={open} onDismiss={()=>setopen(false)}>
                        <Menu.Item title="Camera" onPress={()=>pick("camera")}/>
                        <Menu.Item title="Picker" onPress={()=>pick("picker")}/>
                    </Dialog>
                </Portal>    
            </ScrollView>
     </RNscreen>        
    );
}

export default UpdateProfile

const style = StyleSheet.create({
    pic: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    picsize: {
        width: 300,
        height: 300,
        
    },
    personalInfo: {
        paddingVertical: 15,
        paddingHorizontal:10
    }


})