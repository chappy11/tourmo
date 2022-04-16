import axios from 'axios'
import Moutorista from './Moutorista';
import Vehicle from './Vehicle';

export const ip = "http://10.0.8.42/tourmo/";


export  default {
    baseUrl:ip,
    sendEmail: async payload =>{
        const headers = {
            "Content-Type" : "text/plain"
        }
        return axios.post(ip+"email/sendEmail",payload,{headers});
    },
    login:async (payload) =>{
        const headers = {
            "Content-Type" : "text/plain"
        } 
     return  axios.post(ip+"user/login",payload,{headers});
    },
    getprofile: async(user_id) => {
        let response = await axios.get(ip + "user/profile/" + user_id);
        return response.data;
    },
     register: async (payload) =>{
        console.log("Payload",payload)
        const headers = {
            "Content-Type":"multipart/form-data"
        }
     return axios.post(ip+"user/register",payload,{headers});
    },
    updateProfilepic: (payload) => {
        const headers = {
            "Content-Type" : "multipart/form-data"
        }
        return axios.post(ip + "user/updateProfile", payload, { headers });  
    },
    updateLicensepic: (payload) => {
        const headers = {
            "Content-Type" : "multipart/form-data"
        }
        return axios.post(ip + "user/updateLicense", payload, { headers });
    },
    updatedata: (payload) => {
        const headers = {
            "Content-Type" : "text/plain"
        }
        return axios.post(ip + "user/update", payload, { headers });
    },
    updatepassword: (payload) => {
        const headers = {
            "Content-Type" : "text/plain"
        }
        return axios.post(ip + "user/changepass", payload, { headers });
    },

    ...Moutorista,
     ...Vehicle
}