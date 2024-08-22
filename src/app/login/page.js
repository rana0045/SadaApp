"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

function page() {

    const login = async () => {
        try {
            const url = "https://boomhit-production.up.railway.app/api/vendor/login"
            const data = {
                "email": "anees@anees.com",
                "password": "123456"
            }

            const res = await axios.post(url, data)
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