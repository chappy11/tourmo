import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import RNscreen from '../components/RNscreen'
import { Caption, Dialog, Headline, Modal, Portal } from 'react-native-paper'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Color } from '../utils/Themes'
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker'
import Calendar from '../components/Calendar'
import { Func } from '../utils/Func'
import { hour,  min } from '../components/Time'
import { Picker } from '@react-native-picker/picker'


const CreateTransaction = ({route}) => {
    const minDate = new Date(); // Today
   
    const [state, setstate] = useState({
         hr: "hr",
         min: null,
         type:null, 
         start: "YYYY-MM-DD",
         end: "YYYY-MM-DD",
    })
  const listhours = hour();
  const [type, settype] = useState("");
  const [showCalendar, setshowCalendar] = React.useState(false);
    
  const [isView, setisView] = useState(false);
  
  const openCalendar = (type) => {
    settype(type)
    setshowCalendar(true)
  }
  
  const onChange = (name,val) => {
      setstate({...state,[name]:val})
  }
  console.log("DATE NOW", hour());
  


    return (
       <>
       {showCalendar ? 
          (
            <Calendar type={type} onChange={onChange} onDismiss={()=>setshowCalendar(false)}/>  
          ) :
          (
            <View>
 
          <View style={style.container}>
              <Headline>Create Booking</Headline>
          </View>
          <View style={ style.container}>
            <View>
                  <Caption>Date Start</Caption>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{flex:1}}>
                      <TextInput disabled placeholder={state.start}/>
                    </View> 
                    <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                      <TouchableOpacity onPress={() => openCalendar("start")}>
                           <Image source={require('../../asset/icon/calendar.png')} style={{ width: 30, height: 30 }} />
                      </TouchableOpacity>    
                    </View>
                </View>
                </View>
               <View>
                      <Caption>Date End</Caption>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{flex:1}}>
                          <TextInput disabled placeholder={state.end}/>
                        </View> 
                        <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                          <TouchableOpacity onPress={() => openCalendar("end")}>
                              <Image source={require('../../asset/icon/calendar.png')} style={{ width: 30, height: 30 }} />
                          </TouchableOpacity>    
                        </View>
                    </View>
            </View>
            <View style={{flexDirection:'row',width:'100%'}}>
                  <Picker
                    style={{flex:1}}
                  >
                    <Picker.Item label='hr' />
                    {listhours.map((val,i) => (
                      <Picker.Item label={val} value={val} />
                    ))}  
                  </Picker>
                  <View>
                    <Text>:</Text>
                  </View>
                  <Picker
                    style={{flex:1}}
                  >
                  <Picker.Item label='hr' />
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='1' value={2} />
                    <Picker.Item label='1' value={3}/>
                  </Picker>
            </View>
          </View>               
          </View>
        
          )
       
       }
       
       </>
          
  )
}

export default CreateTransaction
const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        padding:15
    }
})