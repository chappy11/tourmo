import React from 'react'
import {View,Text} from 'react-native'
import { UserContext } from '../context/Context';

const RNscreen = (props) => {
    const {isVer} = React.useContext(UserContext);
    console.log(isVer);
    return (
        <View style={{flex:1,...props.style}}>
            <Text style={{padding:5,textAlign:'center',width:'100%',backgroundColor:'grey'}}>
                {isVer === "0" ? "This account is Semi-Verified you cannot transact yet" : "This account is fully Verified"}
            </Text>
            {props.children}
        </View>
    );
} 

export default RNscreen;