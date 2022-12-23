import { useState } from "react";
import { useEffect } from "react";
import Routers from "./Routers";
import socket from "./services/socket.js"

export default function App() {
	const [authenticate, setAuthenticate] = useState(false)

	useEffect(() => {
		socket.on("auth/login/reconnect/res", (data) => {
			setAuthenticate(true)
		})

		return () => {
			socket.off("auth/login/reconnect/res")
		}
	}, [])

	return (
		<>
			{authenticate && (<Routers />)}
		</>
	)
}
