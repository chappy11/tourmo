import React from 'react';
import RNscreen from './RNscreen';
import Card from './Card';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker'
import {View} from 'react-native'
import { Button } from 'react-native-paper';
import { Color } from '../utils/Themes';
import { Func } from '../utils/Func';

const Calendar = ({onChange,onDismiss,type,start,end}) => {
    const minDate = new Date(); // Today
           
    React.useEffect(() => {

       
    },[])
    const onDateChange = (date,type) => {
        if (type === "END_DATE") {
            console.log("END", date)
            onChange("end",Func.dateformat(date))
        } else {
            console.log("start", Func.dateformat(date))
             onChange("start",Func.dateformat(date))
        }
    }
    return (
       <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
            <CalendarPicker
                startFromMonday={true}
                markingType={'interactive'}
                
                minDate={minDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                 markedDates={{
    '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-05-17': {marked: true},
    '2022-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2022-05-19': {disabled: true, disableTouchEvent: true}
  }}
                allowBackwardRangeSelect={true}
                allowRangeSelection
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