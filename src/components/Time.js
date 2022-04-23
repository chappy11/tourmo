import React from 'react'

export const hour = () => {
    const arr = [];
    for (let x = 1; x <= 12; x++){
        arr.push(x);
    }
    return arr;
}

export const min = () => {
    const arr = [];
    for (let x = 1; x <= 60; x++){
        arr.push(x)
    }
    return arr;
}