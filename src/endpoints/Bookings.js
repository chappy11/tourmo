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
    }
}