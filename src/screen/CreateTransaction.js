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
         hr: "hour",
         min: "minute",
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
                <View style={{flex:1,flexDirection:'row'}}>
                                <Picker
                    style={{ flex: 1 }}
                    selectedValue={state.hr}
                    onValueChange={(e)=>onChange("hr",e)}
                      >
                        {hour().map(val => (
                          <Picker.Item label={val} value={val}/>
                        ))}     
                    </Picker>
                            <View style={{justifyContent:'center'}}>
                                 <Text>Hour</Text>
                    </View>
                   
                </View>
                
                  <View style={{ justifyContent:'center',paddingHorizontal:15}}>
                    <Text>:</Text>
                  </View>
                  <View style={{flexDirection:'row',flex:1}}>
                      <Picker
                          style={{ flex: 1 }}
                          selectedValue={state.min}
                           onValueChange={(e)=>onChange("min",e)}
                           >
                          {min().map(val => (
                              <Picker.Item label={val} value={val}/>
                            ))}
                        </Picker>
                         <View style={{justifyContent:'center'}}>
                                 <Text>minute</Text>
                    </View>
                  </View>
                
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