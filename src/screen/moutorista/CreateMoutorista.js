import React,{useState,useContext} from 'react'
import { StyleSheet,View,Text,ImageBackground} from 'react-native';
import Swiper from "react-native-swiper";
import {Title} from 'react-native-paper'
import { Button } from '../../components/Button';
import Screen from '../../components/Screen';
import { TextInput } from '../../components/TextInput';
import { Color } from '../../utils/Themes';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import MapView,{Marker} from 'react-native-maps';
import API from '../../endpoints/API';
import { UserContext } from '../../context/Context';



const CreateMoutorista = () => {
    const [isView, setisView] = React.useState(true);
    const [input, setinput] = useState({
        name:""
    })
    const { data } = useContext(UserContext);
    const [accept, setaccept] = React.useState(false);
    const [coordinate, setcoordinate] = useState({
        latitude: 10.3157,
        longitude: 123.8854
    })

    const onChange = (name, val) => {
        setinput({...input,[name]:val})
    }

    const markPosition = (newCoords) => {
        setcoordinate({...newCoords})
    }

    const submit = async() => {
        let payload = {
            user_id: data.user_id,
            name: input.name,
            lat: coordinate.latitude,
            lng:coordinate.longitude
        }
        let res = await API.addMotourista(payload);
    }

    console.log("New Chords",coordinate)
    return (
        <Screen>
            {isView ? (
                <Slide onPress={() => setisView(false)} accept={accept} setaccept={setaccept}/>
            ): (
                <View style={{flex:1,backgroundColor:Color.white}}>
                        <CreateMotourista coordinate={coordinate} markPosition={markPosition} submit={submit}/>
                </View>
            )}
            
        </Screen>
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

export const CreateMotourista = ({coordinate,markPosition}) => {
    return (
        <>
            <TextInput placeholder="Enter your brand name" />
            <MapView
                region={{
                    latitude:coordinate.latitude,
                    longitude:coordinate.longitude,
                   latitudeDelta: 0.0922,
                   longitudeDelta: 0.0421,
                }}
                style={{flex:1}}
            >
                <Marker
                    draggable
                    coordinate={coordinate}
                    onDragEnd={(e)=>markPosition(e.nativeEvent.coordinate)}
                />

            </MapView>
            <Button name="Create" mode='contained' />
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


