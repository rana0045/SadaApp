"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
function page() {

    const socket = io('http://192.168.50.17:8000');


    socket.on('connection', (socket) => {
        console.log(socket);
    })










    return (
        <div>
            <button  >login</button>
        </div>
    )
}

export default page