import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator, Paragraph } from 'react-native-paper'

const Screen = (props,{children}) => {
  
    return (
        <>
        {
                props.isLoad ? (
                    <Load />
                ): (
                        <View  style={{...style.container,...props.style}}>
                            {props.children}
                        </View>                    
            )
        
        }
    
        </>
 )
}

export default Screen


export const Load = () => (
    <View style={style.loadingContainer}>
        <ActivityIndicator size={50} />
        <Paragraph>Loading...</Paragraph>
    </View>
)

const style = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    container: {
        flex: 1,
        
    }
})
