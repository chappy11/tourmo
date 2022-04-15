import axios from 'axios'
import Moutorista from './Moutorista';
import Vehicle from './Vehicle';

export const ip = "http://192.168.1.13/tourmo/";


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
     register: async (payload) =>{
        console.log("Payload",payload)
        const headers = {
            "Content-Type":"multipart/form-data"
        }
     return axios.post(ip+"user/register",payload,{headers});
    },
    ...Moutorista,
     ...Vehicle
}