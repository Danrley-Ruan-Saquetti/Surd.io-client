import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthService from './services/auth.service'
import socket from './services/socket'
import "./styles/GlobalStyles.css"

const authService = AuthService()

socket.on("connect", () => {
    if (authService.isUserLogged()) {
        authService.reconnect(authService.getCurrentUser().user)
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
