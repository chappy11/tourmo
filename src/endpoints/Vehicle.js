import React from 'react'
import axios from 'axios'
import {ip} from './API';

export default {
    getlistofmotorcycle: async() => {
        let data =await axios.get(ip + "Motorcycle/getlist");
        console.log("motor:", data);
        return data.data;
    },
    insertVehicle: (formdata) => {
        const headers = {
            "Content-Type" : "multipart/form-data"
        }
        return axios.post(ip+"vehicle/addMotor",formdata,{headers})
    },
    getvehicle: async(m_id) =>{
        let data = await axios.get(ip + "vehicle/getbymid/"+m_id);
        console.log("data")
        return data.data
    }
}