"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

function page() {

    const login = async () => {
        try {
            const url = "http://192.168.50.17:8000/api/vendor/login"
            const data = {
                "email": "anees@anees.com",
                "password": "123456"
            }
            const res = await axios.post(url, data, {
                withCredentials: true
            });

            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <button onClick={login}>login</button>
        </div>
    )
}

export default page