import React from 'react';
import RNscreen from './RNscreen';
import Card from './Card';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker'
import {View} from 'react-native'
import { Button } from 'react-native-paper';
import { Color } from '../utils/Themes';
import { Func } from '../utils/Func';

const Calendar = ({onChange,onDismiss,type}) => {
    const minDate = new Date(); // Today
    
    React.useEffect(() => {
       
    },[])
    const onDateChange = (date) => {
        if (type === "start") {
            onChange("start",date)
        } else if (type === "end") {
            onChange("end",date)    
        }
        
    }
    return (
       <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
            <CalendarPicker
                startFromMonday={true}
                minDate={minDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={(e)=>onDateChange(Func.dateformat(e))}

            />
            <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{flex:1}}>
                    <Button color={Color.primary} onPress={onDismiss}>Confirm</Button>
                </View>
                <View style={{flex:1}}>
                          <Button color={Color.danger} onPress={onDismiss}>Cancel</Button>
                </View>
              
            </View>
            
       </View>
    );
}

export default Calendar;