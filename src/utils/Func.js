import React from 'react';
import moment from 'moment';
export const Func = {
    isEmail: (email) => {
        let valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
        return valid.test(email);
    },
    isValidPhone: (phone) => {
        let valid = /^(09|\+639) \d{ 9 } $/;
        return valid.test(valid);
    },
    filename: (file) => {
        return file.split(/(\\|\/)/g).pop();
    },
    dateformat: (x) => {
        let date = new Date(x);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, 0);
        const day = date.getDate().toString().padStart(2, 0);
        return year + "-" + month + "-" + day;
    },
    daterange: (date1, date2) => {
        var start = moment(date1);
        var end = moment(date2);
        return end.diff(start, "days");
    },
    datebetween:(startDate, endDate) => {
       let date = []
        while(moment(startDate) <= moment(endDate)){
         date.push(startDate);
        startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
        }
            return date;
    }
}