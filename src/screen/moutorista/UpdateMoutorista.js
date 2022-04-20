import React from 'react';
import { Title } from 'react-native-paper';
import { StyleSheet, Alert } from 'react-native';
import Card from '../../components/Card';
import RNscreen from '../../components/RNscreen';
import { TextInput } from '../../components/TextInput';
import API from '../../endpoints/API';
import MapView, { Marker } from 'react-native-maps';
import mark from '../../../asset/marker.png';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';

const UpdateMoutorista = ({navigation,route}) => {
    const { m_id } = route.params;
    const [data,setdata] = React.useState({})
    const [input, setinput] = React.useState({
        name:""
    })
    React.useEffect(() => {
        getdata();
        console.log(m_id);
    }, []);


    const onChange = (name,val) => {
        setinput({...input,[name]:val})
    }

    const getdata = async () => {
        try {
            let resp = await API.getmotourista(m_id);
            console.log(resp)
            if (resp.status == 1) {
                setdata(resp.data[0]);
    
            } else {
                console.log(res.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const submit = () => {
        let payload = {
            mot_id:data.m_id,
            name: input.name,
            lat: data.latitude,
            lng:data.longitude
        }
        API.updatemotourista(payload).then(res => {
            if (res.data.status == 1) {
                Alert.alert("Success", res.data.message);
            } else {
                Alert.alert("Error", res.data.message);
            }
        })
    }
      console.log("NEW DATA",data);
    return (
        <RNscreen>
            <Card style={style.card}>
                <TextInput placeholder={data.motour_name} onChangeText={(e)=>onChange("name",e)}/>
            </Card>
            <MapView
                region={{
                    latitude: parseFloat(data.latitude),
                    longitude:parseFloat(data.longitude),
                    latitudeDelta: 0.0006294034,
                    longitudeDelta: 0.000138792,
                }}
                style={{flex:1}}
            >
                <Marker
                    draggable
                    coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }}
                    onDragEnd={(e) => {
                        setdata({ ...data, ...e.nativeEvent.coordinate })
                      
                    }}
                />
            </MapView>
            <Card style={{padding:10}}>
                <Button name="Update" mode='contained' color={Color.primary} onPress={submit}/>
            </Card>
        </RNscreen>    
    )
}

export default UpdateMoutorista;

const style = StyleSheet.create({
    card: {
        padding:10
    }
})