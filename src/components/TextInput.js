import React from 'react'
import { TextInput as Input,StyleSheet } from 'react-native'

export const TextInput = (props) => (
    <Input {...props}  style={{...props.style,...style.textInput}}/>
)


const style = StyleSheet.create({
     textInput: {
        borderWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: 'grey',
        borderRadius: 20
    },
})