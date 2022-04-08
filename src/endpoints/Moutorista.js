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
    }
}