import React from 'react';

export const Func = {
    isEmail: (email) => {
        let valid =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
        return valid.test(email);
    },
    isValidPhone: (phone) =>{
        let valid = /^(09|\+639) \d{ 9 } $/;
        return valid.test(valid);
    },
    filename:(file) =>{
        return file.split(/(\\|\/)/g).pop();
    },
    dateformat: (x) => {
        
        const year = x.getFullYear();
        const month = (x.getMonth() +1).toString().padStart(2,0);
        const day = x.getDate().toString().padStart(2,0);
        return year + "-" + month + "-" + day;
    }
}