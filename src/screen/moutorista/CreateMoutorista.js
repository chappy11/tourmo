import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet,View,Text,ImageBackground,Alert} from 'react-native';
import Swiper from "react-native-swiper";
import {Caption, Title} from 'react-native-paper'
import { Button } from '../../components/Button';
import Screen from '../../components/Screen';
import { TextInput } from '../../components/TextInput';
import { Color } from '../../utils/Themes';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import MapView,{Marker} from 'react-native-maps';
import API from '../../endpoints/API';
import { UserContext } from '../../context/Context';
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import RNscreen from '../../components/RNscreen';

const INITIAL_REGION = {
  latitude: 10.3157,
  longitude: 123.8854,
  latitudeDelta: 0.0006294034,
  longitudeDelta: 0.000138792,
}
const CreateMoutorista = ({navigation,route}) => {
    const mapRef = React.useRef(null)
    const [isView, setisView] = React.useState(true);
    const [input, setinput] = useState({
        name:""
    })
    const { user } = useContext(UserContext);
    const [accept, setaccept] = React.useState(false);
    const [coordinate, setcoordinate] = useState(null)

    const [region, setregion] = React.useState(INITIAL_REGION)

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setcoordinate({ latitude: info.coords.latitude, longitude: info.coords.longitude })
            setregion({...region,latitude:info.coords.latitude,longitude:info.coords.longitude})
        });
        
    },[]);

    const onChange = (name, val) => {
        setinput({...input,[name]:val})
    }

    const markPosition = (newCoords) => {
        setcoordinate({...newCoords})
    }

    const onRegionChange = (region)=>{
        if(region===null){
            return {...INITIAL_REGION,...coordinate}
        }
        setregion(region)
    }
    const submit = async() => {
        if (input.name === "") {
            Alert.alert("Error", "Fill out all Fields",[{text:"Okay"}]);
        } else {
                let payload = {
                    user_id: user.user_id,
                    name: input.name,
                    lat: coordinate.latitude,
                    lng:coordinate.longitude
                }
                let res = await API.addMotourista(payload);
                console.log(res.data)
                if (res.data.status == 1) {
                    Alert.alert(
                        "Success",
                        res.data.message,
                        [{
                            text: "Okay",
                            onPress:()=>navigation.push("Vehicle")
                        }]
                    );
                } else {
                    Alert.alert("Error",res.data.message,[{text:"Okay"}])
                }
                
         }
        
    }

    
    return (
       <RNscreen>
            {isView ? (
                <Slide onPress={() => setisView(false)} accept={accept} setaccept={setaccept}/>
            ): (
                <View style={{flex:1,backgroundColor:Color.white}}>
                        <CreateMotourista region={region} onRegionChange={onRegionChange} setregion={setregion} onChange={onChange} coordinate={coordinate} markPosition={markPosition} submit={submit}/>
                </View>
            )}
            
        </RNscreen>
    );
}

export default CreateMoutorista;


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
        
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    imagebackground: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        margin:10
    }
})

export const CreateMotourista = ({coordinate,onChangeRegion,markPosition,submit,onChange,setregion,region}) => {
    console.log("REGION",region)
    return (
        <>
            <View style={{paddingHorizontal:10,paddingVertical:15}}>
                    <Caption>Name of Brand</Caption>
                <TextInput placeholder="Enter your brand name" onChangeText={(e)=>onChange("name",e)}/>
            </View>
            <MapView
                region={region}
                style={{ flex: 1 }}
                onRegionChangeComplete={onChangeRegion}
               
                
            >
                <Marker
                    draggable
                    coordinate={coordinate}
                    onDragEnd={(e) => {
                        markPosition(e.nativeEvent.coordinate)
                        setregion({...region,...e.nativeEvent.coordinate})
                    }}
                />

            </MapView>
            <View style={{paddingHorizontal:15,paddingVertical:10}}>
                <Button name="Create" mode='contained' onPress={submit} color={Color.primary}/>
            </View>
          
        </>
        )
}


export const Slide = ({onPress,accept,setaccept}) => {
    console.log("Accept",accept)
    return (
        <View style={{flex:1,...style.container}}>
            <Swiper loop={false}>
                <View style={style.item}>
                    <Text>HI</Text>
                </View>
                <View style={style.item}>
                    <Text>Hellow</Text>
                </View>
                <View style={style.item}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <BouncyCheckbox
                            isChecked={accept}
                            onPress={()=>setaccept(!accept)}
                        />
                        <Text>I Accept terms and agreements</Text>
                 
                    </View>
                     
                    <Button name="Confirm" onPress={onPress} disabled={accept ? false :true}/>
                </View>
            </Swiper>
       </View>
    )
}


