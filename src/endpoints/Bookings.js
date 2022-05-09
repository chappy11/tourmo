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
        return resp.data;
    },
    cancelbooking: async(booking_id) =>{
        let resp = await Axios.post(ip+ "booking/cancelbooking/"+booking_id)
        return resp.data;
    },
    startbooking: async(booking_id) =>{
        let resp = await Axios.post(ip + "booking/startbooking/"+booking_id);
        return resp.data;
    },
    returnBooking: async(booking_id) =>{
        let resp = await Axios.post(ip + "booking/returnMotor/"+booking_id);
        return resp.data;
    },
    confirmReturn: async(booking_id) =>{
        let resp = await Axios.post(ip+"booking/confirmReturn/"+booking_id);
        return resp.data;
    },
    declinebooking: async(booking_id) =>{
        let resp = await Axios.post(ip+"booking/declinebooking/"+booking_id);
        return resp.data;
    },
    sendReview: async(payload) =>{
        const headers ={
            "Content-Type":"text/plain"
        }
        let resp = await Axios.post(ip+"review/review",payload,{headers});
        return resp.data;
    },
    ongoing: async(owner_id) =>{
        let resp = await Axios.get(ip+"booking/getongoing/"+owner_id);
        return resp.data;
    },
    tourista: async(booking_id) =>{
        let resp = await Axios.get(ip+"booking/tourista/"+booking_id);
        return resp.data;
    },
    motourista: async(booking_id) =>{
        let resp = await Axios.get(ip+"booking/motourista/"+booking_id);
        return resp.data;
    }

}