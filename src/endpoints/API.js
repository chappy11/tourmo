import axios from 'axios'

export const ip = "http://10.0.8.42/tourmo/";


export  default {
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
     }
}