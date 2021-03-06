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
    },
    addpoints:(payload)=>{
        const headers ={
            "Content-Type" : "text/plain"
        }
        return axios.post(ip+"vehicle/addpoints",payload,{headers})
    },
    getmotorbyid:async(motor_id)=>{
        let res = await axios.get(ip+"vehicle/getbyid/"+motor_id)
        return res.data;
    },
    getallpostvehicle: async () => {
        let res = await axios.get(ip + "vehicle/allpostvehicle");
        return res.data;
    },
    updatevehicle:(payload)=>{
        const headers = {
            "Content-Type" : "multipart/form-data"
        }
        return axios.post(ip+"vehicle/update",payload,{headers});
    },
    activate:async(vehicle_id)=>{
        let resp = await axios.post(ip+"vehicle/activate/"+vehicle_id);
        return resp.data;
    },
    deactivate:async(vehicle_id) =>{
        let resp = await axios.post(ip+"vehicle/deactivate/"+vehicle_id);
        return resp.data;
    },
    pay:async(payload)=>{
        const headers ={
            "Content-Type" : "text/plain"
        }
        let resp  = await axios.post(ip+"vehicle/pay",payload,{headers});
        return resp.data;
    }
}