import Axios from 'axios';
import React from 'react';
import { ip } from './API';

export default{
    addtofav:async(user_id,motor_id) =>{
        let res = await Axios.post(ip + "favorite/insert/"+user_id+"/"+motor_id);
        return res.data;
    },
    checkfav: async(user_id,motor_id) =>{
        let res = await Axios.get(ip+"favorite/check/"+user_id+"/"+motor_id)
        return res.data;
    },
    getfav: async(user_id) =>{
        let res = await Axios.get(ip+"favorite/getfav/"+user_id);
        return res.data;
    },
    delete:async(motor_id,user_id)=>{
        let res = await Axios.post(ip+"favorite/delete/"+motor_id+"/"+user_id);
        return res.data;
    }
}