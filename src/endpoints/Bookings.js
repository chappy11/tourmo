import Axios from "axios";
import React from "react";
import { ip } from "./API";

export default  {
    createBookings: (payload) =>{
        const headers = {
            "Content-Type" : "text/plain"
        }
        return Axios.post(ip+"booking/insert",payload,{headers});
    },
    gelistofbookings:async (id) =>{
        let resp = await Axios.get(ip+"booking/getbookinglist/"+id);
        return resp.data;
    },
    getbookingbymotor: async (id) => {
        let resp = await Axios.get(ip+"booking/getbymotorid/"+id)
        return resp.data;
    },
    getdatelist: async (id) => {
        let resp = await Axios.get(ip + "booking/getdatelist/" + id);
        return resp.data;
    },
    acceptbooking: async (id) =>{
        let resp = await Axios.post(ip + "booking/acceptbooking/" + id);
        return resp.data;
    },
    getbookingbyuser: async (id) => {
        let resp = await Axios.get(ip + "booking/getbyuser/" + id);
        return resp;
    }
}