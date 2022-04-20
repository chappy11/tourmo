import Axios from 'axios';
import React from 'react';
import API, { ip } from './API';

export default {
    addMotourista: async (payload) => {
        const headers = {
            "Content-Type" : "text/plain"
        }
        let data = await  Axios.post(ip + "motourista/becomeMotourista", payload, { headers });
        return data;
    },
    getmotouristabyuser: async (user_id) => {
        let data = await Axios.get(ip + "motourista/getmotouristabyuser/" + user_id);
        console.log("Motourista", data.data);
        return data.data;
    },
    changestatus: (payload) => {
        const headers = {
            "Content-Type" : "text/plain"
        }
        return Axios.post(ip + "motourista/activateMotourista",payload,{headers})
    },
    updatemotourista: (payload) => {
        const headers = {
            "Content-Type" : "text/plain"
        }  
        return Axios.post(ip + "motourista/updateMotourista", payload, { headers });
    },

    getmotourista: async (id) => {
        let resp = await Axios.get(ip + "motourista/getmotourista/" + id);
        return resp.data;
    }
}