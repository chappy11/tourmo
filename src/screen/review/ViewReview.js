import React from 'react';
import { Color } from '../../utils/Themes';
import {StyleSheet,View,FlatList} from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


const ViewReview = ({motor_id}) =>{
    const [list,setlist] =  React.useState([]);
    const isFocus = useIsFocused();
   
    React.useEffect(()=>{
        getreview()
    },[isFocus])

    const getreview = async()=>{
        let resp = await getreview(motor_id);
        if(resp.status == 1){
            console.log(resp)
            setlist(resp.data)
        }else{
            setlist([]);
        }
    }

    const renderItem = ({item}) =>(
        <View style={{padding:10}}>
            <View style={{flexDirection:'row'}}>
                    <Avatar.Text size={18} label="U"/>
                    <Rating
                        ratingCount={5}
                        defaultRating={item.rate}
                        readonly={true}
                        minValue={item.rate}
                        jumpValue={item.rate}
                        fractions={1}
                        startingValue={item.rate}
                        imageSize={20}
                        />
            </View>
        </View>
    );


    return(
      
        <View>
                <FlatList
                    data={list}
                    keyExtractor={(val,i) => i.toString()}
                    renderItem={renderItem}
                        />
      
        </View>
    )
}

export default ViewReview;


const style = StyleSheet.create({
    container1:{
        backgroundColor:Color.color2,
        flex:1
    },
    container2:{
        backgroundColor:"white",
        flex:1,
        borderTopEndRadius:20,
        borderTopStartRadius:20
    }
})