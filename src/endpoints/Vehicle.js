import React from 'react'
import axios from 'axios'
import {ip} from './API';

export default {
    getlistofmotorcycle: async() => {
        let data =await axios.get(ip + "Motorcycle/getlist");
        console.log("motor:", data);
        return data.data;
    }
}