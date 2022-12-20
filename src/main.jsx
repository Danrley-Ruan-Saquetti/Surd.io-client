import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import socket from './service/socket'
import "./styles/GlobalStyles.css"

socket.on("connect", () => {
    socket.on("hello", msg => { console.log(msg); console.log("") })
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
